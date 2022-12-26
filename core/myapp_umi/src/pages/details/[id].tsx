
import React from "react";
import { useParams } from "umi";
export default function Details(props:any){
   
    const params = useParams()
    


    return (
        <>
        Details

        {
            params.id
        }
        </>
    )

}
