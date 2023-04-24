import React from "react";
import Page from "./pages";
import apis from 'Hooks/useApi'



export default function App (){



    return (
       <>
       
       <h1>App</h1>
        <Page apis={apis()}/>
       
       </>
    )
}