import pluginJs from '@eslint/js';
import { environments } from 'eslint-plugin-prettier';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  prettier,
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    environments: {
      jest: true,
    },
  },
];
