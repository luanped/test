const path = require('path');
const webpack = require('webpack');
const env = require('get-env')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin({
        filename: "styles.css",
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin()
];

const shouldUseExtractTextPlugin = env === 'prod';

if (env === 'prod') {
    plugins = [
        ...plugins,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}

let cssLoader;
if (shouldUseExtractTextPlugin) {
    cssLoader = ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader'
                    }],
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}}
                    ]
                });
} else {
    cssLoader = [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } }
    ]
}


module.exports = {
    entry: {
        app: [
            './src/index.jsx'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: "source-map-loader",
            },
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                options: {
                    failOnError: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: cssLoader
            }
        ]
    },
    plugins: plugins,
    devServer: {
        host: 'localhost',
        port: 4000,
        historyApiFallback: true
    }
};