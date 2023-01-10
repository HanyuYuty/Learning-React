## React知识点

一、版本区别：

- 18版本以上的react不在是使用ReactDOM.render把组件挂载到节点上，而是通过createRoot挂载。

  ```js
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './view'
  
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App tab="home" />);
  ```

二、状态（class组件）
  - 如果处于同步逻辑中，但是又想知道state是否已被更新，可以在setState传入回调函数作为第二个参数。
    
    ```js
    setState(newState,()=>{console.log(state)});
    ```

三、props.children

**React的插槽，可以减少一些组件通信。**
- 使用插槽后，在父组件定义事件，好处是能直接在父组件读取到父组件的状态以及修改状态，但是真正执行方法是在子组件处。
```js
class App extends React.Component{
    
    state={
      value:''
    }

    render(){
        return <Child><button onClick={()=>this.setState({value:this.state.value+1})}>这是react提供的</button></Child>
    }
}


class Child extends React.Component{
    
    
    render(){
        //此处的this.props.children能渲染出<button onClick={()=>this.setState({value:this.state.value+1})}>这是react提供的</button>
        return <>{this.props.children}</>
    }
}
```


四、生命周期（类组件）
**以下生命周期的钩子只针对类组件，16.8版本之前，函数组件为无状态组件。**
1、初始化阶段
- UNSAFE_componentWillMount 新版本已不推荐使用并且可以使用constructor代替。
```js
 componentWillMount(){
   //最后一次在挂载前，能修改state的地方。
 }

```
- render
  > 挂载节点，能访问props&state,但不允许setState。每次setState会导致组件刷新，render会重新执行。但是在render进行setState会出现最大溢出调用?（就是报错）
  
- componentDidMount
 > render成功渲染后执行，这时能获取到节点。
```js
componentDidMonth(){
//能获取节点，发起请求
}

```

2、运行阶段
- UNSAFE_componentWillReceiveProps
  > 父组件传props过来，父组件修改state的时候，子组件中的这个生命周期才会被执行。
   > 除了组件销毁，父组件或子组件更新一次，该钩子都会被执行。（影响性能?）
```js
import React, { Component } from 'react'

export default class Children1 extends Component {

    UNSAFE_componentWillReceiveProps(){
        console.log('props2==>',this.props);
    }
    render() {
        return (
            <div>
                Children1
                {this.props.children}
            </div>
        )
    }
}

```
- shouldComponentUpdate(可以防止无效的虚拟dom对比，优化性能)
  > 返回boolean值来判断组件是否渲染。**如若使用，则必须要有返回值，否则会报错**
   > 意为是否要更新组件，所以在该钩子中，拿到的是上一次的state。但它能接收两个参数，nextProps&nextState。state更新的时候，才会执行。
```js

shouldComponentUpdate(nextProps,nextState){
      console.log('pre state==>',this.state);
      console.log('nextState==>',nextState);
       if(this.state.count>=2){
           return false;
       }
       return true;
   }

```
- UNSAFE_componentWillUpdate
  > state被更新的时候才会执行。并且每调用一次setState都会被执行一次。
```js

   UNSAFE_componentWillUpdate(){
       console.log('document==>',document.querySelector('div'));
   }

```
- render
- componentDidUpdate
 > **会在更新后会被立即调用。首次渲染不会执行此方法。** 
   > 意为组件已更新完毕并且挂载到Dom树上了，在这里获取节点是安全的。能接收三个参数，prevProps, prevState, snapshot。在此钩子获取的state当然是最新的。
```js
 componentDidUpdate(prevProps, prevState, snapshot){
       console.log('prevState==>',prevState);
       console.log('this.state==>',this.state);
   }

```
3、销毁阶段
- componentWillUnmount
  > 销毁组件时会执行，可以在这里取消定时器，ajax请求，绑定到window的事件等
```js
   componentWillUnmount(){
     //组件被销毁时，绑定到window的事件也将被清除。
       window.onresize = null;

   }
```
4、新生命周期(新老生命周期不能共存)
 - static getDerivedStateFromProps **属于初始化阶段,在render之前**
  > 静态属性，组件首次渲染就会执行，后续state更新也会执行。必须返回一个对象，并且返回值将会与state合并更新。能获取nextProps&nextState。
   >由于该钩子的特殊性（无this，也没办法异步操作），一般搭配componentDidUpdate使用
```js
state={
  name:'initial name'
}
//由于该钩子是同步的，return会立即执行。如果在此尝试异步操作，再修改状态，状态不会被修改成功。
 static getDerivedStateFromProps(nextProps,nextState){
     console.log('static getDerivedStateFromProps');
     //相当于给state添加属性，并且在render之前。
     return {
         age:'new age',
     }

 }

```
- getSnapshotBeforeUpdate
  > 在组件更新过程中执行，可以在这里记录当时节点的一些信息。**在render之后执行**
   > 必须要有返回值，并且返回值会作为componentDidUpdate的第三个参数。
```js

   getSnapshotBeforeUpdate(nextProps,nextState){
  
       const div =   document.getElementById('list');

          return {
              scrollHeight:div.scrollHeight,
              div
          }
 }


```

