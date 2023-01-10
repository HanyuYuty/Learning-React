import React from 'react'
import ReducerChild from './ReducerChild'
function Counter() {

    const initialState = {
        count:0
    }


    return (
        <div>
            <ReducerChild initialState={initialState}></ReducerChild>
        </div>
    )
}

export default Counter
