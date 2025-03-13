import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'

module.exports = [
	// Базовые правила ESLint
	js.configs.recommended,
	{
		ignores: ['package.json', 'package-lock.json'],
		languageOptions: {
			globals: {
				...require('globals').node,
				...require('globals').browser,
			},
			sourceType: 'module',
		},
	},
	// Настройки для React
	{
		files: ['**/*.jsx', '**/*.tsx'],
		plugins: {
			react,
			'react-hooks': reactHooks,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect', // Автоматически определять версию React
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off', // Не требовать импорт React в JSX
			'react/prop-types': 'off', // Отключить PropTypes, так как используется TypeScript
			'react-hooks/rules-of-hooks': 'error', // Проверять правила хуков
			'react-hooks/exhaustive-deps': 'warn', // Проверять зависимости хуков
		},
	},

	// Настройки для TypeScript
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json', // Указывает на ваш tsconfig.json
			},
		},
		plugins: {
			'@typescript-eslint': tsEslintPlugin,
		},
		rules: {
			'@typescript-eslint/explicit-module-boundary-types': 'off', // Не требовать явных типов для функций
			'@typescript-eslint/no-explicit-any': 'warn', // Предупреждать об использовании `any`
		},
	},

	// Настройки Prettier (опционально)
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error', // Включить правило Prettier
		},
	},
]
