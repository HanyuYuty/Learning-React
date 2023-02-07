##### TypeScript
> TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

- 编译指令
  1、 **tsc <文件名.ts>** 输入指令后,会把ts文件代码编译成新的同名文件的js代码。
  2、 **tsc --noEmitOnError <文件名.ts>** ts代码有error时,js将不会被编译,会把错误直接抛出

- 显示类型
  > 给变量定义类型。但有时候并不是所有变量都需要定义类型，Ts会自动推断某变量的类型是什么。
```tsx
function getData(params:string,data:Date) {

    return params+'hhhhhh'+data
    
}
```
- 降级编译
  > 编译过程中，ts的代码会被删减很多，有时候浏览器可能不兼容ES6之类的新语法。可在<tsconfig.json>中**"target":"es2016"**, 进行修改。

- 常用类型(小写)
  - string
  - number
  - boolean
  - 数组(两种写法)
  ```tsx
  let num:number[] = [1,2,3];
  let arr:Array<object> = [{}];
  
  ```
  - 元组
    > 固定数组的长度
    ```tsx
    let newArr:[number,string];
    newArr = [999,'1111'];
    ```
  - any 任何类型都是合法的,它禁用所有的类型检查。
  - 函数
  > 一般函数返回值无需定义类型,因为ts会根据上下文值，进行推算。除非有特殊情况。
  ```tsx
  let arr2 = [1,2,3];
  //ts根据上下文值推断出，item为number类型，因此item无需定义类型。
    arr2.filter(item=>{
        return item>2;
    })
  
  ```
  - 函数
      - void 该函数无返回值。
      
        ```tsx
          function getData(params:object):void {
              //不能将类型“string”分配给类型“void”。
            return 'data'
            
        }
        ```
      
      - 函数返回值的其他类型
      
        ```tsx
        //自定义类型。类型别名
        type myType = string;
        
        function getData(params:any):myType {
        
            return params    
        };
        
        //由于getData返回值为myType( = string),相当于data的类型也是myType( = string)
        let data = getData(11111);
        //这时赋值会报错,提示为:不能将类型“number”分配给类型“string”。
        data = 22222
        ```

  - 对象类型
  > 对象字面量只能指定已知属性。
  ```tsx
   // count为可选传入,id为必须传入，且不可添加多其他属性
  function getList(params:{id:number,count?:string}) {
    
  }
  getList({
  //key名称一定要和定义的一样,以及key的类型;
      id:111,
  //“elseKey”不在类型“{ id: number; count: string; }”中。
      elseKey:[] //报错
  })
  

  //只是对对象某个属性定义类型，其他属性不作定义（可添加其他属性）
  //[propName:string]:any 其他key为string（对象中的key就是string），值为any即可
   type Params ={id:number,count?:string,[propName:string]:any};
    function get_List(params:Params) {
    
    }

    get_List({
        id:11111,
        elseProps:'some data'
    })
  
  ```
  - unknown
   > 未知类型,unknown类型的变量，不能直接赋值给其他类型的变量
   ```tsx

   let a: unknown ;
    a = 'string';


  //不能将类型“unknown”分配给类型“string”。
    let e:string
    ❌e = a 

     let e:string
    ✔ e = a as string 

   ```
- never
  > 该类型表示,永远不会返回值。
- 联合类型

  > 表示可有多个类型
  ```tsx
  
  function getID(id:number | string) {
    
  }
  
  getID(1 ||'1111')
  
  ```

- 类型别名

  ```tsx
  type myType = {
    id:number
    count : object[]
  };
  
  function getData(params:myType) {
      
  };
  
  //对象字面量只能指定已知属性。
  getData({
      id:1111,
      count:[{}]
  })
  ```

  

  -  定义类型阶段，使用** & **来进行扩展（&有既是什么，又是什么的意思）

    ```tsx
    type myType = string;
    
    ////类似继承，先赋值newType的类型跟myType类型一致，又增加了新的类型。
    //定义newType时,即拥有myType,又有新的类型:number
    type newType = myType & number;
    
    
    function getDataList(params:myType):newType {
    
        //不能将类型“number”分配给类型“never”。一个值不可能既是string又是number
        return 111
        
    }
    ```

  - **type类型一旦定义就不能后续重复命名添加字段**
     ```tsx
     //这是不允许的。提示为:标识符“myType”重复。
        type myType = string

        type myType = number

     ```

    


- 接口

    ```tsx
      //语法
      interface mySecondType {
          key:number
      }
    ```

    

    - 定义类型阶段，使用**extends**来进行扩展

      ```tsx
      interface mySecondType {
          key:number
      }
       //类似继承，继承了mySecondType的类型，又增加了新的类型。
        //myThirdType的类型为object,其中包含key&list
        interface myThirdType extends mySecondType{
            list:object[]
        }
      ```

    - 在现有的接口添加字段
        ```tsx
        //重复声明不会被覆盖。
        interface mySecondType {
            key:number
        }

        interface mySecondType {
            anyOther:string
        }
        ```

