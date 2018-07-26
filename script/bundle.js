const path = require('path');
const childProcess = require('child_process');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2'); // notice ts version (https://github.com/ezolenko/rollup-plugin-typescript2/issues/88)
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve'); // resolve external packages
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const chalk = require('chalk');
const browserSync = require('browser-sync').create();


// const production = !process.env.ROLLUP_WATCH;
const production = process.argv[2] === 'prod';
const useSourceMap = production;
const dist = production
    ? path.resolve(__dirname, '../dist/trackgo.js')
    : path.resolve(__dirname, '../example/page/trackgo.js');


const inputOptions = {
    input: path.resolve(__dirname, '../src/index.ts'),
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

const outputOptions = {
    file: dist,
    format: 'umd',
    name: 'trackgo',
    sourcemap: useSourceMap,
	globals: 'window'
};

const watchOptions = {
    ...inputOptions,
    output: [outputOptions]
};


async function buildBundle() {
    const {log, time, timeEnd} = console;
    const prepareTag = chalk.green('[ prepare ] ');
    const generateTag = chalk.green('[ generate ] ');
    const writeTag = chalk.green('[ write ] ');

    log(chalk.magenta('====== preparing for bundle ======'));
    time(prepareTag);
    const bundle = await rollup.rollup(inputOptions);
    timeEnd(prepareTag);

    log(chalk.magenta('\n======== generating bundle ======='));
    time(generateTag);
    await bundle.generate(outputOptions);
    timeEnd(generateTag);

    log(chalk.magenta('\n====== writing bundle files ======'));
    time(writeTag);
    await bundle.write(outputOptions);
    timeEnd(writeTag);
}


function watchBundle() {
    let first = true;

    const cp = childProcess.fork(path.resolve(__dirname, '../example/server.js'), {silent: true});
    cp.on('message', e => {
        const port = e;
        console.log(chalk.green(`【server】example server is running on port: ${port}`));
        
        const watcher = rollup.watch(watchOptions);

        watcher.on('event', event => {
    
            switch (event.code) {
                case 'START':
                    console.log(chalk.magenta('【rollup】start to bundle...'));
                    break;
            
                case 'END':
                    console.log(chalk.magenta('【rollup】bundle end, rollup is watching...'));

                    if (!first) {
                        browserSync.reload();
                        return;
                    }

                    browserSync.init({
                        proxy: '127.0.0.1:8080',
                        notify: true,
                        port: port
                    });
                    first = false;

                    break;
    
                case 'ERROR':
                case 'FATAL':
                    console.log(chalk.red('【rollup】bundle error'));
                    console.log(event);
                default:
                    break;
            }
        });
    });
}

// 根据参数进行生产环境打包或开发环境打包监听
production ? buildBundle() : watchBundle();

process.on('exit', () => {
    browserSync.exit();
});