import React, { useContext, useEffect,useState } from 'react'
import { GlobalValue } from './index'
import {isFunction} from 'lodash';


/**
 * @function  {} //该HOC是通过函数柯里化实现
 * @param {Function} mapStateToProps //用于处理user定制获取state的方式
 * @param {Function} mapDispatchToProps //用于处理user定制的dispatch
 * @param {Comment} Component //接收组件
 * @param {Object} props //组件的props
 * @returns {Comment} //把user定制好的获取state的方式跟dispatch传递到组件的props
*/
export const withConnect = (mapStateToProps,mapDispatchToProps)=>Component=>props=>{
    

    const value = useContext(GlobalValue);
    const [state,setState] = useState(mapStateToProps(value.getState()));

    useEffect(()=>{
        validationFun(mapStateToProps);
        validationFun(mapDispatchToProps)

      const unSubscribe =   value.subscribe(()=>{
            setState(mapStateToProps(value.getState()))          
        })

        return () => unSubscribe()

    },[value])
    

    return (
    
        <>
          <Component {...props} {...state} {...mapDispatchToProps(value.dispatch)}/>
        </>
    
    )

}


function validationFun (fun){
    if(!fun||!isFunction(fun)){
        throw console.error('mapStatefromProps must be a function');
    }

}






    
