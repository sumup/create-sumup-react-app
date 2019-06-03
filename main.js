/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { resolve } from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';

import chalk from 'chalk';
import Listr from 'listr';
import VerboseRenderer from 'listr-verbose-renderer';

import spawn from './lib/spawn';
import logger from './lib/logger';
import * as util from './lib/util';

const asyncWriteFile = promisify(writeFile);

const FILES_PATH = resolve(__dirname, 'files');
const WORKING_DIR = process.cwd();
const APP_NAME = process.argv[2];
const APP_PATH = resolve(WORKING_DIR, APP_NAME || '');
const DEPENDENCIES = [
  // Our beautiful component library 💄
  '@sumup/circuit-ui@beta',
  // CSS-in-JS 🚀
  '@emotion/core@^10.0.10',
  'emotion-theming@^10.0.10',
  '@emotion/styled@^10.0.10',
  'jest-emotion@^10.0.10'
];
const DEV_DEPENDENCIES = [
  // React ⚛️
  'prop-types',
  // The toolkit 🛠
  '@sumup/foundry@beta',
  // Testing 📏
  '@testing-library/react@^8.0.0',
  'jest-emotion@^10.0.11',
  'jest-dom@^3.4.0'
];

const listrOptions = util.isDebugging()
  ? {
      renderer: VerboseRenderer
    }
  : {};

const tasks = new Listr(
  [
    {
      title: 'Running Create React App',
      // task: () => runCreateReactApp(APP_NAME)
      task: () => runCreateReactApp(APP_NAME)
    },
    {
      title: 'Install additional dependencies',
      task: () => addDependencies()
    },
    {
      title: 'Customize experience',
      task: () =>
        new Listr([
          {
            title: 'Set up SumUp Foundry',
            task: () => setUpFoundry(APP_PATH)
          },
          {
            title: 'Replace Create React App files',
            task: () =>
              Promise.all([deleteCraFiles(APP_PATH), copyReactFiles(APP_PATH)])
          },
          {
            title: 'Customize package.json',
            task: () => updatePackageJson(APP_PATH)
          },
          {
            title: 'Update initial commit',
            task: () => updateInitialCommit(APP_PATH)
          }
        ])
    }
  ],
  listrOptions
);

run();

async function run() {
  if (!APP_NAME) {
    logger.error([
      'Please pass a name for your app. For example, try',
      '\n',
      chalk`  yarn create sumup-react-app {italic.bold my-app}`,
      '\n'
    ]);
    process.exit(1);
  }

  logger.log(`
🎉 Yay, you did it. Thanks for starting a fresh SumUp React app.
🚀 Hang tight while we get you all set up.
`);

  await tasks.run().catch(handleErrors);

  logger.log(`
🏁 All done. Here's what to do next.
1.) Check out your new project: "cd ${APP_NAME}".
2.) Start your development process: "yarn start".

If you have questions, check our docs or file an issue on Github.

Docs: https://github.com/sumup/create-sumup-react-app/blob/master/README.md
Issues: https://github.com/sumup/create-sumup-react-app/issues
File issue: https://github.com/sumup/create-sumup-react-app/issues/new
`);
}

function runCreateReactApp(appName) {
  const cmd = 'yarn';
  const args = ['create', 'react-app', appName];

  return spawn(cmd, args, { cwd: WORKING_DIR });
}

async function addDependencies({
  dependencies = DEPENDENCIES,
  devDepenencies = DEV_DEPENDENCIES,
  cwd = APP_PATH
} = {}) {
  const cmd = 'yarn';
  const args = ['add', ...dependencies];

  const devArgs = ['add', '--dev', ...devDepenencies];

  await spawn(cmd, args, { cwd });
  return spawn(cmd, devArgs, { cwd });
}

function setUpFoundry(appPath, childProcessOptions = {}) {
  const cmd = 'npx';
  const args = [
    'foundry',
    'bootstrap-config',
    '--eslint',
    'react',
    '--babel',
    'react',
    '--prettier',
    'base',
    '--plop',
    'react',
    '--lint-staged',
    '--husky'
  ];
  return spawn(cmd, args, { cwd: appPath, ...childProcessOptions });
}

function deleteCraFiles(appPath) {
  const cmd = 'rm';
  const filesToDelete = [
    'logo.svg',
    'App.js',
    'App.test.js',
    'App.css',
    'index.js',
    'index.css'
  ];
  const args = ['-rf', ...filesToDelete.map(file => `src/${file}`)];
  return spawn(cmd, args, { cwd: appPath });
}

function copyReactFiles(appPath, sourcePath = FILES_PATH) {
  const cmd = 'cp';
  const filesToCopy = [
    'App.js',
    'App.spec.js',
    'setupTests.js',
    'index.js',
    'assets'
  ];
  const args = [
    '-r',
    ...filesToCopy.map(file => resolve(sourcePath, file)),
    `${appPath}/src`
  ];
  return spawn(cmd, args, { cwd: appPath });
}

async function updatePackageJson(appPath) {
  const filepath = resolve(appPath, 'package.json');
  const { default: packageJson } = await import(filepath);
  const scripts = {
    lint: 'foundry run eslint src/**/*.js',
    'create-component': 'foundry run plop component'
  };
  const updatedPackageJson = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      ...scripts
    }
  };

  const fileContent = JSON.stringify(updatedPackageJson, null, 2);

  return asyncWriteFile(filepath, fileContent);
}

async function updateInitialCommit(appPath) {
  const options = { cwd: appPath };
  const commitMsg = '"Initial commit from create-sumup-react-app"';

  await spawn('git', ['add', '-A'], options);
  return spawn(
    'git',
    ['commit', '--amend', '--no-verify', '-m', commitMsg],
    options
  );
}

function handleErrors(err) {
  if (err.log) {
    logger.error('Check the execution log below. 👇');
    logger.log('\n');
    logger.log(err.log);
  }
  process.exit(1);
}
