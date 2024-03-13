module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-unused-vars': [1, {
        argsIgnorePattern: '_'
    }],
    'object-curly-spacing': [2, 'always'],
    'no-trailing-spaces': 2,
    quotes: [2, 'single'],
    curly: [2, 'all'],
    semi: [2, 'never'],
  },
}
