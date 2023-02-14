const path = require('path'); //nodejs 核心模块，专门用来处理路径问题。

//const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const os = require('os');
const thead = os.cpus().length;
console.log('thead',thead);

module.exports = {
    //入口
    entry: './src/main.js', //相对路径

    //输出
    output: {
        //文件输出路径
        //__dirname nodejs变量，代表当前文件的文件夹目录
        path:undefined,//开发模式不会输出到磁盘里（文件具体在电脑磁盘哪个位置），但会输出到内存中，所以需要给输出文件命名。
        //js输出文件夹的文件名
        filename: 'static/js/main.js',
        //在打包之前，先清空path整个目录的文件，再进行打包。
        //clean:true 开启了服务器是没有输出的
    },

    //加载器
    module: {
        rules: [
           {
               oneOf:[
                    //loader配置
            {
                test: /\.css$/, //检测所有css文件
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpge?|gif)/,
                //asset 指定文件大小的将会转换base64，并把文件打包到指定位置。
                type: 'asset',
                parser: {
                    //是否把资源转成base64
                    //base64 减少请求次数，但体积会比原来的变大。（图片会变成一串字符串）
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb以下的才会转
                    },
                    
                },
                //把图片资源输出到哪个文件夹，并以什么方式命名文件。
                generator: {
                    filename: 'static/image/[hash][ext][query]',
                },
            },
            {
                //这个文件是iconfont所需要的，所以打包需要特殊处理。
                test: /\.ttf/, 
                //asset/resource 把文件直接打包到指定位置，并不会转换base64
                type: 'asset/resource',
                //把图标资源输出到哪个文件夹，并以什么方式命名文件。
                generator: {
                    //[hash:5]只需要5位哈希值
                    filename: 'static/media/[hash:5][ext][query]',
                },
            },
               ]
           }
        ],
    },

    //插件
    plugins: [
        //plugins配置
        // new ESLintPlugin({
        //     //检测所有src下的代码
        //     context:path.resolve(__dirname,'src'),

        // }),
        new HtmlWebpackPlugin({
            //把public下的html文件结构打包到dist下面，并且会自动引入js文件。
            template:path.resolve(__dirname,'../public/index.html'),
            
        })
    ],
    devServer:{
        host:'localhost',//域名
        port:'3001',//端口
        open:true,//是否自动打开浏览器
        hot:true //开启HMR
    },

    //模式
    mode: 'development',
    devtool: "cheap-module-source-map",
};
