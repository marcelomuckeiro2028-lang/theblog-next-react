/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  // Parser para TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  // Plugins
  plugins: ['@typescript-eslint', 'prettier'],

  // Configurações estendidas
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],

  // Regras customizadas para TypeScript
  rules: {
    // Prettier
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],

    // TypeScript - Essas regras aparecem em VERMELHO
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error', // VERMELHO
    '@typescript-eslint/no-unsafe-assignment': 'error', // VERMELHO
    '@typescript-eslint/no-unsafe-call': 'error', // VERMELHO
    '@typescript-eslint/no-unsafe-member-access': 'error', // VERMELHO
    '@typescript-eslint/no-unsafe-return': 'error', // VERMELHO
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'warn', // AMARELO
    '@typescript-eslint/no-empty-function': 'warn', // AMARELO
    '@typescript-eslint/no-empty-interface': 'warn', // AMARELO
    '@typescript-eslint/ban-ts-comment': 'warn', // AMARELO
    '@typescript-eslint/no-inferrable-types': 'warn', // AMARELO

    // React/Next
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-img-element': 'warn',
    '@next/next/no-page-custom-font': 'warn',

    // Import/Export
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
  },

  // Configurações de ambiente
  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  // Ignorar arquivos
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'build/',
    '*.config.js',
    '*.config.ts',
    'drizzle/**/*',
    '**/*.d.ts',
    '*.test.ts',
    '*.test.tsx',
    '*.spec.ts',
    '*.spec.tsx',
  ],

  // Settings
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
