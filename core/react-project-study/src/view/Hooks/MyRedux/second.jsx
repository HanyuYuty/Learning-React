import React,{useContext, useEffect, useState} from 'react'
import useHandleRespont from '../useApi';
import {getFilmList} from '../useContext/request'

import { GlobalValue } from '.'
function Second() {
    const value = useContext(GlobalValue); 
    const [list,setList] = useState('')

    const [value1,setValue1]  = useHandleRespont(list);

    

    const filmList = async ()=>{
        const res = await getFilmList();
        setList(res)
        handleRespont(res)
    }

    const handleRespont = (res)=>{
        
    }
    useEffect(()=>{

        filmList()

    },[])
    return (
        <div>
             <h2>{value?.name}</h2>
             <span>我是子组件</span>
        </div>
    )
}

export default Second
