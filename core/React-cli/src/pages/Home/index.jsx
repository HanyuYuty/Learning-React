import React, { useEffect,useState } from 'react'
import useApi from 'Hooks/useApi';



import './index.css'

function Home() {
    const {getList2} = useApi()
    const [data,setData] = useState([])

    const getData = async()=>{
      const res =   await getList2()
     console.log('res',res);
      setData(res.data)
    }
    useEffect(()=>{
        getData()
      
    },[])
    return (
        <div className='home'>
            Home
        </div>
    )
}

export default Home
