import React, { useState } from 'react';
import { Global } from '../../index';

function Child() {
    const Context = Global;
    const [inputValue,setInputValue] = useState();

    const renderComponent = (contextValue)=>{
        const {setInfo} = contextValue;
        return (
            <>
            <div>I'm Child</div>
            <input type="text" name="" id="" onChange={(e)=>{setInputValue(e.target.value)}}/>
            <button onClick={()=>{setInfo(inputValue)}}>setGolbalValue</button>
            </>
        )

    };
    return (
            //获取从global传递的数据
        <Context.Consumer>
            {
                (value)=>{
                   return renderComponent(value)
                }
            }

        </Context.Consumer>
        
        
    )
}

export default Child
