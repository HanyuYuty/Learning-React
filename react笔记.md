##### react 

> 于2013年5月开源，并不是完整的MVC框架，最多可以认为是View层，react把view层分成每一个独立块（组件）。

- 工作原理

> 创建VDOM，VDOM其实就是通过js生成对象，当数据更新之后，再通过diff算法对新旧对象进行对比，使用打补丁形式，最后生成DOM节点。

- jsx

> jsx是js+xml。Babel编译器会把jsx编译成js对象，再生成DOM节点插入页面。

 `语法要求，class属性，需要写成className，<label for="">需要写成htmlFor`

```js
//babel作用，编译jsx。
ReactDOM.render(<div id="box"><div>,document.getElementById('root'))

//babel会编译成
ReactDOM.render(React.createElement('div',{
    id:'box'
}),document.getElementById('root'))
```

##### 组件

> 函数组件与类组件的区别
>
> - 状态
> - 生命周期
> - this
> - 自我刷新
>   - 修改state
>   - 强制刷新

- 类组件

  **默认只有render、constructor、生命周期有this。**

  - 事件绑定

    - **事件绑定的一定是回调函数，不能是函数执行。**

    - **react中，并不会把事件绑定在真实节点上，而是采用事件代理（事件委托）的模式。**

    ```html
    <button onClick={fn1}></button>
    ```

  - 四种写法的区别

    ```js
    //可访问到this，与render函数的this一致。
    <button onClick={()=>{}>
    </button>
    
    //访问不到this，this指向undefined。(在jsx里，this指向react?)
    <button onClick={this.fun1}>
    </button>
    //但，可以通过改变this指向，访问到this。
    <button onClick={this.fun1.bind(this)}>
    </button>
    
    //fun1与fun2的区别在于，声明函数的方式不一样。
    <button onClick={this.fun2}>
        
    </button>
    <button onClick={()=>
        {this.fun3()}
    </button>}>
        
    </button>
    ```

    ```js
    fun1(){
        
    }
    
    //这种声明方式，即使直接事件绑定也能获取到this指向。
    fun2=()=>{
        
    }
    //能获取到this指向
    <button onClick={this.fun2}></button>
    ```

  - Ref转发

    - createRef

      > 只创建而未进行绑定的话，它的current属性为null。

    ```js
    //通过react的createRef，创建一个ref对象。
    import {createRef} ="react";
    myRef = createRef()
    <input ref={this.myRef} / >
    ```

    ​           1、this.myRef.current获取到DOM节点对象或组件实例。

    - 回调Refs(推荐)

    ```js
    import {createRef} ="react";
    myRef = createRef()
    <input ref={el=>this.myRef=el} / >
    ```

    - 直接通过this.myRef可获取到DOM节点对象或组件实例。

  - React.StrictMode

    1、在react的严格模式下开发，直接在组件或节点上绑定ref会报错。使用createRef创建ref则不会报错。

    

- 状态State

  > 就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是组件自己维护，目的就是为了不同状态下，使组件的显示不同。

- setState

  - 调用setState会使render函数执行，重新渲染dom节点。
  - 若setState处于同步的逻辑中，异步更新状态，异步更新真实DOM节点
  - 若setState处于异步的逻辑中，它是同步更新状态，同步的更新真实DOM节点。
  - 第二个参数是回调函数，是状态更新完毕并渲染到节点上才执行。

  ```js
  //对象写法 
  this.setState({count:this.state.count+1},()=>{
     //能立刻访问到count最新的状态
          console.log(this.state.count);
      })
  
  //函数写法
  this.setState(function(prevState){
      return {
          count:prevState.count+1
      }
  })
  ```

- props

  - 接收父组件传递过来的的自定义属性。

    ```js
    //可使用扩展运算符传递
    <BottomBar {...obj}></BottomBar>
    ```

  - 类型校验（类似vue的provide校验）

    - 类组件名.propTypes={}（静态属性）

      ```js
      <App><Cp1 title="abc"/></App>
      Cp1.propTypes={
          title:String//将会校验prop是否传入的是String。
      }
      ```

    - 使用React的内置检验数据类型的检查器 prop-types

      ```js
      import check = "prop-types"
      <App><Cp1 title="abc"/></App>
      //通过prop-types的方法检验。注意是直接使用属性，不是调用函数。
      //☝类组件外部写
      Cp1.propTypes={title:check.string}
      //默认值
      Cp1.defaultProps={title:"Have some defalut value"}
      
      //✌或是
      class Cp1 extends Component={
          //静态属性
          static propTypes={
          title:check.string,
          content:PropsType.oneOf(['abc','efg'])//规定只能是这两个值之一。
          password:function(props){
          //通过一个函数进行检测
          //不符合，手动抛出一个错误。
          if(!password) throw new Error('password is required')
          }
         }
      }
      ```

  - 默认属性 defaultProps

    ```js
    import check = "prop-types"
    <App><Cp1 title="abc"/></App>
    
    class Cp1 extends Component={
        static defaultProps={title:true}
    }
    ```



- 函数组件

  > 在babel的编译下，处于严格模式，this不允许指向window，因此指向underfind。

  - 首字母必须是大写，小写react会默认认为是浏览器标签。

  `16.8前的函数组件，是无状态组件。hooks是16.8之后才有的`
  
  - 函数组件接收props
  
    ```js
    //形参处接收
    function Cp2(props){}
    ```
  
