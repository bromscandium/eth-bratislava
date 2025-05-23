const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './public/favicon.png',
            cache: true,
            inject: true,
            favicons: {
                appName: 'dEST',
                appDescription: 'Tokenized Estate',
                developerName: 'PROSTO',
                background: '#0f0712',
                theme_color: '#b96bfc',
                icons: {
                    coast: false,
                }
            }
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        static: './dist',
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        historyApiFallback: true,
    },
    mode: 'development'
};
