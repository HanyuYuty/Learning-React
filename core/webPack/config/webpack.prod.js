const path = require('path'); //nodejs 核心模块，专门用来处理路径问题。

//const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //入口
    entry: './src/main.js', //相对路径

    //输出
    output: {
        //文件输出路径
        //__dirname nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), //绝对路径
        //js输出文件夹的文件名
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 为动态导入输出资源命名方式

        //图片、字体等资源通过type:asset处理的，输出命名。
        assetModuleFilename:'static/image/[hash][ext][query]',
        //在打包之前，先清空path整个目录的文件，再进行打包。
        clean: true,
    },

    //加载器
    module: {
        rules: [
           {
               oneOf:[
                    //loader配置
            {
                test: /\.css$/, //检测所有css文件
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
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
                // generator: {
                //     filename: 'static/image/[hash][ext][query]',
                // },
            },
            {
                //这个文件是iconfont所需要的，所以打包需要特殊处理。
                test: /\.ttf/,
                //asset/resource 把文件直接打包到指定位置，并不会转换base64
                type: 'asset/resource',
                //把图标资源输出到哪个文件夹，并以什么方式命名文件。
                // generator: {
                //     //[hash:5]只需要5位哈希值
                //     filename: 'static/media/[hash:5][ext][query]',
                // },
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
        //     context:path.resolve(__dirname,'src')
        // }),
        new HtmlWebpackPlugin({
            //把public下的html文件结构打包到dist下面，并且会自动引入js文件。
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'static/public/[name].[contenthash:8].html',
        }),

        new MiniCssExtractPlugin({
            filename:'static/css/[name].[contenthash:8].css'
        }),
    ],
    optimization: {
        // 代码分割配置
        splitChunks: {
          chunks: "all", // 对所有模块都进行分割
          // 以下是默认值
          // minSize: 20000, // 分割代码最小的大小
          // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
          // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
          // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
          // maxInitialRequests: 30, // 入口js文件最大并行请求数量
          // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
          // cacheGroups: { // 组，哪些模块要打包到一个组
          //   defaultVendors: { // 组名
          //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          //     priority: -10, // 权重（越大越高）
          //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          //   },
          //   default: { // 其他没有写的配置会使用上面的默认值
          //     minChunks: 2, // 这里的minChunks权重更大
          //     priority: -20,
          //     reuseExistingChunk: true,
          //   },
          // },
      },
       // 提取runtime文件
     runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
      },
    },
    

    //模式
    mode: 'production',
    devtool: "source-map",
};