- Hooks

  > 只能在函数组件中使用，并且在函数最外层使用。
  >
  > > **不能在条件、循环、或者嵌套方法中调用Hooks**。要在React方法的顶层里调用。遵循这个方式，能保证每次组件渲染时，Hooks都是按照相同的顺序被调用。这能使React在多个useState和useEffect的情形下正确保存state数据。

  - useState

    **使用useState刷新组件，能保证状态，得到的是最新值。**

    > 为什么返回一个数组而不是对象？因为解构数组，能自定义变量，对象不行。

    **修改状态的方法，支持传入函数写法。**

    ```js
    const [a,changeA] =useState(1);
    //修改状态的方法，第二个参数不支持回调。
    
    
    //如果是函数写法，参数为上一个状态值。所以它也是异步的。
    changeA((preState)=>{})
    ```

  - useEffect

    > 实现函数组件的生命周期的效果。初始化与刷新都会执行useEffect。

    ```js
    //用法一 useEffect(fn)
    useEffect(()=>{
        //能等效于componentDidMount+componentDidUpdate效果
    })
    
    //用法二 useEffect(fn,dependencies)
    //依赖,有条件执行。第二个参数为数组，可写多个依赖，是或运算。
    useEffect(()=>{
        //这里的代码在初始化与只有依赖值变化时，才会执行。
        //等效于componentDidMount+shouldComponentUpdate。
    },['dependencies'])
    
    //用法三
    //空依赖 useEffect(fn,[])
    useEffect(()=>{
        //只在初始化执行，等效于componentDidMount
    },[])
    
    
    //用法四 useEffect(()=>{return fn})
    useEffect(()=>{
        return function (){
            //在组件销毁时，执行。等效于componentWillUnMount
        }
        
    })
    
    
    ```

  - useMemo

    > 一般用于编写一些比较耗费资源且无需重复执行的代码，以达到优化性能的目的，返回值为回调函数的结果。

    ```js
    import {useMemo} from 'react';
    
    //用法一 无依赖
    const totalPrice(()=>{return})
    
    //用法二 空依赖，只有初始化才会执行。
    const totalPrice(()=>,[])
    
    
    //用法三 初始化与依赖发生变化时，执行。
    const totalPrice(()=>,[price])
    ```

    

  - useCallback(缓存的是函数)

    - 具有缓存机制，第一个参数依赖于第二个参数的变化。

    ```js
    //第一个参数是缓存项，第二个参数是依赖项。只有第二个参数发生变化时，第一个参数才会返回一个新的值。
    
    //与useMemo一样，有三种用法。
    cosnt fn1=useCallback(()=>setA(a++),[b])
    
    //⭐空依赖写法，也有用处。
    const changeQty = useCallback(setQty((preQty)=>{
        //搭配着修改状态的第二种写法，传入一个函数。只要知道上一个状态的值，进行业务逻辑。useCallback空依赖的情况下，能优化性能，并且也能修改状态。
        return preQty+1
    }),[])
    ```

  - useMemo（缓存的是函数的返回值）

    ```js
    let [num,setNum] = useState(0)
    let [price,setPrice] = useState(0)
    //第一个参数的返回值是缓存项，第二个参数是依赖项。只有当依赖值发生变化时，才会
    const total =useMemo (()=>num*price,[num,price])
    ```

  - useContext

    ```js
    import {useContext} from "react";
    import context from './context'
    
    //函数组件代码
    const data = useContext(context)
    
    
    //创建context文件代码
    import {createContext} from "react";
    //创建并设置默认值
     const context = createContext({username:'zhuti'});
    export default context
    ```

  - useReducer

    > 主要针对初始状态为复杂数据类型，如果后期需要修改具体某一个值，用useState会比较麻烦，因为是直接赋新值的原因。这个时候，用useReducer，可以解决。
    >
    > > - 类似于createStore,有两个参数

    ```js
    //⭐这里使用useMemo和useCallback并且空依赖，当组件刷新的时候，这里的代码只会在初始化执行，之后的刷新，并不会执行，也不会新创建变量，达到优化效果。
    const initState = useMemo(()=>return [{id:1,name:'john',age:18}...],[]}
    
    const reducer = useCallback((state,action)=>{
        //跟redux使用是一样的。也是不能直接修改state，也是需要返回最新的状态。
    },[])
    
    
    const [state,dispatch]=useReducer(reducer,initState)
    //修改state，就必须使用dispatch，并且传入一个对象。
    ```

  - useRef

    1. **useRef有缓存，组件更新时，不会重新创建新的ref对象，而是从缓存中获取。但，createRef不是。**
    2. **保存临时变量**

    > 与createRef类似，都会创建一个ref对象。但是useRef可以设一个默认值，但是createRef没有默认值。
    >
    > - 灵活使用ref.current属性，官方解释，它可以是存放一个变量的盒子，但是它里面变量更改，是不会提醒我们的。

    > 如果只创建而未进行绑定的话，那么current属性未undefined。

    ```js
    const ref1 = useRef();
    ```

  - useLayoutEffect

    > 浏览器绘制前执行。会阻塞后面的代码。

  - 

- 自定义hook

  > 目的是为了组件逻辑的复用。

  - 一定是一个函数，约定用use开头。自定义hook内部可以使用其他hook。


##### props与state

- 相同点：都是纯js对象。都会触发render。

- 不同点：

  1、 属性能从父组件获取，状态不行。

  2、 属性可由父组件修改，状态不行。

  3、子组件不能直接改属性。

##### 表单受控与非受控组件

- **广义的说法，React组件的数据渲染是否被调用者传递的props完全控制，控制则受控组件，否则是非受控组件。**

- **input在React中，input事件与change事件等效。**

- 非受控表单组件

  **一般搭配defaultValue**

  - React要编写一个非受控组件，可以通过refs从DOM节点中获取表单数据，这种就是非受控组件。
  - 在React渲染生命周期时，表单节点的value将会覆盖DOM节点的值，这个时候，可以给非受控组件设置defaultValue属性，而不是value。

- 受控组件

  - **使React的state成为唯一的数据源。**

  - 直接给表单组件的value属性，绑定组件state。
  - 便于与子组件通讯



##### 组件通讯

- props 父传子

- 子传父 callback(父组件传一个函数给子组件,子组件接收函数，通过调用该方法，修改父组件的状态。)

  ```js
  <App>
      <Cp1 change={this.change}></Cp1>
  </App>
  
  
  class App extends Component{
      state={
          a:1
      }
      change()=>{
          this.setState({++a})
      }
  }
  ```

- Ref

  - 绑定到组件上，能获取到组件的原型。

  **若需要修改子组件的状态，最好在子组件内部设置修改状态的方法，然后父组件通过Ref获取到子组件的原型方法，调用即可。**

  ```js
  const input =createRef
  <App>
    <Cp1 ref={input}></Cp1>
  </App>
  ```

- context

  - <Context.provider>

  ```js
  import {createContext} from "react"
  
  //创建context。
  const globalContext = createContext()
  
  
  //父组件
  //创建后的context会有provider这个属性。
  //⭐一定要是value属性。
  <globalContext.Provider value={{
     a:1,
     b:2,                               
  }}>
      <App>
        <Cp1 ref={input}></Cp1>
      </App>
  </globalContext.Provider>
  ```

  - <Context.Consumer>

  ```js
  //子组件
  //基于一个函数，它的形参value值，进行渲染。
  class Cp1 extends Component{
      render(){
          return (
           <globalContext.Consumer>
              {
                  value=>{
                  <>
                      <div>Cp1组件内容</div>
                      <p>{value.a}</p>
                  </>
                 }
              }
           </globalContext.Consumer>
          )
      }
  }
  
  
  //给子组件添加静态属性
  class Cp1 extends Component{
      //MyContext为一个js文件创建的context
      static contextType = MyContext;
      render(){
          return (
           <globalContext.Consumer>
                  <>
                      <div>Cp1组件内容</div>
                      <p>{value.a}</p>
                  </>
                 }
           </globalContext.Consumer>
          )
      }
     
  }
  
  //或者，这种写法
  Cp1.contextType = MyContext
  ```

