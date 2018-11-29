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
                test: /\.pcss$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                                require('postcss-modules-values'),
                                require('postcss-cssnext'),
                                require('css-mqpacker'),
                                require('postcss-nested'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(svg)$/,
                loader: 'svg-url-loader'
            },
            {
                test: /\.(jpe?g|gif|png|woff|ttf|wav|mp3)$/,
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