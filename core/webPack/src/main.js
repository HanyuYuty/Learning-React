// import sum from "./js/sum";
import count from "./js/count";
import './css/index.css'
import './css/iconfont.css'

import(/*webpackChunkName:"sum"*/'./js/sum').then(res=>{
    console.log('res',res.default(1,2));
})


// console.log(sum(1,2));
console.log(count([3,4,5]));
console.log('env',process.env.NODE_ENV);
