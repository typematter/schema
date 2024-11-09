import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{ ignores: ['.pnpm-store', 'dist', 'node_modules'] },
	{
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	prettier
];
