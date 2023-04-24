##### 为什么需要使用打包工具
> 开发时，我们会使用框架，以及其他预处理等的语法进行开发，这些代码需要编译后，才能在浏览器中识别运行。因此，就需要打包工具帮助编译。打包工具还能压缩代码，做兼容性处理，提升代码性能等等。

##### webpack
> 是一个静态资源打包工具，它会以一个或者多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或者多个文件输出出去。
> https://webpack.docschina.org/ 官网
> https://yk2012.github.io/sgg_webpack5/senior/reduceVolume.html#image-minimizer 学习资料

##### 编译指令
> npx webpack ./scr/main.js --mode=development 开发模式
> npx webpack ./scr/main.js --mode=production 生产模式 (代码会被压缩)

##### 大概核心
1. entry 入口
   > 打包的入口文件
2. output 输出
   > 打包好的文件输出到哪个位置
3. loader 加载器
   > webpack本身只能处理js、json等资源，其他资源需要loader才能处理
4. plugins 插件
   > 扩展webpack功能
5. mode 模式
   > development 开发模式;production 生产模式
6. resolve 其他配置


##### 配置文件
> 在项目文件夹中下创建webpack.config.js(与package.json同级)进行配置。
> 配置好后，指令只主要输入npx webpack即可。
```js
  const path = require('path') //nodejs 核心模块，专门用来处理路径问题。

      module.exports = {
          //入口
          entry:'./src/main.js', //相对路径

          //输出
          output:{
              //文件输出路径
              //__dirname nodejs变量，代表当前文件的文件夹目录
              path:path.resolve(__dirname,'dist'),//绝对路径
              //文件名
              filename:'main.js'


          },

          //加载器
          module:{
              rules:[
                  //loader配置
              ]
          },

          //插件
          plugins:[
              //plugins配置
          ],

          //模式
          mode:'development'
      }

```
##### process.env.NODE_ENV)
> 可判断当前是什么模式。development/production

##### loader

- 处理样式资源
  1. css-loader 将css资源编译成commonjs的模块到js中。（require('./css')）
  2. less-loader、sass-loader 将less或sass、scss编译成css文件
  3. style.loader 将js中css通过创建style标签添加到html文件中生效。
  4. postcss-loader 解决样式兼容问题
    ```js
    //webpack.config.js
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
   
   //在package.json需要添加以下
   //各大浏览器最近的两个版本，并且覆盖99%，并且不是已停用的。
   "browserslist": ["last 2 version", "> 1%", "not dead"]
  
    ```

- 处理图片资源
  1. asset
    > 不需要下载loader,但需要进行配置。
```js

              {
                test: /\.(png|jpg?e|gif)/,
                type: 'asset',
                parser: {
                    //是否把资源转成base64
                    //base64 减少请求次数，但体积会比原来的变大。（图片会变成一串字符串）
                    dataUrlCondition: {
                    maxSize: 10 * 1024 // 10kb以下的才会转
                    }
                }
              }

```
##### 自动清除上一次打包内容
> 原理：在打包前，将path整个目录内容情况，再进行打包。
```js
//输出
    output: {
        //文件输出路径
        //__dirname nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'), //绝对路径
        //js输出文件夹的文件名
        filename: 'static/js/main.js',
        //在打包之前，先清空path整个目录的文件，再进行打包。
        clean:true
    },
```

##### 插件（plugins）
1. ESLintPlugin 用eslint 来查找和修复 JavaScript 代码中的问题。（需要先配置eslint）
   ```js
   const path = require('path'); //nodejs 核心模块，专门用来处理路径问题。
   
   const ESLintPlugin = require('eslint-webpack-plugin');
   
   module.exports = {
       //入口
       entry: './src/main.js', //相对路径
   
       //输出
       output: {
        //...
       },
   
       //加载器
       module: {
           rules: [
               //loader配置
               {
                   test: /\.css$/, //检测所有css文件
                   use: ['style-loader', 'css-loader'],
               },
           ],
       },
   
       //插件
       plugins: [
           //plugins配置
           new ESLintPlugin({
               //检测所有src下的代码
               context:path.resolve(__dirname,'src') 
           }),
       ],
   
       //模式
       mode: 'development',
   };
   
   ```
