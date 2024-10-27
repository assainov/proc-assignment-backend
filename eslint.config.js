import globals from "globals";
import pluginJs from "@eslint/js";


module.exports = [
  { ignores: ['dist'] },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs"
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'arrow-body-style': 'warn',
      'prefer-arrow-callback': [
        'warn',
        {
          allowNamedFunctions: true,
        },
      ],
      'no-trailing-spaces': ['error', { 'ignoreComments': true }],
    }
  },
];