import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'



function First() {
    const [list,setList]=useState([]);
    const history = useHistory()
    const getList = async ()=>{
        const res = await axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
            method:"get",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        })
        setList(res?.data?.data?.cinemas)
    }
    const handlToDetails = (id)=>{
        history.push({ pathname : `/details/${id}`})
    }
    useEffect(()=>{
        getList()

    },[])
   

    return (
        <div>
            {
                list.map(it=>{
                    return <li key={it.cinemaId} onClick={()=>handlToDetails(it.cinemaId)}>{it.name}</li>
                })
            }
        </div>
    )
}

export default First
