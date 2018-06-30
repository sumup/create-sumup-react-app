module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'jest'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { functions: false }],
    'no-param-reassign': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true
      }
    ],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '*.js',
          'src/**/*.spec.js'
        ]
      }
    ]
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      ecmaVersion: 2017,
      impliedStrict: true,
      jsx: true
    }
  },
  env: {
    browser: true
  },
  overrides: [
    {
      files: ['src/**/*spec.js'],
      rules: {
        'max-len': [
          'error',
          {
            code: 80,
            tabWidth: 2,
            ignorePattern: '^\\s*it\\(',
            ignoreComments: true,
            ignoreUrls: true
          }
        ]
      },
      globals: {
        mount: true,
        shallow: true,
        render: true,
        create: true,
        axe: true,
        renderToHtml: true,
        describe: true,
        beforeEach: true,
        inject: true,
        it: true,
        test: true,
        expect: true,
        afterEach: true
      },
      env: {
        'jest/globals': true
      }
    }
  ]
};
