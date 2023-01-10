//createStore在4.0版本已被弃用，但并未完全删除。
import { legacy_createStore,combineReducers,applyMiddleware  } from 'redux'
import menuReducer from './reducers/reducer'
import listReducer from './reducers/listReducer';
import initialState from './initialState';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

//合并多个reducer
const reducer = combineReducers({
    menuReducer,
    listReducer
})

//redux持久化
const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['listReducer']   will not be persisted
    //whitelist: ['navigation'] // only navigation will be persisted
  }

const persistedReducer = persistReducer(persistConfig, reducer)

const enhancer = composeWithDevTools(applyMiddleware(reduxThunk))



 

 const store = legacy_createStore (persistedReducer,enhancer);
 let persistor = persistStore(store)

 export{store,persistor}

