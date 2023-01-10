import React from 'react'
import {useParams} from 'react-router-dom';

function Details() {
    let params = useParams();
    console.log('params==>',params);
    return (
        <div>
            Details
        </div>
    )
}

export default Details
