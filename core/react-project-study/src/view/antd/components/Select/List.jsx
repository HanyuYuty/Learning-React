import React,{useRef} from 'react'
import { useEffect } from 'react';

function List(props) {

    const {initalOptions,onChange} = props;

    return (
        <div >
             <ul>
                {initalOptions.length > 0 ? (
                    initalOptions.map(option => (
                        <li
                            key={option.value}
                            value={option.value}
                            //⭐改用onMouseDown是因为input失焦时,下拉框应该关上,input的blur事件早执行于onClick事件,会导致还没点击就已经被合上。onMouseDown事件早执行于onBlur事件。
                            // onMouseDown ={e => handleSelectValue(option.label, option, e)}
                            onMouseDown={(e)=>onChange(option.label, option, e)}
                        >
                            {option.label}
                        </li>
                    ))
                ) : (
                    <p>无相关搜索</p>
                )}
            </ul>
        </div>
    )
}

export default List
