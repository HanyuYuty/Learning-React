import React,{useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'

function MyApp() {
    const [state,setState] = useState();
    const divRef = useRef()
    useEffect(()=>{
        
    })

    useEffect(()=>{
        
    },[])
    
    useLayoutEffect(()=>{
       
        divRef.current.style.backgroundColor = 'red';
        
    })

//    const handleChange =  useCallback(()=>{
//         console.log('useCallback==>',state);
//         return 1
//     },[state])

   const handleChange =  useMemo(()=>{
        return ()=>{
            console.log('handleChange',state);
        }

    },[state])

    return (
        <div>
         
            <div id='isDiv' ref={divRef} style={{width:'200px',height:'300px'}}></div>
            <button onClick={handleChange}>add</button>
            <button onClick={()=>setState('new state')}>changeState</button>
        </div>
    )
}

export default MyApp
