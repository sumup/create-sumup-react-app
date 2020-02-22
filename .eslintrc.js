module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Node'],
    frameworks: [],
    openSource: true,
  },
  {
    overrides: [
      {
        files: ['files/**/*.js'],
        rules: {
          'notice/notice': 'off',
          'import/no-unresolved': 'off',
          'import/extensions': 'off',
          'no-undef': 'warn',
          'no-unused-vars': 'warn',
        },
      },
    ],
  },
);
