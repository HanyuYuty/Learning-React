import React, { useEffect } from 'react'

import {useHistory} from 'react-router-dom'

import getList from '../reduxConfig/actionCreator/getList';

import { withConnect } from '../withConnect';



function First(props) {
    
    // const [list,setList]=useState(store.getState().listReducer.list);
    const {myList,getSomeList} = props;
    const history = useHistory()
    
    useEffect(()=>{
    //     //只有list无数据时，才发请求
    //     if(store.getState().listReducer.list.length===0){
    //         store.dispatch(getList())
    //     }
    //     //如果无其他dispatch的情况下，不用担心subscribe会被多次调用，它只有state发生改变时，才会执行。
    //    const unSubscribe =  store.subscribe(()=>{
    //         setList(store.getState().listReducer.list);

    //     })

    //     //取消订阅
    //     return ()=> unSubscribe()
    if(myList.length===0){
        getSomeList(getList())
    }
        
    },[])
    const handlToDetails = (id)=>{
        history.push({ pathname : `/details/${id}`})
    }

   

    return (
        <div>
            {
                myList.map(it=>{
                    return <li key={it.cinemaId} onClick={()=>handlToDetails(it.cinemaId)}>{it.name}</li>
                })
            }
        </div>
    )
}

// export default First

function mapStateToProps(state){


    return {
        myList:state.listReducer.list
    }

}

function mapDispatchToProps (dispatch){

    return {
        getSomeList:dispatch
    }

}

export default withConnect(mapStateToProps,mapDispatchToProps)(First)

