import React, { Component } from 'react';
import Father from './father/Father'

//定义context
export const Global = React.createContext();
export default class ContextTest extends Component {

    state={
            info:'',
    }

    render() {
        return (
            //向所有子组件传递数据
            <Global.Provider value={{
                info:this.state.info,
                setInfo:(value)=>{
                    this.setState({info:value})
                }
            }}>
                {this.state.info}
                <Father></Father>
            </Global.Provider>
        )
    }
}