##### 封装组件

> 注意：需要无条件传递子节点。（props.children）。
>
> react里面，没有插槽，如何实现插槽、作用域插槽？
>
> > props.children可以是一个函数的形式，这样封装的组件，调用props.children(data)，把数据传出去。

- Render props

  > 使用一个值为函数的prop，共享代码的简单技术。（类似于vue的作用域插槽）

```js
1、<myComponent>
   {
    (data)=>{
        <div>{data}</div>
    }
}
</myComponent> 

2、<myComponent render={(data)=><div>{data}</div>}>   
</myComponent>    
    

//封装组件代码
function myComponent(props){
    return (
    <>
      props.children(data)
    </>
    
    )
}
```

##### React中的插槽

- **react中其实是没有插槽这个概念的**

- 作用：

     1、为了复用

     2、尽量减少父子通讯?

> 如果父组件想给子组件结构内添加内容，子组件可通过this.props.children获取到内容。

- 如果是传入多个内容，react会把它充当为一个数组，如果想对应显示内容，就需要加上相应索引。

```js

<App>
  <Cp1>
    <div>给你添加内容1</div>
    <div>给你添加内容2</div>
    <div>给你添加内容3</div>
    
  </Cp1>
</App>



class Cp1 extends Component{
    //MyContext为一个js文件创建的context
    static contextType = MyContext;
    render(){
        return (
            {this.props.children[0]}
            {this.props.children[1]}
            {this.props.children[2]}
        )
    }
   
}
```



##### 生命周期

>  **只有类组件才有生命周期**

- Initial [ɪˈnɪʃl]初始化阶段

  ```js
  //初始化props。
  constructor(props){}
  ```

- Mounting：挂载阶段

  - static getDerivedStateFromProps

    > 1. 必须返回一个对象。可以在这个生命周期里面最后一次修改初始state
    > 2. 有两个参数，nextProps、nextState
    > 3. **注意，它是静态属性，是没有this的。**
    > 4. 一般与componentDidUpdate搭配使用。

  ```js
  static getDerivedStateFromProps(nextProps，nextState){
      //这里return的值，如果和state重名就是覆盖state，不重名就是合并。
      return{
          
      }
  }
  ```

  - componentDidMount

    > 可在此处做数据请求，订阅函数调用，setInterval、基于创建完的dom进行初始化。（可使用betterScroll）

  ```js
  /*
  `挂载前`
  1、但componentWillMount已更改名字为UNSAFE_componentWillMount。
  2、到18版本只有UNSAFE_componentWillMount才可以使用。它的优先级比较低。
  3、不推荐使用，官方推荐把这里代码放到componentDidMount。
  */
  componentWillMount(){}->UNSAFE_componentWillMount
  
  //**这里会执行render**
  render(){}
  
  //`挂载后`
  //开启ajax、定时器等，都可以在这里开启。
  componentDidMount(){}
  ```

- Updating：更新阶段

  - 监听着props、state的变化。

  - getSnapshotBeforeUpdate

    > 1. 替代了componentWillUpdate
    > 2. 在render之后执行。
    > 3. 必须要有返回值，否则会报错。
    > 4. 可用于记录当前节点的状态。
    
    ```js
    //该案例是即使有新内容添加，正在浏览的位置也不会被顶走。
    import React, { Component, createRef } from 'react';
    
    export default class Function extends Component {
        state = {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        div = createRef();
    //在更新之前，先把元素原高度和被卷走的高度，记录下来。
        getSnapshotBeforeUpdate() {
            const height = this.div.current.scrollHeight;
            const top = this.div.current.scrollTop;
              console.log('top',top);
            //   console.log('height',height);
            return {
                top,
                height,
            };
        }
    //在更新之后，把被卷走的敢赌设置为，当前元素高度-之前的元素高度，并加原本有卷走的高度。
        componentDidUpdate(prevProps, prevState, value) {
            const height = this.div.current.scrollHeight;
            console.log('did height', height);
            console.log('did top', this.div.current.scrollTop);
            this.div.current.scrollTop = (height - value.height)+value.top;
        }
    
        render() {
            let { list } = this.state;
    
            return (
                <>
                    <div
                        id="box"
                        style={{
                            height: '300px',
                            background: 'red',
                            width: '200px',
                            overflow: 'scroll',
                        }}
                        ref={this.div}
                    >
                        {list.map(item => (
                            <li key={item} style={{ marginBottom: '20px' }}>
                                {item}
                            </li>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            this.setState({ list: [...[10, 11, 12, 13, 14, 15], ...list] });
                        }}
                    >
                        添加list
                    </button>
                </>
            );
        }
    }
    
    ```
    
    

  ```js
  /*
  1、该钩子情况与componentWillMount一样
  */
  componentWillUpdate(){}->UNSAFE_componentWillUpdate
  
  //第三个参数，value用于记录getSnapshotBeforeUpdate的返回值
  componentDidUpdate(prevProps,prevState，value){}
  ```

- 特殊钩子函数

  ```js
  //该钩子的返回true或false，决定于组件是否执行更新阶段。
  //可根据返回true或false，实现性能优化。
  shouldComponentUpdate(nextProps,nextState){
      return true/false
  }
  
  /*
  1、该钩子情况与componentWillMount一样。
  2、props发生改变时，会执行该函数。
  */
  componentWillReceiveProps(){}
  ```

  

- Unmounting：卸载阶段

  ```js
  componentWillUnmount(){}
  ```

- static getDerivedStateFromProps 静态属性

  **初始化时会执行一次，state更新后也会执行。无this指向**

  - 一般跟componentDidUpdate一起使用，在componentDidUpdate中发送ajax请求。

  ```js
  //组件一定要设置状态，并且，钩子返回一个对象
  static getDerivedStateFromProps(nextProps,nextState){
      return {
          a:'123'//如果state有相同的属性就覆盖初始值，否则就合并
      }
  }
  ```

  

