import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'
import webpack from 'webpack'
import 'webpack-dev-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type Mode = 'production' | 'development'

interface EnvVariables {
	mode: Mode
	port: number
}

export default (env: any) => {
	const config: webpack.Configuration = {
		entry: path.resolve(__dirname, 'src', 'index.ts'), // Точка входа проекта,
		devServer: {
			static: {
				directory: path.join(__dirname, 'public'),
			},
			compress: true,
			port: env.port ?? 3000,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			path: path.resolve(__dirname, 'dist'), // Директория, в которую будет собираться проект
			filename: '[name].[contenthash].ts',
			clean: true, // Очищает старые файлы при повторной сборке проекта
		},

		// Подключение плагинов, в параметр-массив передаются экземпляры объектов
		plugins: [
			new EslintPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
		],
	}

	return config
}
