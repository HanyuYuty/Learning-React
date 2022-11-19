import React,{useContext, useRef, useState} from 'react'
import { GlobalContext } from '.'

function Details() {
    const [inputValue,setInputValue] =useState('')
    const value = useContext(GlobalContext);
    const {handleNewcinemas} = value;
    const keyCodeRef = useRef([])


    
    const handleOnchange = (evt)=>{
        const {value} = evt.target;
        
        setInputValue(value);
        
    }
    
    const handleClick = (evt)=>{
        if(!inputValue){
            return
        }
        setInputValue('')
        // handleNewcinemas(inputValue)
        // evt.preventDefault()
    }

    const handleKeyDown = ()=>{
        console.log('key down');

    }

    // window.onkeydown = (evt)=>{
    //     console.log('evt',evt);
    //     const {key,keyCode} = evt;
        
    //     if(key==='Alt'){
    //         if(keyCode===88){
    //             console.log(111 );
    //         }
    //     }
    // }

    // const filterKeyCode = (code)=>{
    //     if(keyCodeRef.current.includes(code)){
    //         return
    //     }
    //     keyCodeRef.current.push(code);
    // }


    return (
        <div>

                <input type="text" onChange={handleOnchange} value={inputValue}/>
                <button onClick={handleClick} onKeyDown={handleKeyDown}>Add</button>

        </div>
    )
}

export default Details
