module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  globals: {
    __isBrowser__: true,
  },
  rules: {
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': ['error', { allow: ['__INITIAL_DATA__'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'react/prefer-stateless-function': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
    camelcase: ['error',
      {
        allow: ['FlagGB_EN', 'FlagGB_SCT', 'FlagGB_WLS'],
        properties: 'never',
      },
    ],
    'no-param-reassign': [2, { props: false }],
    'new-cap': ['error', {
      newIsCapExceptions: ['createLogger'],
      capIsNewExceptions: ['Router'],
    }],
  },
};
