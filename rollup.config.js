import typescript from 'rollup-plugin-typescript';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
        format: 'umd',
        name: 'trackgo',
        sourcemap: true,
        globals: 'window'
	},
	plugins: [
		typescript() // tells Rollup how to find date-fns in node_modules
		// commonjs(), // converts date-fns to ES modules
		// production && uglify() // minify, but only in production
	]
};