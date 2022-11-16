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

  

二、Hooks

- useState
  - setState是唯一改变state的方法
  ```js
  const [state,setState] = useState()
  ```
  - state同步异步的问题(是否马上挂载到dom节点上)
  
    **主要区别在于，setState是处于同步还是异步的逻辑中。如果处于同步逻辑中，setState是异步更新state；处于异步逻辑，则setState是同步更新state。**
  
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