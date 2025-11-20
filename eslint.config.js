import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Code Quality
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // Keep console for debugging
      'prefer-const': 'error',
      'no-var': 'error',
      
      // Best Practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      
      // Style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 4],
      'comma-dangle': ['error', 'always-multiline'],
      
      // Modern JS
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'webpack.config.js'],
  },
];
