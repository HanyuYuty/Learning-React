import React, { useEffect } from 'react'
import {useParams,useHistory} from 'react-router-dom';
import {store} from '../reduxConfig';
import {SHOWMENU,HIDEMENU} from '../reduxConfig/actionCreator/actionCreator'

function Details() {
    let params = useParams();
    const history = useHistory();
  
    useEffect(()=>{
        //分发action
        store.dispatch({
            type:HIDEMENU
        })

        return ()=>{
            store.dispatch({
                type:SHOWMENU
            })
        }

    },[])
  
    return (
        <div>
            <p onClick={()=>{
                history.goBack()
            }}>Details</p> 
        </div>
    )
}

export default Details
