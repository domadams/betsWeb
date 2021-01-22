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
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': ['error', { allow: ['__INITIAL_DATA__'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'react/prefer-stateless-function': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
  },
};
