import js from '@eslint/js';
import globals from 'globals';
import {defineConfig} from 'eslint/config';
import googleConfig from 'eslint-config-google';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {js},
    extends: ['js/recommended', googleConfig],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Disable forcing JSDoc
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',

      // Ignore unused vars if prefixed with "_"
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],

      // Allow capitalized functions like express.Router()
      'new-cap': ['error', {capIsNew: false, newIsCap: true}],

      // Keep max line length reasonable
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
        },
      ],

      // Require spacing between imports
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
    },
  },
]);