##### 错误边界

> 边界错误只能捕获子组件的错误。

- static getDerivedStateFromError(error){}



##### HOC高阶组件 High Order Component

> 为了组件逻辑复用。它一定是一个函数，参数是组件，并且返回一个组件。

> - 高阶函数（包装函数）
> - 纯函数
>   - 不修改传入的参数
>   - 固定输入有固定输出

- HOC的要求
  - 必须为一个纯函数
  - 传入一个组件,并返回一个新的组件
  - 装饰器模块

- 定义高阶组件

  > 为什么需要高阶组件

  - 属性传递  - 为了向下传递需要的props，为了提取公共代码。
  - 反向继承
    - 继承传入的组件。

- 命名规范

  - with开头

- 注意事项

  - 必须传递props给被包装的组件。

##### React补充
 - createPortal
 > React Portal 提供了一种将子节点渲染到父组件以外的 DOM 节点的优秀解决方案。Portal 的最常见用例是子组件需要从视觉上脱离父容器。（Modal组件）
- 为何使用
  - 当我们在特定元素（父组件）中使用模态弹窗时，模态的高度和宽度就会从模态弹窗所在的组件继承，也就是说模态弹窗的样式可能会被父组件影响。 
- 注意以下：
  - 事件冒泡会正常工作 —— 通过将事件传播到 React 树的祖先，事件冒泡将按预期工作，而与 DOM 中的 Portal 节点位置无关。
  - React 可以控制 Portal 节点及其生命周期 — 当通过 Portal 渲染子元素时，React 仍然可以控制它们的生命周期。
  - React Portal 只影响 DOM 结构 —— Portal 只会影响 HTML DOM 结构，而不会影响 React 组件树。
  - 预定义的 HTML 挂载点 —— 使用 React Portal 时，你需要提前定义一个 HTML DOM 元素作为 Portal 组件的挂载。
  - 当我们在特定元素（父组件）中使用模态弹窗时，模态的高度和宽度就会从模态弹窗所在的组件继承，也就是说模态弹窗的样式可能会被父组件影响。

 ```js
    /**
     * ReactDOM.createPortal(child,container)
     * @param {*} child 这里的 child 是一个 React 元素，fragment 片段或者是一个字符串
     * @param {*} container Portal 要插入的 DOM 节点的位置。
    */
     ReactDOM.createPortal(
            <div className={styles.modal}>
                Modal
            </div>,document.body)

 ```
 - React.lazy
 > 懒加载组件（优化）。⭐D:\User\Amanda\Desktop\Learning-React\core\react-project-study\src\view\antd\components\Modal.jsx 若懒加载该组件时，会导致通过redux更改数据，无法立即更新视图。(未知具体原因)
```js

  import React, { Suspense, Component } from 'react';
  import './App.css';
  //使用React.lazy导入OtherComponent组件
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  export default class App extends Component {
      state = {
          visible: false
      }
      render() {
          return (
              <div className="App">
                  <button onClick={() => {
                      this.setState({ visible: true })
                  }}>
                      加载OtherComponent组件
                  </button>
                  <Suspense fallback={<div>Loading...</div>}>
                      {
                          this.state.visible
                              ?
                              <OtherComponent />
                              :
                              null
                      }
                  </Suspense>
              </div>
          )
      }
  }

```
- forwardRef
> 因为函数组件不允许绑定Ref,但是react提供了forwardRef，让我们能绑定到函数组件内部的input之类的标签。(可以透传多层)
```js
  //子组件
  /*  使用forwardRef的函数组件,自动传入props、ref两个参数。
  */
 
  const Child = forwardRef((props, ref) => {
      return <div>
          <input type="text" ref={ref} />
      </div>
  })
  //父组件
  class App extends Component {
      myref = createRef()
      componentDidMount() {
          this.myref.current.focus()
      }
      render() {
          return (
              <div>
                  <Child ref={this.myref} />
              </div>
          )
      }
  }


```

- memo
> 缓存组件,仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲
染流程。但是React.memo()，我们可以仅仅让某些组件进行渲染。
PureComponent 只能用于class 组件，memo 用于functional 组件。
```js
      import { memo } from 'react'
    const Child = memo(() => {
        return <div>
            <input type="text" />
        </div>
    })
     //或者
    const Child = () => {
        return <div>
            <input type="text" />
        </div>
    })
    const MemoChild = memo(Child)

```

##### 函数柯里化

> 通过函数调用继续返回函数的方式，实现多次接收参数后，统一处理的函数编码形式。

##### 扩展运算符

- 展开：数组、对象的复制

- 剩余：解构、函数参数接收。

  - 函数形参为剩余、实参为展开。

    ```js
    //形参剩余为一个数组。
    function sum(...keys){}
    
    
    let arr =[1,2,3]
    sum(...arr)
    ```

    

##### React优化方案

- 类组件
  - 使用shouldComponentUpdate(){}

> 在内部通过返回true、false实现性能优化，实际开发中使用lodash等第三方工具库配合判断。
>
> >  父组件刷新
> >
> > state被修改
> >
> > props被修改

  - 继承PureComponent

> 与Component的区别是，PureComponent内部帮我们做了shouldComponentUpdate的简单判断。但是复杂逻辑还是使用Component搭配shouldComponentUpdate。

- 函数组件

  - useCallback

    > 由于状态变化引起整个函数组件的执行，因此内部的一些函数会重新创建在内存中，因此使用useCallback。它具有缓存机制，每次执行都是从缓存中调用。当依赖的参数发生变化时，才会再次执行。
    
  - useMemo

##### React-router-dom

- 选择路由类型

  1、hash路由：<HashRouter/>

  2、history路由：<BrowserRouter/>

  > 因为history，是真正通过url发送一个请求到后端，所以history路由需要后端设置。

