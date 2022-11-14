import React from "react";


const Home = ()=>{


    return(
        <div>testing</div>
    )
}

//订阅者、发布者模式（bus相当于一个中间点。）
const bus = {
    list:[],
    //同理，也是接收回调，拿到发布者的数据。
    publish(callback){
        const data = callback();
        //遍历list，调用里面的多个订阅者的回调函数，并把数据传过去。
        this.list.map(item=>{
            item&&item(data)
        })

    },
    //接收回调函数，并把回调push到list。
    subscribe(callback){
        this.list.push(callback)
    }
};

//订阅者先订阅，并传一个回调函数到bus.subscribe
bus.subscribe((data)=>{
    //因此这边能接收到publish的数据。
    console.log('get some value1','-'+data);
});

bus.subscribe((data)=>{
    console.log('get some value2',`-`+data);
});

//发布者发布数据
bus.publish(()=>{
const a = 'I am publish1 from bus';
return a ;
})

export default Home