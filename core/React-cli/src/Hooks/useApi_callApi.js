
let cache = {};



export default function useApi_callApi(api) {
   
    Object.keys(api).forEach(it=>{
        Object.keys(api[it]).forEach(item=>{
            const url = api[it][item].url||'';
            const cloneApi = JSON.parse(JSON.stringify(api));
            delete cloneApi[it][item].url;
            const options = cloneApi[it][item];
            cache[item] = async()=>{
                if(!url){
                    console.error('url must be inpit'); 
                }
                return await (await window.fetch(url,options)).json()
            }
            
        })

    })

    return cache;
}



