import { legacy_createStore,combineReducers,applyMiddleware,compose } from "redux";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import {composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'

import listReducer from './listReducer'
import actionSaga from './actionSaga'
import cityListReducer from './cityName'
import districtListReducer from './district'



//reducers
const reducers = combineReducers({
    listReducer,
    cityListReducer,
    districtListReducer
})

//config redux-saga
const sagaMiddleware = createSagaMiddleware();

//middleware & config devtools
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))


//redux持久化
const persistConfig = {
    key: 'system',
    storage,
    // blacklist: ['listReducer']   will not be persisted
    //whitelist: ['navigation'] // only navigation will be persisted
}



const persistedReducer = persistReducer(persistConfig, reducers)

const store = legacy_createStore(persistedReducer,enhancer);

sagaMiddleware.run(actionSaga)

let persistor = persistStore(store)



export {
    store,persistor
}