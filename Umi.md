##### Umi

> umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的
>
> 约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。umi 在约定式
>
> 路由的功能层面会更像 nuxt.js 一些。

1. 配置路由

   > 只要在page创建组件文件，umi就能可以自动帮我们配置好路由。

   **umi\.umirc.ts** 需要在这个文件下，注释routes，否则需要自己手动配置路由。

   ![image-20221226170800958](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20221226170800958.png)

   在page下创建组件即可自动生成路由。

   ![image-20221226170913393](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20221226170913393.png)

   layouts文件夹里面的文件，是整个page的父组件。(相当于项目入口)页面最先渲染的组件。

   ![image-20221226171120902](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20221226171120902.png)

   嵌套路由，在page文件夹下创建文件夹，并且要创建以_layout作为文件名的入口文件。

   ![image-20221226172313232](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20221226172313232.png)

   动态路由，在page文件夹下创建，与page下的其他文件夹同级。创建文件必须要用**[]**。

   ![image-20221226174013602](C:\Users\amanda\AppData\Roaming\Typora\typora-user-images\image-20221226174013602.png)