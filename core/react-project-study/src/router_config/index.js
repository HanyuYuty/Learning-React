import Home from "../view/router/Home";
import Summary from '../view/router/Summary'
import First from '../view/router/Summary/First'
import Details from '../view/router/Details'

export default [
    {
        path:'/home',
        component:Home,
        label:'Home',
        render:true
        
    },
    {
        path:'/summary',
        component:Summary,
        label:'Summary',
        render:true,
        isAuth:true,
        routes:[
            {
                path:'/summary/first',
                component:First,
                label:"Frist",
                render:true
                
            }
        ]
    },
    {
        path:'/details/:query',
        component:Details,
        label:'Details',
    }
]