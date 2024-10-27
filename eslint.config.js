import globals from 'globals';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['dist'],
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.jest
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
      'no-multi-spaces': 'error',
      'arrow-body-style': 'warn',
      'prefer-arrow-callback': [
        'warn',
        {
          allowNamedFunctions: true,
        },
      ],
      'no-trailing-spaces': ['error', {'ignoreComments': true}],
      'no-unused-vars': 'error',
      'import/no-dynamic-require': 'error',
      'object-curly-spacing': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never']
    }
  },
];