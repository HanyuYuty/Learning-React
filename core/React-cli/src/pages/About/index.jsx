import React, { useEffect, useState } from 'react'
import useApi_callApi from 'Hooks/useApi_callApi';
import useApi from 'Hooks/useApi';
function About(props) {

    const {getList,Data} = useApi()
    const [data,setData] = useState([])

    const getData = async()=>{
    //   const res =   await getList()
     const datA = await Data();
    //   setData(res.data)
    }
    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            About
        </div>
    )
}

export default About
