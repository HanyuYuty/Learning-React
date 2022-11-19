import React, { useContext, useState } from 'react'
import Child from './Child'
import { GlobalContext } from '.'
import Details from './Details';

import styles from './styles.css'

function Father() {
    const value = useContext(GlobalContext);
    // const [renderValue,setRenderValue] = useState(value);
    
    const renderComponent = ()=>(
        value?.cinemas?.map(it=>it&&<Child key={it?.cinemaId}>
            {it.name}
        </Child>)
    )
    return (
        <div className='father'>
            <Details></Details>
            {
                renderComponent()
            }
        </div>
    )
}

export default Father
