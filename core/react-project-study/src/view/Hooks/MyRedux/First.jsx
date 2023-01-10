import React, { useContext, useState } from 'react'
import Second from './second';

import { GlobalValue } from '.'

function First() {
    const [inputValue,setInputValue] = useState('')
    const value = useContext(GlobalValue); 

    const {dispacth} = value;

    const handleDispacth = ()=>{
        dispacth({
            type:'changeName',
            payload:{name:inputValue}
        })
        setInputValue('')
    }

    const handleOnchange = (evt)=>{
        setInputValue(evt.target.value);
        
    }
    return (
        <div>
           
            <input type="text" onChange={handleOnchange} value={inputValue}/>
            <button onClick={handleDispacth}>dispacth</button>
            <Second></Second>
        </div>
    )
}

export default First
