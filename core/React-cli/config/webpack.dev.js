const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


module.exports = {
    entry: './src/app.js',
    output: {
        path: undefined, //开发模式不会输出到磁盘里（文件具体在电脑磁盘哪个位置），但会输出到内存中，所以需要给输出文件命名。
        filename: 'static/js/[name].js', //入口文件的输出名
        chunkFilename: 'static/js/[name].[contentHash:8].chunk.js', //针对import动态引入
        assetModuleFilename: 'static/media/[hash:10][ext][query]', //针对图片、字符等通过type:asset处理的文件
    },
    module: {
        rules: [
            {
                test: /\.css$/, //检测所有css文件
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            //需要搭配package.json的browserslist来设置兼容到哪个版本。
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env', // 能解决大多数样式兼容性问题
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test:/\.(jpge?|svg|gif|png|webp)/,
                type:'asset',
                //解析器
                parser: {
                    //是否把资源转成base64
                    //base64 减少请求次数，但体积会比原来的变大。（图片会变成一串字符串）
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb以下的才会转
                    },
                },
            },
            {
                test:/\.ttf$/,
                type: 'asset/resource',
            },
            {
                test:/\.jsx?$/,
                include:path.resolve(__dirname,'../src'),//只处理src下面的js文件
                loader:'babel-loader',
                options:{
                    cacheDirectory:true, //开启缓存
                    cacheCompression:false, //关闭压缩缓存，打包会更快
                    plugins: [ require.resolve('react-refresh/babel')]
                }
            }
        ],
    },
    plugins: [
        new ESLintPlugin({
            //检测src下的所有代码
            context:path.resolve(__dirname,'../src'),
            exclude:'node_modules',//排除检查node_module
            cache:true , //开启缓存
            cacheLocation:path.resolve(__dirname,'../node_modules/.cache/.eslintcache')
        }),
        new HtmlWebpackPlugin({
            //把public下的html文件结构打包到dist下面，并且会自动引入js文件。
            template: path.resolve(__dirname, '../src/public/index.html'),
        }),
        new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    //webpack解析模块加载选项
    resolve:{
        // 自动补全文件扩展名，让jsx可以使用
        //import App from './App" 配置之后，这样才不会报错。
        extensions:[".jsx",".js",".json"]

    },
   
    //优化
    optimization:{
        //进行代码分割
        splitChunks:{
            chunks:'all'// 对所有模块都进行分割 主要分割import动态导入的方法
        },
        //代码分割可能会导致缓存失效或者是设定了hash值的文件名引入其他文件名，被引用文件修改后，引用文件也会被重新打包。
        //保存hash的文件
        runtimeChunk:{
            name:entrypoint=>`runtime~${entrypoint.name}.js`
        }
    },
    devServer: {
        host: 'localhost',
        port: '3002',
        open: true,
        hot: true,//开启HMP,热更新
        historyApiFallback: true, // 解决react-router刷新404问题
    },
    mode:'development',
    devtool:'cheap-module-source-map',
};
