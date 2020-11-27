const config = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: false,
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    overrides: [
      {
        files: [
          '**/*.story.*',
          '**/*.stories.*',
          '**/setupTests.*',
          '**/test-utils/*',
        ],
        rules: {
          'import/no-extraneous-dependencies': 'off',
        },
      },
    ],
  },
);

module.exports = config;