五、React性能优化
 - PureComponent
  > React提供，由内部进行对比state是否有更新。可避免不必要的组件刷新。但不适用于state经常更新的组件，因为state更新一次，PureComponent就要进行一次对比，这样时间会慢很多。
```js
 import React, { PureComponent } from 'react'
export default class PureComponentTest extends PureComponent {
    state={
        value:''
    }
    render() {
        console.log('render');
        return (
            <div>
                <button onClick={()=>this.setState({value:111})}>Click</button>
            </div>
        )
    }
}

```

- shouldComponentUpdate
  > 添加判断条件，手动阻止不必要的更新。

六、React Hooks
 - 使用hooks的理由
  > - 高阶组件为了复用，导致代码层级复杂
    - 生命周期较多，比较复杂。
    - 以前的版本，function是无状态组件，如果该组件需要状态，则需要更换为class组件。这样开发成本高。

 - useState
  - setState是唯一改变state的方法
  ```js
  const [state,setState] = useState()
  ```
  - state同步异步的问题(是否马上挂载到dom节点上)
  
    **主要区别在于，setState是处于同步还是异步的逻辑中。如果处于同步逻辑中，setState是异步更新state；处于异步逻辑，则setState是同步更新state。**
 - useEffect
  > 能达到类似于生命周期的作用，但不是生命周期。可使用多次。
```js
  //空依赖?，只运行一次
  useEffect(()=>{

  },[])

  //根据依赖项进行运行，组件首次渲染会执行，之后只有依赖项更新才会再执行。
  useEffect(()=>{

  },[value])

  //表示不依赖,将会执行多次
  useEffect(()=>{

  })

  //等价于生命周期的componentWillOnMount
  useEffect(()=>{

    return (

    )

  },[])


```
  **与useLayoutEffect区别**
  > useLayoutEffect是react完成DOM更新之后，马上同步执行useLayoutEffect里面的代码，这样会阻塞页面的渲染。useEffect是等页面渲染完毕之后，才调用代码。
   > 不过，如果是需要操作DOM，可以使用useLayoutEffect来进行操作，避免在useEffect操作DOM会导致页面抖动。
- useCallback
  > 防止因为组件重新渲染，导致方法被重新创建，起到缓存函数作用。只有当依赖项更新之后，函数才会被再次声明。如果依赖项是空数组，那么函数里面读取的，永远是初始化时的状态。
```js
 const handleChange =  useCallback(()=>{
      
  },[state])
```

- useMemo
  > useMemo可以完全取代useCallBack的功能，只要在useMemo的第一个参数返回函数即可。只有依赖项更新之后，才会重新计算并返回执行结果。否则，其他状态更新，会使用之前缓存起来的值来计算，从而达到性能优化。
  
- **useMemo和useCallback两个的区别在于,useMemo会执行第一个参数函数，并且把函数执行结果返回出来，但是useCallback不会执行第一个参数，只是把第一个参数函数，返回。**
- useRef
  > 可以保存一些不希望被更新的变量，**背后都是闭包实现的**。
```js
const ref = useRef()

```
- useReducer
- useContext
  > 根据官网的说法，useContext接收Context对象本身，仍然需要上层组件数中，使用<Context.Provider>为下层组件提供Context。useContext只作接收订阅Context。
   > 使用useContext之后，一定程度上解决了代码冗余，不需要再使用<Context.Consumer>和一个回调来接收Context。
```js

export const GlobalContext = React.createContext();

function Global (){

  return <GlobalContext.Provider value={{
            someValue:''
          }}>

          <Children></Childdren>

          <GlobalContext.Provider/>
 
function Children (){

  //console.log(value) {someValue:''} 
  const value = useContext(GlobalContext)

  return (
    <div>I'm Children Component</div>
  )


}

```
- useReducer
```js
import React, { useCallback, useReducer } from 'react';


    /** 
     @param {object} state from useReducer the second arg
     @param {object} action action.type is from useReducer dispatch& action.type is required
    */

const reducer = (state, action) => {
    
    const {type} = action;
    let newState = {...state};
    switch (type) {
        case 'add':
            newState.count++
            return newState;
        case 'decrement':
            newState.count--
            return newState
    
        default:
          return state
    }
    

}

//初始化state，通过useReducer传到state中。
const initialState = {
    count:0
}

function Counter() {

    //相当于一个小型的redux
    const [state,dispatch] = useReducer(reducer,initialState);


    const handleDispatch = useCallback((type)=>{

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
        }

    },[state])



    return (
        <div>
            <button onClick={()=>handleDispatch('decrement')}>-</button>
            {state.count}
            <button onClick={()=>handleDispatch('add')}>+</button>
        </div>
    )
}

export default Counter


```
  - 使用init来进行惰性初始化init
```js
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



```

七、React-router-dom 路由
- HashRouter
  > 哈希路由
- Route
  > 匹配到路由之后，就会渲染出对应组件
```js
export default [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/summary',
        component:Summary
    },
    {
        path:'/details',
        component:Details
    }
]

 <HashRouter>
            {
                config&&config.map(({path,component})=>(
                    <Route path={path} component={component}></Route>
                ))
            }
 </HashRouter>

```
- Redirect
  > 重定向，从根路由开始，如果路由不匹配将去到指定的路由中
