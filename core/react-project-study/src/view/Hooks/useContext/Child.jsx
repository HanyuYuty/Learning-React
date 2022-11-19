import React from 'react'

function Child(props) {
    return (
        <div>
            <li>{props.children}</li>
        </div>
    )
}

export default Child
