import React, { createContext, useEffect, useState } from 'react'
import {HashRouter,Route,Redirect,Switch,Link,BrowserRouter as Router,useLocation} from 'react-router-dom'
import config from '../../router_config'
import NotFound from './NotFound'
import HasSubRouter from './HasSubRouter'
import Menu from './Menu'
import store from './reduxConfig';

export const GlobalValue = createContext();


function ReduxCom() {
    
    const [menuState,setMenuState] = useState(store.getState().menuReducer.showMenu);

    

        useEffect(()=>{
            
            //订阅/监听state变化
            store.subscribe(()=>{

                setMenuState(store.getState().menuReducer.showMenu)
            })



    },[])
   
    return (
        
        <Router>
                <GlobalValue.Provider value={store}>
                    {menuState&&<Menu router={config}/>}
                    
                    <Switch>
                        {
                            config&&config.map((route,index)=>(
                                    <HasSubRouter {...route} key={index}></HasSubRouter>
                            ))

                        }
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route component={NotFound}></Route>
                    </Switch>
                </GlobalValue.Provider>
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

export default ReduxCom





