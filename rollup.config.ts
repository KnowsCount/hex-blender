import { terser } from 'rollup-plugin-terser'
import pluginTypescript from '@rollup/plugin-typescript'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import * as path from 'path'
import pkg from './package.json'

const moduleName = pkg.name.replace(/^@.*\//, '')
const inputFileName = 'index.ts'
const author = pkg.author
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * released under the ${pkg.license} license.
   */
`

export default [
	// browser
	{
		input: inputFileName,
		output: [
			{
				name: 'hexBlend',
				file: pkg.browser,
				format: 'iife',
				// sourcemap: 'inline',
				banner,
				plugins: [terser()],
			},
		],
		plugins: [
			pluginTypescript(),
			pluginCommonjs({
				extensions: ['.js', '.ts'],
			}),
			babel({
				babelHelpers: 'bundled',
				configFile: path.resolve(__dirname, '.babelrc.js'),
			}),
			pluginNodeResolve({
				browser: true,
			}),
		],
	},

	// es
	{
		input: inputFileName,
		output: [
			{
				file: pkg.module,
				format: 'es',
				sourcemap: 'inline',
				banner,
				exports: 'named',
			},
		],
		external: [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.devDependencies || {}),
		],
		plugins: [
			pluginTypescript(),
			pluginCommonjs({
				extensions: ['.js', '.ts'],
			}),
			babel({
				babelHelpers: 'bundled',
				configFile: path.resolve(__dirname, '.babelrc.js'),
			}),
			pluginNodeResolve({
				browser: false,
			}),
		],
	},

	// commojs
	{
		input: inputFileName,
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: 'inline',
				banner,
				exports: 'default',
			},
		],
		external: [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.devDependencies || {}),
		],
		plugins: [
			pluginTypescript(),
			pluginCommonjs({
				extensions: ['.js', '.ts'],
			}),
			babel({
				babelHelpers: 'bundled',
				configFile: path.resolve(__dirname, '.babelrc.js'),
			}),
			pluginNodeResolve({
				browser: false,
			}),
		],
	},
]
