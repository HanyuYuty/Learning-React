import React, { createContext, useEffect, useState } from 'react'
import {HashRouter,Route,Redirect,Switch,Link,BrowserRouter as Router,useLocation} from 'react-router-dom'
import config from '../../router_config'
import NotFound from './NotFound'
import HasSubRouter from './HasSubRouter'
import Menu from './Menu'
import {store,persistor} from './reduxConfig';
import { PersistGate } from 'redux-persist/integration/react'

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
                    <PersistGate loading={null} persistor={persistor}>
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
                    </PersistGate>
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




// var getItem = Storage.prototype.getItem;

 
//     Storage.prototype.getItem = function(key) {
//        console.log('this',this);
//         if (this === window.localStorage && key==="extra_data") {
//             return {};
//         } else {
//             // fallback to default action
//             getItem.apply(this, arguments);
//         }
//     }
