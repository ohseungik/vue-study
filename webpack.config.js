const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const sass = require('sass');
const fibers = require('fibers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: true
    },

    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',

    entry: './src/index.tsx',

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_module/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.scss?$/,
                exclude: /node_module/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: sass,
                            sassOptions: {
                                fiber: fibers
                            }
                        }
                    }
                ]
            }
        ]
    },

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({filename: `[name].css`})
    ]
}