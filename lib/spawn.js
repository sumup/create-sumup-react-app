import { spawn } from 'child_process';

const defaultOptions = {
  cwd: process.cwd(),
  detached: true,
  stdio: 'inherit'
};

function createErrorMsg(cmd, code) {
  return `An error with code ${code} occured running '${cmd}'`;
}

export default function asyncSpawn(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(cmd, args, { ...defaultOptions, ...options });

    subprocess.on('close', code => {
      if (code !== 0) {
        reject(new Error(createErrorMsg(cmd, code)));
      }

      resolve();
    });

    subprocess.on('error', err => {
      reject(err);
    });
  });
}
