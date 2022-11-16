import React, { Component } from 'react'

export default class Children1 extends Component {

    UNSAFE_componentWillReceiveProps(){
    }
    render() {
        return (
            <div>
                Children1
                {this.props.children}
            </div>
        )
    }
}
