import React, { useState } from "react";


function  useHandleRespont (res){
    const[value,setValue] = useState()

   
    return [value,setValue] 
}

export default useHandleRespont;