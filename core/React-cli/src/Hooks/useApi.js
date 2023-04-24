import useApi_callApi from "./useApi_callApi";
const apiConfigs = require.context(`${process.env.NODE_ENV==='development'?'../api/mock':'../api/production'}`, true, /\.js$/);
let cache = {};

function spliceName(file) {
    // const name = file.split('./').pop().split('.').shift();
    // return name
    const name =Object.keys(file).shift();
    return name;
}


//Hooks实现了在接口文件中配置接口后，在组件中使用同名字以可调接口。还可以动态加入不同模块的接口文件


export default function useApi(params) {

    apiConfigs.keys().forEach(key => (cache[spliceName(apiConfigs(key).default)] = apiConfigs(key).default));
    const apis = useApi_callApi(cache);
    return apis
   

    // apiConfigs.keys().forEach(async item => {
    //     const path = item.split('./').pop();
    //     const module = await import(`../api/${path}`);
    //     cache[path.split('.').shift()] = module?.default;
    //     //    return cache = {
    //     //         [path.split('.').shift()]: module?.default,
    //     //     }

    //     // import(`../api/${path}`).then(module => {
    //     //     // const key = Object.keys(module?.default);
    //     //     // const url = module?.default[key].url || '';
    //     //     // let options = Object.keys(module?.default[key]).filter(it => it !== 'url');

    //     //     // options = options.map(option => ({[option]: module?.default[key][option]}));
    //     //     // setApis({
    //     //     //     [path.split('.').shift()]: module?.default,
    //     //     // });
    //     // });
    // });

    //return cache;
}

// function fetch(module={},options,url,key='') {

//     options.forEach(option=>{
//         console.log(option);
//         window.fetch(url,{
//             [option]:module?.default[key][option]
//         }).then(function(response) {
//             return response.json()
//             // handle HTTP response
//           }, function(error) {
//             // handle network error
//           }).then(res=>{
//               console.log('res',res);
//           })
//     })

// }