2. HtmlWebpackPlugin 生成新的html文件并自动引入js文件。
   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   new HtmlWebpackPlugin({
            //把public下的html文件结构打包到dist下面，并且会自动引入js文件。
            template:path.resolve(__dirname,'public/index.html')
    )
   
   ```
3. MiniCssExtractPlugin 本插件会将 CSS 提取到单独的文件中。为每个包含 CSS 的 JS 文件创建成一个 CSS 文件。
   ```js
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   module.exports = {
        module: {
           rules: [
               //loader配置
               {
                   test: /\.css$/, //检测所有css文件
   
                   //改用MiniCssExtractPlugin.loader
                   use: [MiniCssExtractPlugin.loader, 'css-loader'],
               },
           ],
       },
           //插件
       plugins: [
           new MiniCssExtractPlugin()
       ],
    }
   
   ```

##### 搭建服务器
> 能自动监听各个文件的变化并进行编译，还能开启服务器。（npm install webpack-dev-server --save-dev）
> 运行指令：npx webpack serve
> 不会输出文件
> **开发模式 path:undefined,开发模式不会输出到磁盘里（文件具体在电脑磁盘哪个位置），但会输出到内存中，所以需要给输出文件命名。**
```js
const path = require('path'); //nodejs 核心模块，专门用来处理路径问题。
module.exports = {
    //入口
    entry: './src/main.js', //相对路径

    //输出
    output: {
       //...
    },

    //加载器
    module: {
        rules: [
            //...
        ],
    },

    //插件
    plugins: [
      //...
    ],

    //开启服务器
    devServer:{
        host:'localhost',//域名
        port:'3001',//端口
        open:true//是否自动打开浏览器
    },

    //模式
    mode: 'development',
};

```

##### production mode
> 生产模式是开发完成代码后，我们需要得到代码将来部署上线。这个模式下我们主要对代码进行优化，让其运行性能更好。
> 优化主要从两个角度出发:
1. 优化代码运行性能
2. 优化代码打包速度

```js
const path = require('path'); //nodejs 核心模块，专门用来处理路径问题。

//const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: './src/main.js', //相对路径

    //输出
    output: {
        //文件输出路径
        //__dirname nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname,'../dist'), //绝对路径
        //js输出文件夹的文件名
        filename: 'static/js/main.js',
        //在打包之前，先清空path整个目录的文件，再进行打包。
        clean:true
    },

    //加载器
    module: {
        rules: [
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
            template:path.resolve(__dirname,'../public/index.html'),
            
        })
    ],

    //模式
    mode: 'production',
};
```
##### resolve
 - extensions 扩展
 - alias 文件路径别名
```js

        module.exports = {
           resolve: {
                 // 自动补全文件扩展名，让jsx可以使用
                 //import App from './App" 配置之后，这样才不会报错。
                 extensions: ['.jsx', '.js', '.json'],

                 //创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块
                 //💥💥💥💥'@'符号比较特殊?导致eslint也需要配置（详情看eslint文件），否则会报错。Can't resolve '@/XXX/YYY'
                 alias: {
                     '@': path.resolve(__dirname, '../src'),
                   },
             },

        }


```

##### 配置运行指令
> 为了方便运行不同模式的指令，我们将指令定义在 package.json 中 scripts 里面
```js
{
    
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npm run dev",
    "dev":"npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  },
}

