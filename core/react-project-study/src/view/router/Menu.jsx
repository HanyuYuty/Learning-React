import React from 'react';
import { useHistory } from "react-router-dom";

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
                        {route.render&&<li onClick={()=>handleJump(route)} >{route.label}</li>}
                        </React.Fragment>
                    ))

                }
        </>
    )
}

export default Menu
