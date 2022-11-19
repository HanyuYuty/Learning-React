import React, { useCallback, useEffect, useState } from 'react'
import Father from './Father'
import {getFilmList} from './request'

export const GlobalContext = React.createContext();
function Global() {
    const [contextValue,setContextValue] = useState({});

    const filmList = async ()=>{
        const res = await getFilmList();
        setContextValue(res?.data?.data);
    }
    useEffect(()=>{

        filmList()

    },[])

    const handleNewcinemas = useCallback((inputValue)=>{

        // setContextValue({cinemas:[{name:inputValue,cinemaId:inputValue+136},...contextValue?.cinemas]})

    },[contextValue])
    return (
        contextValue?.cinemas&&<GlobalContext.Provider value={{...contextValue,handleNewcinemas}}>
            <Father/>
        </GlobalContext.Provider >
    )
}

export default Global
