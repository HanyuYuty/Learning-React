import React, { PureComponent } from 'react'

export default class PureComponentTest extends PureComponent {
    state={
        value:''
    }
    render() {
        console.log('render');
        return (
            <div>
                <button onClick={()=>this.setState({value:111})}>Click</button>
            </div>
        )
    }
}
