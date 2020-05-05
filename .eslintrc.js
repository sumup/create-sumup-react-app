module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Node'],
    openSource: true,
  },
  {
    env: {
      node: true,
    },
    overrides: [
      {
        files: ['files/**/*.js'],
        env: {
          browser: true,
        },
        rules: {
          'notice/notice': 'off',
          'import/no-unresolved': 'off',
          'no-unused-vars': 'warn',
        },
      },
      {
        files: ['files/**/*.spec.js'],
        env: {
          jest: true,
        },
      },
    ],
  },
);
