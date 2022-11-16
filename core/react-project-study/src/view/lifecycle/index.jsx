import React, { Component } from 'react';
import Children1 from './children';

export default class Lifecycle extends Component {

    state={
        value:'',
        newValue:'testing',
        count:0
    }

    

    UNSAFE_componentWillMount(){
        // console.log('this==>',this);
        // console.log('state==>',this.state);
        // console.log('props==>',this.props);

    }

    componentDidMount(){
        //console.log('state2==>',this.state);
    }

   shouldComponentUpdate(nextProps,nextState){

       if(this.state.count>=2){
           return false;
       }
       return true;
   }

   UNSAFE_componentWillUpdate(){
    //    console.log('document==>',document.querySelector('div'));
    //    this.setState({count:1111})
   }

   componentDidUpdate(prevProps, prevState, snapshot){

   }

   componentWillUnmount(){
       console.log('componentWillUnmount==>');

   }

    render() {
        return (
            <div>
                Lifecycle
                {this.state.count}
                <Children1 newValue={this.state.newValue}>
                    <button onClick={()=>this.setState({newValue:'aaaa'})}>Add</button>
                    <button onClick={()=>this.setState({count:this.state.count+1})}>Add Count</button>
                </Children1>
            </div>
        )
    }
}
