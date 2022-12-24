import React from "react";
import 'antd/dist/reset.css';
import Home from './Home'
import Context from './context/'
import Lifecycle from "./lifecycle";
import PureComponentTest  from "./PureComponent"
import MyApp from "./Hooks";
import MyuseContext  from "./Hooks/useContext/";
import Counter from "./Hooks/useReducer";
import MyRedux from "./Hooks/MyRedux";
// import RouterCase from './router'
import ReduxCom from "./redux";
import AntdHome from './antd'



import { BrowserRouter as Router } from 'react-router-dom';

const App = ()=>{


    return (
        <Router>
            {/* <Home/>
            <Context/> */}
            {/* <Lifecycle></Lifecycle> */}
            {/* <PureComponentTest></PureComponentTest> */}
            {/* <MyApp></MyApp> */}
            {/* <MyuseContext></MyuseContext> */}
            {/* <Counter></Counter> */}
            {/* <MyRedux></MyRedux> */}
            {/* <RouterCase></RouterCase> */}
            {/* <ReduxCom></ReduxCom> */}
            <AntdHome></AntdHome>
        </Router>
    )
};

export default App;





