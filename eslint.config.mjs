import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  // Configurações base do Next.js
  ...nextVitals,
  ...nextTs,

  // Prettier
  prettier,

  // Configurações TypeScript ESLint
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Regras TypeScript adicionais
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },

  // Sobrescreve os ignores padrão
  globalIgnores([
    // Ignores padrão do eslint-config-next
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // Ignores adicionais
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '*.min.js',
    '*.bundle.js',
    '.eslintrc.*',
    'prettier.config.*',
    'next.config.*',
  ]),
]);

export default eslintConfig;