- 配置路由

  1. 路由 <Route>

     - path

     - component

     - render

       > 传入一个回调函数，并且回调函数的第一个函数，是props。
       >
       > 注意：通过render渲染的组件，并没有接收到history对象。需要手动传入。

       ```js
       <Route path='/center' render={()=>{
           isLogin?<Center {...props} />:<Loign />
       }}>
       ```

     - exact

       ```js
       <BrowserRouter>
           <Route path="/home" component={Home}></Route>
           <Route path="/reg" >
               <Reg />
           </Route>
       </BrowserRouter>
       ```

  2. 路由重定向 <Redicrect>

     - from

     - to 

     - exact 精准匹配

       ```js
       <--!如果不加exact，默认为模糊匹配-->
       <Redirect from="/" to="/home" exact/>
       <--!exact为精准匹配-->
       ```

  3. 匹配路由 <Switch>

     > 匹配到其中一个就会跳出Switch，参考了原生的switch

  ```js
  <BrowserRouter>
      <Switch>
             <Route path="/home" component={Home}></Route>
             <Route path="/reg" >
                  <Reg />
             </Route>
             //404效果
             <Route path="/404" render={()=><div>页面不存在</div> / >  
             <Redirect from="*" to="/404" exact/>
      </Switch>
  </BrowserRouter>
  ```

  4. 嵌套路由（子路由）

     > 在子组件中，使用react-router-dom，配置路由。然后直接把子组件，嵌套到父组件中。

- 路由跳转

  - 声明式导航 <Link>/<NavLink>

    **一定要被<BrowserRouter>包裹在内**

    - <Link>
      - to
      - replace
    - <NavLink>
      - to
      - replace
      - activeClassName 修改默认类名
      - activeStyle 添加样式

    ```js
    <Link to="/home" />
    //默认有active类名
    <NavLink to="/home" activeClassName="current"/>
    ```

  - 编程式导航

    >  跳转方法=> **要实现编程式导航，必须获取到`history`对象**

    - **react-router-dom中的hooks**

      - useHistory

        > 等效于props.history。一样也是创建了history对象，拥有同样的跳转方法。

    - push()

      ```js
      //字符串写法
      history.push('/login')
      ```

      ```js
      //对象写法
      history.push({
          pathname:'/login'})
      ```

    - replace()

    - go()

    - goback()

      - 函数组件可通过props对象下获取到`history`对象。前提是一定要在Route包裹下，props才会有`history`。

      - withRouter高阶组件

        ```js
        //App是根组件，它没有被route包裹，所以props对象无history对象，使用withRouter高阶组件处理一下，就可以访问到props对象下的history对象。
        App = withRouter(App)
        ```

    - listen()

      > 监听路由

      ```js
      //只有当路由跳转之后，才会执行。页面刷新的时候，改方法不会执行。调用时候，需要注意。
      props.history.listen((location)=>{
          //路由发生改变时会触发这里的方法。
      })
      ```

    - 传参

      - search
        - `通过?后的参数传参`
        - 数据持久化

      ```js
      props.history.push({
          pathname:'/details',
      //search不支持对象写法 
         search:'?targetUrl=/mine'
      })
      ```

      - params 动态路由
        - 数据持久化

      ```js
      history.push('/details/'+id)
      ```

    - 自定义参数

      **页面刷新后，会丢失数据。**

      ```js
      props.history.push({
          pathname:'/details',
      //search不支持对象写法 
         search:'?targetUrl=/mine',
          test:{a:1,b:2}
      })
      ```

    - state

      > 页面刷新后，state属性值为undefined

      ```js
      props.history.push({
          pathname:'/details',
      //search不支持对象写法 
         search:'?targetUrl=/mine',
          test:{a:1,b:2},
          state:{c:20,d:30}
      })
      ```

      

    - 接收参数

      - location

        > 接收search传递的参数。也是需要通过props对象下的location对象。

        ```js
        //获取search
        props.location.search
        //得到的是字符串，需要使用URLSearchParams类处理。
        ```

        

        - URLSearchParams=>由于search传递的参数，是直接一个字符串的，需要格式化。

        ```js
        //专门针对?后面的参数，处理参数。
        new URLSearchParams(props.location.search).get('需要提取出来的某个值')
        new URLSearchParams(props.location.search).getAll('需要提取出来的某组值')
        ```

      - match

        > 接收动态路由参数

        ```js
        props.match.params
        ```

      - 获取自定义参数

        ```js
        props.location.XX
        ```

      - 获取state

        ```js
        props.location.state
        ```

##### 反向代理

> react中解决跨域。
>
> 1. `npm i http-proxy-middleware`
>
> 2. 在src同级下创建setupProxy.js文件配置
>
>    ```js
>    const { createProxyMiddleware } = require('http-proxy-middleware');
>    
>    app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
>    ```
>
> 3. 重启服务器

##### cssModule

> 把css文件也做模块化，这样就不会出现样式污染的情况。
>
> 1. 把css文件后缀名，改为xxx.module.css
>
> 2. 引入
>
>    ```js
>    import style from "./xxx.module.css"
>    ```
>
> 3. 模块化css文件之后，id、class选择器的类名会自动被修改。
>
>    ```js
>    <NavLink activeClassName={style.css文件中自定义类名}>
>    ```
>
> 4. 标签选择器不会被修改。
>
> 5. :global(id、class)
>
>    > 在cssModule中，某个选择器为全局样式。不会覆盖其他组件样式。这种方法，选择器不会被修改。

##### Redux

> Redux是一种新型的前端架构模式，它是独立产品。当一个组件的状态，被多个组件需要使用的时候，就可以使用redux

- 使用redux

  ```js
  /*引入*/
  import {createStore} from "redux"
  
  //创建
  const store = createStore(reducer,state)
  
  ```

- 核心参数

  - reducer是**修改state的方法**
    - 是一个纯函数。
    - 必须返回一个新的state

  ```js
  import {createStore} from"redux;
  
  //接收内部调用reducer函数时，传过来的state和action。
  const reducer=function (state,action){
      let newState = state;
      let {username,age}= action.payload;
         //⭐在reducer内部，不直接修改state,并且一定要返回一个新的state，否则获取的时候，是undefined。
      switch(action.type){
              case:'login':
              newState={
                 username,
                 age
              }
              return newState
              case:'logOut':
              newState = {};
              return newState;
              defalut:
              return newState
      }
  
  }
  const state ={
      userInfo:'Yuty'
  }
  const store = createStore(reducer,state);
  
  //获取state的值
  const data = store.getState()
  
  
  //监听操作（⭐注意执行顺序，先监听后修改。）
  store.subscribe(()=>{
      //只有state修改后，才会执行。每一次修改就会执行一次。
     //获取最新的State值。 console.log(store.getState())
      
  })
  
  //修改state
  const action = {type:'login',payload:{username:'Yuty',age:18}}
  //通过dispatch修改state的值，内部会执行reducer函数，并把state和action传过去。
  store.dispatch(action)
  ```

  

  - state 全局状态（共享数据）

  - action 动作/命令

    > 格式：{type}，是一个对象，并且一定要有type属性。

