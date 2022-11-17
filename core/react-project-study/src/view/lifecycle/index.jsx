import React, { Component } from 'react';
import Children1 from './children';

let timer = '';
export default class Lifecycle extends Component {

    state={
        value:'',
        newValue:'testing',
        count:0,
        list:[]
    }

    

    // UNSAFE_componentWillMount(){
    //     // console.log('this==>',this);
    //     // console.log('state==>',this.state);
    //     // console.log('props==>',this.props);

    // }

    componentDidMount(){
        // console.log('componentDidMount');
        //console.log('state2==>',this.state);
        timer = setTimeout(()=>{
            this.setState({list:[1,2,3,4,5,6,7,8,9,10]})

        },1000)
    }

   shouldComponentUpdate(nextProps,nextState){

       if(this.state.count>=2){
           return false;
       }
       return true;
   }

//    UNSAFE_componentWillUpdate(){
//     //    console.log('document==>',document.querySelector('div'));
//     //    this.setState({count:1111})
//    }

   componentDidUpdate(prevProps, prevState, snapshot){

    const {div,scrollHeight} = snapshot;
    div.scrollTop = div.scrollHeight-scrollHeight-10;



   }

   componentWillUnmount(){
       clearInterval(timer)

   }

   
   static getDerivedStateFromProps(nextProps,nextState){
      
       return {
           age:'new age',
       }

   }

   getSnapshotBeforeUpdate(nextProps,nextState){
    
         const div =   document.getElementById('list');

            return {
                scrollHeight:div.scrollHeight,
                div
            }
   }

    render() {

        const {list} =this.state;
        return (
            <div>
                Lifecycle
                {this.state.count}
                {this.state.age}
                <Children1 newValue={this.state.newValue}>
                    <button onClick={()=>this.setState({newValue:'aaaa'})}>Add</button>
                    <button onClick={()=>this.setState({count:this.state.count+1})}>Add Count</button>
                </Children1>

                <div id='list' style={{width:200,height:300,background:'red',overflow:'scroll',scrollBehavior: 'smooth'}}>
                   
                    <ul>
                        {list&&list.map(it=><li key={it}>{it}</li>)}
                    </ul>
                </div>
                <button onClick={()=>this.setState({list:[...list,Math.random(). toFixed(2)]})}>Add list</button>
            </div>
        )
    }
}
