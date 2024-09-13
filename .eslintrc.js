module.exports = {
	root: true,
	env: { node: true },
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	overrides: [
		{
			files: ['**/*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2020,
				project: 'tsconfig.json',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
					experimentalObjectRestSpread: true
				}
			},			
			rules: {
				'@typescript-eslint/interface-name-prefix': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/no-array-constructor': 'off',
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/no-restricted-syntax": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/no-this-alias": "off"
			},
		},
		{
			files: ['**/*.spec.ts', 'integration/**/*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: 'tsconfig.spec.json',
				sourceType: 'module',
			},
			rules: {
				'@typescript-eslint/interface-name-prefix': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/no-restricted-syntax": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/no-this-alias": "off"
			},
		}
	]
};