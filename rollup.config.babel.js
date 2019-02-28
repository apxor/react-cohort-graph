import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';


export default {
    input: './src/index.js',
    moduleName: 'ReactCohortGraph',
    sourcemap: true,
    output: [
        {
            file: './dist/react-cohort-graph.js',
            name: "ReactCohortGraph",
            format: 'umd'
        }/*,
        {
            file: './lib/react-cohort-graph.js',
            format: 'es'
        }*/
    ],
    plugins: [
        /*postcss({
            modules: true
        }),*/
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve(),
        commonjs()
    ],
    external: ['react', 'react-dom'],
    globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};