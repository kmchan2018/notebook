
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
	plugins: [
		resolve(),
		typescript(),
	],

	external: [
		'jquery',
		'lodash',
		'lunr',
		'react',
		'react-dom',
		'react-redux',
		'redux',
	],

	output: {
		format: "iife",
		globals: {
			'jquery': '$',
			'lodash': '_',
			'lunr': 'lunr',
			'react': 'React',
			'react-dom': 'ReactDOM',
			'react-redux': 'ReactRedux',
			'redux': 'Redux',
		}
	}
}

