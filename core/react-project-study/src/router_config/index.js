import Home from "../view/redux/Home";
import Summary from '../view/redux/Summary'
import First from '../view/redux/Summary/First'
import Details from '../view/redux/Details'

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