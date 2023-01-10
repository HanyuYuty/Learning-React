
const API_URL = 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159';
const headers = {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
    'X-Host': 'mall.film-ticket.cinema.list'
}

const config = {
    getList:{
        url:API_URL,
        mothod:'get',
        headers
    }
}

export default config