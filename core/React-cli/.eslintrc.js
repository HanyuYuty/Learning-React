//配置eslint
module.exports = {
    extends: ['react-app'], // 继承 react 官方规则
    parserOptions: {
        babelOptions: {
            presets: [
                // 解决页面报错问题
                ['babel-preset-react-app', false],
                'babel-preset-react-app/prod',
            ],
        },
    },
    //'@'符号比较特殊?导致eslint也需要配置（详情看eslint文件），否则会报错。Can't resolve '@/XXX/YYY'
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
            },
        },
    },
};
