const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf')
const webpack = require("webpack");

// if (module.hot) {
//     module.hot.accept()
// }
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8878, // 打包后的输出端口
        // publicPath:'/',
        progress: false, // 一切服务都启用gzip压缩
        stats: 'errors-only', // 编译时仅显示error信息
        contentBase: './dist', // 以./dist目录作为静态服务文件夹
        hot: true, // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        open: true,
        //服务器代理配置项
        // proxy: {
        //     '/test/*': {
        //         target: 'http://localhost:3000',
        //         secure: true,
        //         changeOrigin: true
        //     }
        // }
    },
    plugins: [
        //开启热更新 在package.json中配置 --hot --inline等同于这个
        // new webpack.HotModuleReplacementPlugin(),
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        })
    ]
})