- 操作

  > 利用store对象的方法进行操作。

  - 获取：store.getState()

  - 修改： store.dispatch(action)

  - 监听：store.subscribe(fn)

    > 回调函数的代码会在state更新之后才执行。**返回值是一个函数，直接调用返回值，可取消监听。**
  
- 三项基本原则

  - store是必须是唯一的
  - 只有store能改变自己的内容
  - reducer必须是一个pure function，并且不会产生副作用（不修改传进来的数据）。

- react与redux结合

  - 使用高阶组件

    ```js
    //HOC
    //增强withRedux
    export function withReduxPro(mapStateToProps, mapDispatchToProps) {
        return function hoc(InnerComponent) {
            return class OuterCompoment extends Component {
                state = {
                    someInfo: {},
                    methods: {},
                };
                getUserInfo = () => {
                    //判断传入是否是函数，确保是函数才执行。
                    if (typeof mapStateToProps === 'function') {
                        //获取store的值
                        let state = store.getState();
          /*  1、调用传入的第一个callback，并传入获取到store的值，因为传入该callback的时候，返回了一个对象。
              2、传入store的时候，callback有返回值，并且这个返回值跟store有关联。如果callback无返回值，默认为空对象。 
              3、所以这里的data就已经是，store的值。不过它被定义为一个对象。*/
                      const data = mapStateToProps(state) || {};
                        //data已被赋值，所以更新状态，最终传入的props的状态，是someInfo。
                      this.setState({
                            someInfo: data,
                        });
                    }
                    //同上
                    //methods必须要有个默认值,因为无论传callback，都要传入一个修改store的方法到被包装组件。
                    let methods = { dispatch: store.dispatch };
                    if (typeof mapDispatchToProps === 'function') {
                        methods = mapDispatchToProps(store.dispatch);
                        this.setState({
                            methods,
                        });
                    }
                    //无论传不传定义的数据和定义的方法，都会返回默认的store值。
                    this.setState({
                        someInfo: store.getState(),
                        methods,
                    });
                };
                //组件重建之后，会执行这里。
                componentDidMount() {
                    this.getUserInfo();
                    //监听store数据变化
                    store.subscribe(() => {
                        //有变化就执行
                        this.getUserInfo();
                    });
                }
                render() {
                    return (
                        <InnerComponent
                            {...this.props}
                            {...this.state.someInfo}
                            {...this.state.methods}>                                 </InnerComponent>
                    );
                }
            };
        };
    }
    
    
    //Component coding
    import { createStore } from 'redux';
    import React, { Component } from 'react';
    import { withRedux, withReduxPro } from '../utils/hoc';
    
    class Login extends Component {
        state = {
            username: '',
            password: '',
        };
    
        getUsername(e) {
            this.setState({
                username: e.target.value,
            });
        }
    
        getPassword = e => {
            this.setState({
                password: e.target.value,
            });
        };
    
        setToStore = () => {
            const { username, password } = this.state;
            //这个方法是没有定义修改store方法的时候，直接通过props传递过来的dispatch进行修改。
            // this.props.dispatch({
            //     type: 'login',
            //     payload: {
            //         username,
            //         password,
            //     },
            // });
    
            //有定义修改时调用
            this.props.login({
                username,
                password,
            });
          
        };
        logOut = () => {
            //无定义修改方法时，调用。
            // this.props.dispatch({
            //     type: 'logout',
            // });
    
            //有定义修改方法
            this.props.logOut();
    
            this.setState({
                username: '',
                password: '',
            });
        };
       
    
        render() {
            const { username, password, data } = this.state;
            console.log('login.props', this.props);
            return (
                <div>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={this.getUsername.bind(this)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.getPassword}
                    />
                    <button onClick={this.setToStore}>登录</button>
                    <button onClick={this.logOut}>退出</button>
    
                    <div>让我来看看是谁登录了{
                        //如果无定义就默认使用props传过来的属性
                    this.props.username
                    //有定义就使用自己定义的属性。
                    }</div>
                </div>
            );
        }
    }
    
    //传入回调函数，定义想要的数据以及定义修改数据的方法。
    const mapStateToProps = state => {
        //这里的state，会被hoc调用，并传入最新store数据。
        return {
            user: state.username, //定义需要获取的数据为user，并且值为store.username。
        };
    };
    
    //
    const mapDispatchToProps = dispatch => {
        //这里的dispatch，会被hoc调用，并传入只能修改store的方法。
        return {
            //定义两种方法，组件可以通过props的login方法，对store进行修改。
            login(values) {
                dispatch({
                    type: 'login',
                    payload: values,
                });
            },
            logOut() {
                dispatch({
                    type: 'logout',
                });
            },
        };
    };
    
    
    Login = withReduxPro(()=>{},mapDispatchToProps)(Login);
    export default Login;
    
    
    ```
  
- 桥接工具

  - react-redux

    - context 实现redux数据共享

    - connect() 高阶组件传递数据。

  ```js
  import {Provider} from "react-redux"
  //在其他文件中，创建的store并引入。
  import store from "./store"
  
  //共享数据
  <Provider store={store}>
      <App />
  </Provider>
  
  //利用高阶组件设置传入目标组件的redux接收数据
  //mapStateToProps,mapDispatchToProps可选。
  import {connect} from "react-redux"
  
  //mapStateToProps,mapDispatchToProps参数
  const mapStateToProps=(state,ownProps)=>{
      /*
      1、state是使用connect高阶组件时，传入过来的;
      2、ownProps是本组件自身的props
      */
      return{
          username:state.userInfo,username
      }
  }
  connect(mapStateToProps,mapDispatchToProps)(App)
  ```

- reducer模块化

  > 由于项目中可能需要共享多个数据，因此需要模块化reducer。
  >
  > > 1. 使用combineReducers，把多个reducer合并成一个reducer
  > > 2. 尽量在模块中定义自己state的初始值。
  > > 3. 模块化后，只影响state的获取，不影响dispatch的获取。

  - combineReducers 

    > createStore只能传入一个reducer，这里用到redux的方法。合并多个reducer成一个。

    ```js
    import {combineReducers} from "redux"
    
    const reducer = 
          //传入对象
    combineReducers({
        //多个reducer
    })
    ```

    - 每个模块的reducer，都应该有一个自己的state。

      > **使用combineReducers 之后，state会把所有的reducer的state整合成一个对象。**

    ```js
    let initState = {}
    function reducer(state=initState,action=>{})
    ```

