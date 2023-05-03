module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['*.svg', '*.css'], // TODO maybe we can remove these ignores in future
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    'arrow-parens': 'off',
    'no-console': 1,
    'prettier/prettier': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'warn', // TODO fix and remove when we have bandwidth #45
    '@typescript-eslint/no-var-requires': 'warn', // TODO remove when we convert to TS fully
  },
};