- **type 和 interface的区别,interface可重复命名来进行扩展，但type不行。**


- 类型断言（指定更具体的类型）
  > 有时，你会获得有关 TypeScript 不知道的值类型的信息。例如，如果你正在使用 document.getElementById ，TypeScript 只知道这将返回某种类型的HTMLElement ，但你可能知道你的页面将会有一个Id为input的HTMLInputElement。在这种情况下，你可以使用类型断言来**指定更具体的类型**：
  - as
    ```tsx

    const input = document.getElementById('input') as HTMLInputElement;


    //⭐这样是错误的，提示为:类型 "number" 到类型 "string" 的转换可能是错误的，因为两种类型不能充分重叠。
    const Num = 1111 as string

    /* 
    1、如果这是有意的，请先将表达式转换为 "unknown"。
    2、意思是把这个1111先转为不知具体类型的unknown,再进行指定类型为string。
    3、这个时候Num的类型已被指定为string。
    */
    const Num = (1111 as unknown) as string

    //any也可以通过。不过这样就没意义了。
    const Num = (1111 as any) as string

    ```
  - 文字类型、数字类型、布尔类型（用法相同）
  ```tsx
  //指定了newType2的类型必须是以下三个的其中一个,否则不通过
  type newType2 = 'string1' | 'string2' | 'string3';

  function testNewType2(params:newType2) {
      
  }

  testNewType2('string1')


  let x: "hello" = "hello";
  // 正确
  x = "hello";
  // 错误
  x = "howdy";

  ```

  - const（借鉴了const的特性）
  > 变量str实际为一种宽泛的字符串类型，只要是字符串，都可赋值给变量str, 即let关键字声明的变量会被推断为拓宽后的类型；而变量stringLiteral有const关键字，其变量值不能进行修改， 所以推断为字面量类型是非常合适的。 它保留了赋值的准确类型信息;综上，const关键字实际是将宽泛的类型，例如字符串，数字等转化为具体的值类型。 而as const则是将此特性用于断言之中，方便类型转换操作。

   ```tsx
        let str = 'hello';
      // let str: string

      //const 本身不能二次赋值
      const stringLiteral = "https"; 
      // const stringLiteral: "https"

      //key的类型已被const指定为"assign"
      const obj = {
        key:'assign' as const
      }
      //因此修改key值时,赋值为'new value'是错误的。
      ❌obj.key = 'new value'
      ✔ obj.key = 'assign'
    ```
  - 推理
   > 当你使用对象初始化变量时，TypeScript 会推断该对象的属性稍后可能会更改值。因此，对象里的某个值,如果没指定类型,它只会推理为初始化赋值时的类型。
   ```tsx

   //Ts只会推断counter的类型为number,不会推理类型为0
   const obj = { counter: 0 };
   obj.counter = 1;

    //这里的method被指定类型为 'GET' | 'POST' | 'GUESS'
   function handleRequest(url: string, method: 'GET' | 'POST' | 'GUESS') {
    // ...
    }
    //但req是对象,method的类型只能被推理为string,并不是具体的某个。
    const req = { url: 'https://example.com', method: 'GET' };
    handleRequest(req.url, req.method);


    //解决方法
    function handleRequest(url: string, method: 'GET' | 'POST' | 'GUESS') {
            // ...
    }
      //或者const req = { url: 'https://example.com', method: 'GET' }  as const
    const req = { url: 'https://example.com', method: 'GET'  as const} 
    handleRequest(req.url, req.method );

   ```

  - 非空断言运算符(!)
   > 告诉Ts该值不是null或者undefined
   ```tsx
   
   function NotNull(params?:string | null) {
     //params可能为 “null” 或“未定义”。
    //❌console.log(params.toUpperCase());
     ✔console.log(params!.toUpperCase());

      //等价于if
      if(params){
          console.log(params.toUpperCase());
      }
    }

    NotNull('hahahaha')


   ```
  - <type>
    ```tsx

    let someValue: unknown = "this is a string";
    let strLength: number = (<string>someValue).length;

    ```
  - 枚举
  > 其实枚举就是在一个类里定义几个静态变量，每个变量都是这个类的实例。比如说，类Human有两个静态变量：Man,Woman，每一个变量都是Human类的实例。用的时候就直接写Human.Man，Human.Woman，用的时候就直接用Human.Man.hasXJJ()或者Human.Woman.hasXJJ()方法，这不就是枚举么。作用么，其实就是提供常量。
  ```tsx

  // ts源码
  enum Direction {
      Up = 1,
      Down,
      Left,
      Right,
      }
      console.log(Direction.Up) // 1
      console.log(Direction.Down) // 2
      console.log(Direction.Left) // 3
      console.log(Direction.Right) // 4


  ```