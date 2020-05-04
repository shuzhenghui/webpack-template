/**
 * 多页面时才引用这个文件
 */

const {
    resolve
} = require('path');
const glob = require("glob");

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
    return {
        template: resolve(__dirname, `../src/pages/${name}/index.html`),
        filename: `${name}.html`,
        // favicon: './favicon.ico',
        // title: title,
        inject: true,
        hash: true, //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释，默认false
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    };
};

// 多页面时用这个方法获取入口文件
function getEntry() {
    let entry = {};
    //读取src目录所有page入口
    glob.sync(resolve(__dirname, '../src/pages/**/*.js'))
        .forEach(function (name) {
            let start = name.indexOf('src/') + 4,
                end = name.length - 3;
            let eArr = [];
            let n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
};

// 多页面配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: ['vendor', element]
    })
})

//多页面自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})


// 多入口时entry入口这样写就行了
// module.exports = {
//     entry: {
//         index: './src/pages/index/index.js',
//         page1: './src/pages/index/page1.js',
//         page2: './src/pages/index/page2.js'
//     }
// }