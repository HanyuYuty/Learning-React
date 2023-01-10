
import React from "react"
import { useHistory } from "umi"

const Items = ()=>{

    const history = useHistory();



    return (
        <div>
            <button onClick={()=>{
                history.push(`/details/${123456}`)

            }}>Click</button>
        </div>
    )
}

export default Items