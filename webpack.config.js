const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require ('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        main: './src/scripts/script.js',
        about: './src/scripts/about.js',
        analytics: './src/scripts/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './scripts/[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ?
                    'style-loader'
                    :
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: 'file-loader?name=./vendor/[name].[ext]'
        },
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/,
            use: [
                    {
                        loader: 'file-loader?name=./images/[name].[ext]'
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                },
            ]
        }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/i,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),

        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/about.html',
            filename: 'about.html',
            chunks: ['about'],
        }),

        new HtmlWebpackPlugin({
          inject: false,
          template: './src/pages/analytics.html',
          filename: 'analytics.html',
          chunks: ['analytics'],
      }),

        new WebpackMd5Hash(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};
