// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 0,
    'no-debugger': 'off',
    'no-shadow': 0,
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        code: 120,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
        ],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
