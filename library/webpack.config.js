const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const context = path.join(process.cwd(), 'src');

module.exports = {
    context: context, //the home directory for webpack

    devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools

    entry: {
        app: './index.js'
    },

    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'react-cohort-graph.min.js',
        publicPath: '/',
        libraryTarget: "umd"
    },

    resolve: {
        extensions: ['.js'],  // extensions that are used
        modules: [context, 'node_modules'] // directories where to look for modules
    },

    module: {
        rules: [/*{
            enforce: "pre", //to check source files, not modified by other loaders (like babel-loader)
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        },*/ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-2', 'react']
                }
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            minimize: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: false
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
    ]
};