``` js
   <HashRouter>
              {
                  config&&config.map(({path,component})=>(
                      <Route path={path} component={component}></Route>
                  ))
              }
              <Redirect from='/' to='/home'></Redirect>

   </HashRouter>

```
- Switch
  > 只渲染匹配到的Route或Redirect
```js
 <HashRouter>
            <Switch>
                {
                    config&&config.map(({path,component})=>(
                        <Route path={path} component={component}></Route>
                    ))
                }
                <Redirect from='/' to='/home'></Redirect>
            </Switch>
 </HashRouter>

```
- 精准匹配
  > 以上都是属于模糊匹配,想要达到精准匹配的效果,可以传入exact。
```js
 //只有路径为/时，才会重定向到/home。更加精准
 <Redirect from='/' to='/home' exact></Redirect>

```
- 路由嵌套
```js

import React from 'react'
import {Route} from 'react-router-dom'

/**
 * @function 该函数作为中间商,专门处理嵌套路由
 * @param {Object} route  
 */
export default  function HasSubRouter(route) {
    return (
            <Route
            path={route.path}
            /** 
             * @param {Object} props 由render函数提供，里面有关于路由的对象。
             */
            render={(props)=>{

             return  <route.component {...props} routes={route?.routes}></route.component>
            }}  
            ></Route>
    )
}

```
- 动态路由
  > 通过动态路由传参,而路由方面，也必须配置成动态路由。接收方可用useParams接收。
```js
const routes = [{
        path:'/details/:query',
        component:Details,
        label:'Details',
}];
//这种方式，就是通过拼接路由的方式进行传参
 const handlToDetails = (id)=>{
        history.push({ pathname : `/details/${id}`})
}

function Details() {
    let params = useParams();
    return (
        <div>
            Details
        </div>
    )
}

export default Details

```

- React-router-dom的Hooks
  - useHistory
   > 实现路由编程式跳转
```js
function Menu(props) {
    const {router} = props;
    let history = useHistory();
    const handleJump = (route)=>{
        history.push(route?.path)
    }

    return (
        <>
             {
                    router&&router.map((route,index)=>(
                        <React.Fragment key={index}>
                        <li onClick={()=>handleJump(route)} >{route.label}</li>
                        </React.Fragment>
                    ))

                }
        </>
    )
}

```
- 路由拦截
  > 对部分路由进行权限限制，根据条件进行路由拦截。
```js
 isAuth&&
            <Route
            path={route.path}
            /** 
             * @param {Object} props 由render函数提供，里面有关于路由的对象。
             */
            render={(props)=>{
            //有token则渲染源路由组件，否则重定向到home路由组件
            return  localStorage.getItem('token')?<route.component {...props} routes={route?.routes}></route.component>:<Redirect to="/home"></Redirect>
            }} ></Route>


```
八、 纯函数
  >什么是纯函数?
    - 固定输入有固定输出,输出值只依赖调用函数时传入的参数。
    - 执行过程中无任何副作用。(改变数据或传入的参数就是一种副作用，依赖外部可以改变的数据也是副作用)
    - 不能依赖外部可以改变的数据(作用域外的对象，全局变量)
    - 不能改变外部状态(不能修改入参和作用域外的变量)
  
九、 Redux
- 通过redux提供的createStore创建store对象。
  > - store.subscribe 用于监听state的变化。
      **取消订阅,使用返回值来取消**
```js
    //如果无其他dispatch的情况下，不用担心subscribe会被多次调用，它只有state发生改变时，才会执行。
       const unSubscribe =  store.subscribe(()=>{
            setList(store.getState().listReducer.list);

        })

        //取消订阅
        return ()=> unSubscribe()

```
    - store.dispacth 用于分发action给reducer。
    - store.getState 用于获取state。
- combineReducers
  > 合并reducer,有时候处理不同的action,并且相关的state并不相关,这个时候,可以分开不同的reducer来进行处理,最后再合并成一个reducer。
```js
const reducer = combineReducers({
    menuReducer,
    listReducer
})

const store = legacy_createStore (reducer,applyMiddleware(reduxThunk));

```
- middleWare
  > redux本身无法处理异步操作，但是它提供了使用中间件的方式来处理异步。
 - redux-thunk
  >生成dispatch时,不在返回一个对象而是返回一个函数的方式。
```js
//在这里发送真正的dispatch
export default function getList() {
    

/**
 * @returns {function} 返回一个函数来进行redux的异步操纵,该函数能拿到dispatch参数。
*/
    return async (dispatch)  =>{

        const res = await axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
            method:"get",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        })

        dispatch({
            type:'getList',
            payload:res.data.data.cinemas
        })

    }
}

```
  
- react-redux
  > 

十、ES6模板字符串的新用法
```js

callBack`some data`

/**
 * @param {String} params //可使用模板字符串新用法
 * 
  */
function callBack(params) {
//params 接收则会变成数组



  return params[0]
  
}

```

十、React扩展