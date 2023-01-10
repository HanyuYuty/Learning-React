import React, { useCallback, useReducer } from 'react';

/** 
 * @function init 如果useReducer传入的第三个参数是一个函数，那么它可作为初始化state。可以处理更加复杂的state。
 * @param {Object} state from useReducer the second arg ⭐如果不在其他地方调用该方法，第一个参数就是useReducer的第二个参数。
 * @returns {Object} required,返回值将会作为state返回。
 * 
*/
const init = (payload)=>{
    
    return payload


}


    /** 
     @param {object} state from useReducer the second arg
     @param {object} action action.type is from useReducer dispatch& action.type is required
    */

const reducer = (state, action) => {
    console.log('action',action);
    
    const {type,payload} = action;
    let newState = {...state};
    switch (type) {
        case 'add':
            newState.count++
            return newState;
        case 'decrement':
            newState.count--
            return newState;
        case 'reset':
            return init(payload)

        default:
          return state
    }
    

}



function ReducerChild({initialState}) {

    //相当于一个小型的redux
    const [state,dispatch] = useReducer(reducer,initialState,init);



    const handleDispatch = useCallback((type,payload)=>{

        switch (type) {
            case 'add':
                dispatch({
                    type
                })
                break;
            case 'decrement':
                dispatch({
                    type
                })
                break;
            case 'reset':
                dispatch({
                    type,
                    payload
                })
        }

    },[state])



    return (
        <div>
            <button onClick={()=>handleDispatch('decrement')}>-</button>
            {state.count}
            <button onClick={()=>handleDispatch('add')}>+</button>
            <button onClick={()=>handleDispatch('reset',initialState)}>reset</button>
        </div>
    )
}

export default ReducerChild

