const webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: { // 指定入口文件
        test: './src/bootstrap.ts'
    },
    output: { // 指定输出目录和编译后文件名
        path: './bundle',
        filename: '[name].bundle.js'
    },

    externals: { // 外部模块,不会加入到打包程序中,用来提升灵活性修改
        jquery: 'jQuery',
        angular: 'angular'
    },

    resolve: {// 扫描文件
        extensions: ['.ts', '.js', '.less', '.css', '.html', '.json', '']
    },

    plugins: [
        // 提取css文件到 *.bundle.css
        new ExtractTextPlugin('[name].bundle.css')
    ],
    // devtool: 'source-map', // 开启调试模式
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ng-annotate!ts-loader'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer!less-loader")},
            {test: /\.html/, loader: 'html-loader'},
            {test: /\.(zip|swf|rar)\??.*$/, loader: 'url-loader?limit=1&name=[path][name].[ext]'},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=[path][name].[ext]'}
        ]
    }
};