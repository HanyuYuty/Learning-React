import React from 'react'
import HasSubRouter from '../HasSubRouter';
import {Link,useHistory} from 'react-router-dom'
import store from '../reduxConfig';


function Summary(props) {
    const {routes} = props;
    const history =useHistory();


    return (
        <div>
            <p onClick={()=>{
                history.push('/summary')
            }}>Summary</p>


            {
                routes&&routes.map((route,index)=>(
                    <>
                    <Link to={route?.path}>{route?.label}</Link>
                    <HasSubRouter {...route} key={index+1}></HasSubRouter>
                    </>
                ))
            }
        </div>
    )
}

export default Summary
