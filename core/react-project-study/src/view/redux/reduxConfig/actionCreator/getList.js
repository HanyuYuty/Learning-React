import axios from "axios"

//在这里发送dispatch给redux
export default function getList() {
    


    return async (dispatch)  =>{

        const res = await axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
            method:"get",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        })

        dispatch({
            type:'getList',
            payload:res.data.data.cinemas
        })

    }
}