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
  
  
  
  
  
  



