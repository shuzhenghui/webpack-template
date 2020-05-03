const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8878, // 打包后的输出端口
        progress: true, // 打包是否压缩
        stats: 'errors-only', // 编译时仅显示error信息
        contentBase: './dist', // 以./dist目录作为静态服务文件夹
        hot: true,
        open: true
    },
    // proxy: { // 重写方式，代理
    //     '/api': {
    //         target: 'http://localhost:3000',
    //         // changeOrigin: true,
    //         pathReWrite: {
    //             '^/api': ''
    //         }
    //     }
    // }
})