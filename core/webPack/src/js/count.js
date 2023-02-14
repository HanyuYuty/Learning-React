import math from "./math"
export default function count(params) {
console.log(math());
    return params.reduce((preValue,item)=>preValue+item,0)
    
}