- Action Creator

  > 一个用于创建action的函数，主要用于简化操作。日后维护更加方便。

  ```js
  export const LOGIN_TYPE ='login'
  export const LOGOUT_TYPE ="logout"
  //同步写法
  export const login = function(payload){
      return {
          type:LOGIN_TYPE,
          payload
      }
  }
  export const logout = function(){
      return {
          type:LOGOUT_TYPE,
      }
  }
  
  //⭐⭐⭐注意store处的switch的判断，也需要修改
  
  //在组件上使用
  const actionCreator = "./actionCreateor"
  const mapDispatchToProps=(dispatch)=>{
      return {
          login(values){
              dispatch(actionCreator.login(values))
          }
      }
  }
  ```

  - bindActionCreators()

    > 利用redux的bindActionCreators把ActionCreators中，**默认导出(export defalut导出的方法)**的所有方法，绑定到组件的props，并自动隐式调用dispatch

  ```js
  export const LOGIN_TYPE ='login'
  export const LOGOUT_TYPE ="logout"
  export const login = function(payload){
      return {
          type:LOGIN_TYPE,
          payload
      }
  }
  export const logout = function(){
      return {
          type:LOGOUT_TYPE,
      }
  }
  
  //⭐⭐⭐注意store处的switch的判断，也需要修改
  
  //在组件上使用
  import {bindActionCreators} from "redux"
  const actionCreator = "./actionCreateor"
  const mapDispatchToProps=(dispatch)=>{
      return bindActionCreators(actionCreator,dispatch)
  }
  ```

- Redux中间件->MiddleWare 

  > Redux无异步操作，提供了一个接口，使用中间件进行异步操作。createState(reducer,initState,enhancer)
  >
  > * 在中间操作的插件，都叫中间件。

  - redux-thunk  
  
    > 其实是由两次dispatch，第一次是从组件dispatch到中间件，中间件发送请求，请求回来后，再dispatch一次到reducer。
  
    ```js
    //store处写法
    import thunk from "redux-thunk"
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducer,enhancer)
    
    //同步写法
    export const login = function(payload){
        return {
            type:LOGIN_TYPE,
            payload
        }
    }
    
    /*
    1、异步写法
    2、使用redux-thunk之后，action写法需要改为返回一个函数。
    3、这里的params是组件调用该方法的时候，传进来的数据。
    */
    export function loginAsync(params){
        //异步写法，返回一个函数，不再是一个对象。并且参数为dispatch。
        return async function(dispatch){
            //发送异步请求
          const {data} =  await request.get('/login',{
                 params
             })
             //等待结果后来之后，就调用login(),把数据存进store。
               dispatch(login(data.data));
            return data;
        }
    }
    
    export default {
        login,
        loginAsync
    }
    ```
  
    
  
  - redux-promise（用得比较少）
  
  - redux-saga
    - Generator生成器函数
    
    - Iterator迭代器
    
    - 执行过程：action1->redux-saga->action2->reducer
    
      - action1:sagaAction
      - action2:reducerAction
    
      **避免两个action重名**
    
    > 使用saga：
    >
    > - 1、引入
    >
    >   ```js
    >   import {createSagaMiddleware} from "redux-saga";
    >   import {applyMiddleware} from 'redux'
    >   //rootSaga为自定义saga
    >   import rootSaga from "./saga"
    >   //创建中间件，但不能直接使用到createStore。需要被applyMiddleware包装一下。
    >
    >   const sagaMiddleware = createSagaMiddleware();
    >   //跟redux-thunk一样，需要被包装。
    >   let enhancer = applyMiddleware(sagaMiddleware);
    >   const store = createStore(reducer,enhancer)
    >
    >   //引入并运行saga配置
    >   sagaMiddleware.run(rootSaga)
    >   ```
    >
    > - 2、自定义saga
    >
    >   - takeEvery、takeLatest（优化效果）
    >   - put
    >
    >   ```js
    >   //创建一个生成器函数Generator
    >   import {takeEvery,put} from "redux-saga/effects"
    >   function * init(){
    >       //监听sagaAction
    >     yield  takeEvery('login_async',login)
    >             
    >       //性能优化,多次执行的时候，忽略前面次数，只执行最后一次。（防抖）
    >    //yield takeLatest('login_async',login)
    >             
    >     }
    >             
    >     //saga支持生成器函数或async、await。
    >     function * login(action){
    >         //在这个Generator发起请求
    >         //如果是生成器函数，可以使用yield。
    >         yield const {data} = request.get('/login',{
    >             params
    >         })
    >             
    >         //这里的put是saga自带的，跟dispatch等效。
    >         yield put({
    >             type:'login',
    >             payload:data.data
    >         })
    >             
    >     }
    >             
    >     export default init;
    >     //导出后，组件的props因为mapDispatchToProps的原因，能直接访问到init。
    >   ```
    >
  
- 数据持久化

  > redux-persist

##### react调试工具

- react developer tools

- redux-devtools

  > 1. 在谷歌应用商城下载redux-devtools。
  >
  > 2. 在项目中需要下载redux-devtools-extension。
  >
  >    ```js
  >    npm i redux-devtools-extension
  >    ```
  >
  >    3. 引入并使用,配置store。
  >
  > ```js
  >    // 单独使用
  >     import {composeWithDevTools } from 'redux-devtools-extension';
  >     const store = createStore(rootReducer,composeWithDevTools());
  >     export default store;
  > 
  >     // 与saga一起使用
  >     import {createStore,applyMiddleware,compose} from 'redux'
  >     import rootSaga from './rootSaga.js';
  >     const sagaMiddleware = createSagaMiddleware();
  > 
  >     let enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))
  >     // 或使用compose
  >     // let enhancer = compose(applyMiddleware(sagaMiddleware),composeWithDevTools())
  > 
  >     const store = createStore(rootReducer,enhancer)
  >     export default store;
  > 
  > 
  > 
  > //my project
  > //引入redux-devtools工具
  > import { composeWithDevTools } from "redux-devtools-extension";
  > import { createStore,combineReducers,applyMiddleware, compose} from "redux";
  > import {user} from "./reducers/user"
  > import {goods} from "./reducers/goods"
  > //使用第三方插件，实现store的异步操作,redux-thunk。
  > import thunk from "redux-thunk";
  > 
  > //引入saga
  > import createSagaMiddleware from 'redux-saga'
  > //引入自定义saga
  > import rootSaga from './saga'
  > //创建saga中间件
  > const sagaMiddleware = createSagaMiddleware();
  > //包装中间件
  > // const enhancer = applyMiddleware(sagaMiddleware)
  > 
  > 
  > //模块化reducer
  > const reducer = combineReducers({
  >     user,
  >     goods
  > 
  > })
  > 
  > //把中间件通过compose，合并到一个中，实现使用多个中间件。
  > const enhancer = compose(applyMiddleware(sagaMiddleware),composeWithDevTools(),applyMiddleware(thunk))
  > 
  > //createStore有多个参数，其中一个就是enhancer。但是使用第三方插件，需要用到redux的applyMiddleware。
  > // const  enhancer = applyMiddleware(thunk)
  > 
  > //传入enhancer，才能使用异步操作
  > const store = createStore(reducer,enhancer)
  > 
  > 
  > //运行saga
  > sagaMiddleware.run(rootSaga)
  > 
  > export default store
  > ```
  > 

