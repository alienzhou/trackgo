import typescript from 'rollup-plugin-typescript2'; // notice ts version (https://github.com/ezolenko/rollup-plugin-typescript2/issues/88)
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve'; // resolve external packages
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const useSourceMap = production;
const dist = production ? 'dist/trackgo.js' : 'example/page/trackgo.js';

export default {
	input: 'src/index.ts',
	output: {
		file: dist,
        format: 'umd',
        name: 'trackgo',
        sourcemap: useSourceMap,
		globals: 'window'
	},
	plugins: [
		typescript({
			tsconfig: 'tsconfig.json',
		}),
		resolve(),
		// resolve({
		// 	jsnext: true,
		// 	browser: true,
		// 	customResolveOptions: {
		// 		moduleDirectory: 'node_modules'
		// 	}
		// }),
		commonjs(), // converts date-fns to ES modules
		production && babel(),
		production && uglify() // minify, but only in production
	]
};