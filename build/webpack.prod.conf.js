const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        // 分离css插件参数为提取出去的路径
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //上线压缩 去除console等信息,webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            exclude: /node_modules/,
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_debugger: false,
                    drop_console: true
                }
            }
        }),
        // 配置环境
        new webpack.DefinePlugin({
            'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        })
    ]
})