//createStore在4.0版本已被弃用，但并未完全删除。
import { legacy_createStore,combineReducers,applyMiddleware  } from 'redux'
import menuReducer from './reducers/reducer'
import listReducer from './reducers/listReducer';
import initialState from './initialState';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools } from 'redux-devtools-extension';

//合并多个reducer
const reducer = combineReducers({
    menuReducer,
    listReducer
})

const enhancer = composeWithDevTools(applyMiddleware(reduxThunk))

const store = legacy_createStore (reducer,enhancer);



export default store;