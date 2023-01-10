import React,{ useCallback, useEffect, useRef} from 'react'

//该hoc可以使整个全局的input填写完之后，自动跳到下个input。
const withJump = (Components)=>(props)=>{
   
    const inputRef = useRef();
  

    useEffect(()=>{
        monitorDom()
        // inputRef.current = [...document.querySelectorAll('input')].filter(ele=>ele.type!=='search');

        // if(inputRef.current.length>0){

        //     inputRef.current[0].focus();
        //     handleJump()

        // }


        
    },[])

     const handleJump = useCallback(()=>{
        inputRef.current.forEach((element,index,arr)=>{
            element.addEventListener('compositionend',(e)=>{
                const {value,maxLength} = e.target;
                if(value.length===maxLength){
                   arr[index+1]&&arr[index+1].focus()
                }

            })
            // return element.onkeyup= (e)=>{

            //     const {value,maxLength} = e.target;

            //    if(value.length===maxLength){
            //       //arr[index+1]&&arr[index+1].focus()
            //    }
                
            // }
        })
     },[])


     //监听dom树的改变,但不知是否会影响性能?
     const monitorDom = useCallback(() => {
         const watcher = new MutationObserver(mutations => {
             mutations.forEach(mutation => {
                 if (mutation.type === 'childList') {
                     inputRef.current = [...document.querySelectorAll('input')].filter(
                         ele => ele.type !== 'search'
                     );
                     if (inputRef.current.length > 0) {
                        //  inputRef.current[0].focus();
                         handleJump();
                     }
                 }
             });
         });
         watcher.observe(document, { subtree: true, childList: true });
     }, []);

    




        return(


                <Components {...props}></Components>

        )

}

export default withJump
