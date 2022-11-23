import React,{useContext} from 'react'

import { GlobalValue } from '.'
function Second() {
    const value = useContext(GlobalValue); 
    return (
        <div>
             <h2>{value?.name}</h2>
             <span>我是子组件</span>
        </div>
    )
}

export default Second
