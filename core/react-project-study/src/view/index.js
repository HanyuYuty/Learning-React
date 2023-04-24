import React from 'react';
import 'antd/dist/reset.css';
import Home from './Home';
import Context from './context/';
import Lifecycle from './lifecycle';
import PureComponentTest from './PureComponent';
import MyApp from './Hooks';
import MyuseContext from './Hooks/useContext/';
import Counter from './Hooks/useReducer';
import MyRedux from './Hooks/MyRedux';
// import RouterCase from './router'
import ReduxCom from './redux';
import AntdHome from './antd';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// const App = ()=>{

//     return (
//         <Router>
//             {/* <Home/>
//             <Context/> */}
//             {/* <Lifecycle></Lifecycle> */}
//             {/* <PureComponentTest></PureComponentTest> */}
//             {/* <MyApp></MyApp> */}
//             {/* <MyuseContext></MyuseContext> */}
//             {/* <Counter></Counter> */}
//             {/* <MyRedux></MyRedux> */}
//             {/* <RouterCase></RouterCase> */}
//             {/* <ReduxCom></ReduxCom> */}
//             <Route path="/" render={(route)=>(<AntdHome {...route}></AntdHome>)}></Route>

//         </Router>
//     )
// };

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false,errorMessage:'' };
    }

    static getDerivedStateFromError(error) {

        // 更新 state 使下一次渲染能够显示降级后的 UI
        //return { hasError: true,errorMessage:error };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        // logErrorToMyService(error, errorInfo);
        console.warn('error, errorInfo', error, errorInfo);
    }

    render() {
        if(this.hasError){
            return <ErrorCom errorMessage= {this.errorMessage}></ErrorCom>
        }
        return (
            <Router>
                <Route path="/" render={route => <AntdHome {...route}></AntdHome>}></Route>
            </Router>
        );
    }
}

export default App;



function ErrorCom(props) {
const {errorMessage} = props;



return (
    <p>{errorMessage}</p>
)

    
}
