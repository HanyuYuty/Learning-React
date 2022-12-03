import React from 'react'
import {HashRouter,Route,Redirect,Switch,Link,BrowserRouter as Router,useLocation} from 'react-router-dom'
import config from '../../router_config'
import NotFound from './NotFound'
import HasSubRouter from './HasSubRouter'
import Menu from './Menu'

function RouterCase() {

   
    return (

        <Router>
               <Menu router={config}/>
            
            <Switch>
                {
                    config&&config.map((route,index)=>(
                            <HasSubRouter {...route} key={index}></HasSubRouter>
                    ))

                }
                <Redirect from='/' to='/home' exact></Redirect>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
        // <HashRouter>
        //     <Switch>
        //         {
        //             config&&config.map(({path,component,label})=>(
        //                 <Route path={path} component={component} key={path}>
        //                 </Route>
        //             ))
        //         }
        //         <Redirect from='/' to='/home' exact></Redirect>
        //         <Route component={NotFound}></Route>
        //     </Switch>
        // </HashRouter>
    )
}

export default RouterCase