```

##### 高级优化
- 提升开发体验
  - SourceMap(简单来说，就是生产环境编译后，能快速找到错误的代码地方。)
    > 所有 css 和 js 合并成了一个文件，并且多了其他代码。此时如果代码运行出错那么提示代码错误位置我们是看不懂的。一旦将来开发代码文件很多，那么很难去发现错误出现在哪里。SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。
    - 开发模式：cheap-module-source-map
      - 优点：打包编译速度快，只包含行映射
      - 缺点：没有列映射
    - 生产模式：source-map
      - 优点：包含行/列映射
      - 缺点：打包编译速度更慢
- 提升打包构建速度
  - HotModuleReplacement
  > 开启后，哪个模块的代码修改了，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。
  ```js
       devServer:{
        host:'localhost',//域名
        port:'3001',//端口
        open:true,//是否自动打开浏览器
        hot:true //开启HMR js代码并不会处理。js需要另外处理
    },
  
  ```
  - oneOf
  > 匹配到一个loader将不会进行下一个loader的匹配，提高了打包速度。
  ```js
  
    module.exports = {
      //入口
      entry: './src/main.js', //相对路径
  
      //输出
      output: {
        //...
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
                 ]
             }
          ],
      },
  
      //插件
      plugins: [
        //...
      ],
  
      //模式
      mode: 'production',
      devtool: "source-map",
    };
  ```
  - include/exclude
   > 排除编译node_modules文件。
   ```js
      {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
      },
   ```
  - cache
   > 对 Eslint 检查 和 Babel 编译结果进行缓存。
   ```js
  
    //module
    {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
        options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
        },
    },
    
    //plugins
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),  
   ```
- 减少代码体积
  - tree shaking
   > 通常用于描述移除 JavaScript 中的没有使用上的代码。Webpack 已经默认开启了这个功能，无需其他配置。
  - Image Minimizer 
   > 对本地项目的图片进行压缩打包 

- 优化代码运行性能
  - code split
    > 代码分割（Code Split）主要做了两件事：
      1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
      2. 按需加载：需要哪个文件就加载哪个文件。
    - 多入口(设置多入口文件)
    - 提取重复代码
      > 多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。把需要被重复引用的代码打包成一份js。
    - 按需加载，动态引入
      ```js
       // webpackChunkName: "sum"：这是webpack动态导入模块命名的方式
       //⭐webpackChunkName，大小写写错不生效
       import(/*webpackChunkName:"sum"*/'./js/sum').then(res=>{
           console.log('res',res)
       })
      
      ```
  - preload、prefetch
    > 某些js资源虽然已经做了按需加载，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 Preload 或 Prefetch 技术。（两者都是只加载不运行，都缓存。）
     1. Preload：告诉浏览器立即加载资源。优先级高，比prefetch兼容性好一点，只加载当前页面。
     2. Prefetch：告诉浏览器在空闲时才开始加载资源。优先级低，可加载下一个页面所需资源。
  - Network cache
    > 由于项目涉及到更新问题，现打包的文件名是main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。因此，可以给文件名设置hash值。
     - fullhash（webpack4 是 hash）
       > 每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。

     - chunkhash
       > 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。
     - contenthash
       > 根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。
       ```js
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
       ```
       **问题：由于有些js文件涉及到引用其他文件，当其他文件改变时，它的hash值也会改变，这样就导致引用它的文件hash值也会改变，文件会重新处理。**
       *解决：将 hash 值单独保管在一个 runtime 文件中。我们最终输出三个文件：引用文件、被引用文件、runtime。当 被引用 文件发送变化，变化的是 被引用 和 runtime 文件，引用文件 不变。runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。*
       ```js
       module.exports = {
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
       
       }
       
       ```
  - Progressive web application(PWA)
    > 无网络时，可给项目提供离线功能。 **有兼容性问题**
    
##### React项目搭建
> 使用了babel-preset-react-app需要下载cross-env插件来配置NODE_ENV环境，否则会报错。
```js

//package.json
 "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
  },

```

- 热更新
  > React Refresh Webpack Plugin 哪个jsx?文件修改了，只处理哪个文件。
- historyApiFallback: true, // 解决react-router刷新404问题
  ```js
     devServer: {
            host: 'localhost',
            port: '3002',
            open: true,
            hot: true,//开启HMP,热更新
            historyApiFallback: true, // 解决react-router刷新404问题
        },
  ```
- 生产环境下，build好之后，点击查看需要按vscode的![image-20230211150558725](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20230211150558725.png)
- 添加图标 copy-webpack-plugin 
  ```js
    plugins:[
       //把静态资源copy到dist下面，可以处理favicon.ico网站图标
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/public'),
                    to: path.resolve(__dirname, '../dist'),
                    //因为这里处理会跟HtmlWebpackPlugin处理同一个html文件，这里设置ignore
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    ]

  ```

##### 原理
- loader
  > 帮助webpack将不同类型的文件转换成为webpack可识别的模块。 
  - loader 执行顺序
    - 分类
      1. pre： 前置 loader
      2. normal： 普通 loader
      3. inline： 内联 loader
      4. post： 后置 loader
    - 执行顺序
      > 4 类 loader 的执行优级为：pre > normal > inline > post 。相同优先级的 loader 执行顺序为：从右到左，从下到上。
  - 封装loader
    > loader就是一个函数，当webpack解析资源时，会调用loader进行处理。
    - 同步loader
      > 同步loader不能异步操作，否则会报错
      ```js
          /**
           * 同步loader
           * content 文件内容
           *  map source-map
           *  meta 给下一个loader传参数
          */

          module.exports = function sync(content, map, meta) {
              /**
               * @param  {any} null 处理时是否有错误，无为null;
              */ 
               
              this.callback(null, content, map, meta);

              return content;
          };

      ```
    - 异步loader
      ```js
        //异步loader
          module.exports = function async(content, map, meta) {
            const callback = this.async();
              

             setTimeout(()=>{
              callback(null, content, map, meta);
             },1000)

              return content;
          };
      ```