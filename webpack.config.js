const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

const config = {
    context: paths.src,

    entry: {
        panel: './extension/Panel/index',
        listener: './extension/Listener/index',
        app: './index',
        injector: './extension/Injector/index',
        background: './extension/Background/index',
    },

    output: {
        path: paths.dist,
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: 'file-loader'
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                use: [require.resolve('json-loader')],
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
                template: './index.html',
                excludeChunks: [ 'injector', 'listener', 'panel', 'background' ]
            }),
        new CopyWebpackPlugin([
            { from: './manifest.json', to: './' },
            { from: './extension.html', to: './' },
            { from: './assets', to: './assets' },
        ])
    ]
};

module.exports = config;