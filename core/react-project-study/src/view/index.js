import React from "react";
import Home from './Home'
import Context from './context/'
import Lifecycle from "./lifecycle";
import PureComponentTest  from "./PureComponent"
import MyApp from "./Hooks";
import MyuseContext  from "./Hooks/useContext/";
import Counter from "./Hooks/useReducer";


const App = ()=>{


    return (
        <>
        {/* <Home/>
        <Context/> */}
        {/* <Lifecycle></Lifecycle> */}
        {/* <PureComponentTest></PureComponentTest> */}
        {/* <MyApp></MyApp> */}
        {/* <MyuseContext></MyuseContext> */}
        <Counter></Counter>
        </>
    )
};

export default App;