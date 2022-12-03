import React from 'react'
import HasSubRouter from '../HasSubRouter';
import {Link} from 'react-router-dom'

function Summary(props) {
    const {routes} = props;

    
    return (
        <div>
            Summary


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
