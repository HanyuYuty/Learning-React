import React from 'react'
import {Route} from 'react-router-dom'

function RouterComponent(route) {
    return (
        <>
             <Route
            path={route.path}
            /** 
             * @param {Object} props 由render函数提供，里面有关于路由的对象。
             */
            render={(props)=>{

             return  <route.component {...props} routes={route?.routes} {...route.prop}></route.component>
            }}  
            ></Route>
        </>
    )
}

export default RouterComponent
