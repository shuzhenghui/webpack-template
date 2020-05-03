const path = require('path')

// const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: resolve('../src/main.js'),
    output: {
        path: resolve('../dist'),
        filename: 'js/[name].[hash:8].bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
        alias: {
            '@': resolve('../src'),
            '#': resolve('../static')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html',
            title: 'webpack-template',
            minify: {
                //是否对大小写敏感，默认false
                caseSensitive: false,
                //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                collapseBooleanAttributes: true,
                //是否去除空格，默认false
                collapseWhitespace: true,
                //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
                minifyCSS: true,
                //是否压缩html里的js（使用uglify-js进行的压缩）
                minifyJS: true,
                //是否移除注释 默认false
                removeComments: true, //从脚本和样式删除的注释 默认false
                removeCommentsFromCDATA: true
            }
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/..' + '/src/assets', // 定义要拷贝的源文件路劲
            to: __dirname + '/..' + '/dist/assets', // 打包到到那个文件夹
            ignore: ['.*'] // 忽略拷贝指定的文件
        }])
    ]
}