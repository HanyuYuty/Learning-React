import React from 'react'
import {Route,Redirect} from 'react-router-dom'

/**
 * @function 该函数作为中间商,专门处理嵌套路由
 * @param {Object} route  
 */
export default  function HasSubRouter(route) {
    const {isAuth} = route;
    return (
        isAuth?
            <Route
            path={route.path}
            /** 
             * @param {Object} props 由render函数提供，里面有关于路由的对象。
             */
            render={(props)=>{

            return  localStorage.getItem('token')?<route.component {...props} routes={route?.routes}></route.component>:<Redirect to="/home"></Redirect>
            }}  
            ></Route>
            :
            <Route
            path={route.path}
            /** 
             * @param {Object} props 由render函数提供，里面有关于路由的对象。
             */
            render={(props)=>{

             return  <route.component {...props} routes={route?.routes}></route.component>
            }}  
            ></Route>
    )
}