##### 生成器函数与迭代器 Generator&Iterator

> 生成器函数返回迭代器。
>
> - 关键字：yield-> 暂停/等待并返回。

- 迭代器

  > 能自定义遍历规则的对象。

  - 带有next的方法，调用next()方法，返回一个格式为{value,done}的对象。
    - value：每一次迭代的返回值
    - done：是否完成迭代。
  - generator的状态
    - suspended 挂起 (没有迭代)
    - closed 关闭（迭代完成）

```js
function * show(){
    yield 10;
    yield 20;
}
show()//返回迭代器
```

```js

//假设这三个是一个异步请求
function getData1(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve("data1")
      },1000)
  })
}
function getData2(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve("data2")
      },1000)
  })
}

function getData3(){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve("data3")
      },1000)
  })
}

//generator函数
function *gen(){
  var f1 = yield getData1();
  console.log(f1)
  var f2 = yield getData2(f1);
  console.log(f2)
  var f3 =yield getData3(f2)

  console.log(f3)
}


/**
 * @function 调用generator函数的方法  
 * @param {Function} fn generator函数
 */
function run(fn){

  //获取iterator(迭代器)
  var g = fn()

  /**
   * @function 使用递归的方式实现
   * @param {*} data 在获得前一次请求的值
   * 
   */
  function next(data){
     //1、执行第一次的var f1 = yield getData1()时，拿到的result.done是false;
     //2、这时,data有值，执行第二次yield,并把值传递过去，这是f1就有值了。f1=getData1()里面resolve的值
      var result= g.next(data);

      //1-1、因此第一次不会执行这里
      if(result.done){
          return result.value
      }

      //1-2、拿到第一次的var f1 = yield getData1()的resolve==> data1;
      result.value.then(res=>{
        //1-3、这时候递归执行next函数把值传进去
          next(res)
      })
  }
  //执行next函数
  next()
  // g.next()
}

//调用
run(gen)

```



##### ES7装饰器写法-> @

> ES7新特性，但有浏览器兼容问题。需要安装@babel/plugin-proposal-decorators插件。

* 需要以下配置：

  ```js
   ["@babel/plugin-proposal-decorators",{legacy:true}]
  ```

```js
import Provider from "react-redux"

 import store from "./store"

 <Provider store={store}>   

     <App />

 </Provider>

 import {connect} from "react-redux";

//等效于connect原本写法。
 @connect(mapStateToProps,mapDispatchToProps)(App)

 const mapStateToProps=(state,ownProps)=>{   

   return{     

     username:state.userInfo,username   

   }

 }
```

##### 订阅发布者模式

> 定义一个对象，并在对象内创建两个方法，发布和订阅。订阅者调用订阅这个方法的时候，传入一个回调函数。订阅接收到回到函数，并把callback存进自己的原型上。发布通过this访问到订阅里面的各个callback（因为会有多个订阅者订阅），遍历它们并调用。

```js
let bus = {
    list =[]
    //订阅（存进订阅自己的回到函数）
    subscribe(callback){
        this.list.push(callback)
        
        
    }
   //发布把收集到的订阅遍历出来，并调用
    publish("get data"){
        this.list.forEach(callback=>{
            callback&&callback("send data to callback")
        })
        
        
    }
}

//订阅者调用订阅模式，并传回一个callback。
bus.subscribe(('get data from publish')=>{
    console.log(1)
})
bus.subscribe(('get data from publish')=>{
     console.log(2)
})

//开启发布模式。
bus.publish("send some data")//发布一般都是异步的。
```



##### 类(ES6)

```js
class Test{
    constructor(){
        this.a = 1
        
    }
    b=2//ES7之后可这样添加属性
//a和b都会在Test的原型上。
    testa(){
        
    }
    testb(){
        
    }
}

//子类继承父类的原型。
class ChildTest extends Test{
    //继承父类原型上的方法等，因此实例子类时，能直接调用父类的原型方法。
    
}
```

##### dangerouslySetInnerHTML

> 可解析html标签，但该属性存在极大风险。

```html
<span dangerouslySetInnerHTML={
      { __html:item.value}}>
</span>
```



##### 正则的零宽断言

> 给正则表达式添加**判断条件**，只有符合条件才匹配。

```js
/a(?=b)/ //目的要匹配a,但要求a后面一定要包含b字符才匹配。

//通过零宽匹配出路由字符。
let a = '/manage/interview/list';
a.split(/(?=\w)\/(?=\w)/);
console.log(a)//

```



##### 单元测试

1. 使用react-test-render进行单元测试，它是react官方提供的测试库。

2. 使用`enzyme`第三方插件

   > **该插件需要适配器**，但是react17版本并没有官方的适配器，因此，使用的是一个“民间”开发的适配器。

   - `npm i enzyme`
   - `npm i @wojtekmaj/enzyme-adapter-react-17`（适配器）

##### fetch(原生)
> fetch是用来取代传统的XMLHttpRequest的。

   **为什么需要使用两次then?**

>  response是***Response对象***，包含Header、status、statusText等属性。要获得具体数据需要使用.json（用于JSON）、.text（用于文本）、.formData（用于FormData对象）等方法。至于为什么需要return，因为Response.json返回的是一个被解析为 `JSON` 格式的 Promise 对象。，所以只能先return，再在下一层处理。

```js
/**
 * @param {string} url: required
 * @param {Object} object :Optional headers...
 */

   fetch(url,object).then(function(response) {

     return response.json();

   }).then(function(data) {

     console.log(data);

   }).catch(function(e) {

     console.log("Oops, error");

   });

```