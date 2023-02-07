import React, { Component } from 'react'


export default class PrizeItem extends Component {
    state={
        surplusStock:'',
    
    }
    
    // getComdStock=async ()=>{
    // //    const res2 = await Promise.all([axios({
    // //     url:`https://m.maizuo.com/gateway?cityId=${this.props.record}&ticketFlag=1&k=7406159`,
    // //     method:"get",
    // //     headers:{
    // //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
    // //         'X-Host': 'mall.film-ticket.cinema.list'
    // //     }
    // //     })])

    // const res2 = await axios({
    //     url:`https://m.maizuo.com/gateway?cityId=${this.props.record}&ticketFlag=1&k=7406159`,
    //     method:"get",
    //     headers:{
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
    //         'X-Host': 'mall.film-ticket.cinema.list'
    //     }
    //     })
      
    //     this.setState({surplusStock:res2.data.data.cinemas[0].name})



    // }

    
    componentDidMount(){
        // this.getComdStock()

    }

    render() {

        return (
            <div>
                可用  --  {this.state.surplusStock}
            </div>
        )
    }
}
