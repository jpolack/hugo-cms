module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    beforeEach: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    jest: 'readonly',
    NODE_ENV: 'readonly',
    REDIRECT_URL: 'readonly',
    CLIENTID: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-console": "off"
  },
};
