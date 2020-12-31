module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    __isBrowser__: true,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['__INITIAL_DATA__'] }],
    'react/prefer-stateless-function': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
  },
};
