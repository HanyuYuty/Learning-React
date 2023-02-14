const path = require('path'); 

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {test:/\.js$/,use:[
                './loaders/sync_loader',
                './loaders/async_loader'
            ]}

        ]

    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html')
        })
    ],
    mode:'development'
}