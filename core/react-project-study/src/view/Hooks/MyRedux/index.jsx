import React, { useReducer, useState } from 'react'
import First from './First';

const reducer = (state,action)=>{
    console.log('action',action);
   
    let newState = state;
    const {type} =action;

    switch (type) {
        case 'changeName':
            newState= action?.payload
            return newState
    
        default:
            return state
    }


}

export const GlobalValue = React.createContext();
function MyRedux() {
    const [globalState] = useState({
        name:'test'

    })

    const [state,dispacth] =useReducer(reducer,globalState)

    return (
        <GlobalValue.Provider value={{
            ...state,
            dispacth
        }}>
            <First></First>
        </GlobalValue.Provider>
    )
}

export default MyRedux
