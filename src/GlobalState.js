import React, {createContext, useState, useEffect} from 'react'
import ProductsApi from './api/ProductsAPI'
import UserApi from './api/UserApi'
import axios from 'axios'

export const GlobalState=createContext()

export const DataProvider=({children}) =>{

    const [token, setToken] = useState(false)

    const refreshToken = async()=>{
        const res=await axios.get('/user/refresh_token')
       // console.log(token)
       setToken(res.data.accesstoken)
    }

    useEffect(() => {
        const firstLogin=localStorage.getItem('firstLogin')
        if (firstLogin) refreshToken()
    }, [])
    
    const state={
        token: [token, setToken],
        productsApi: ProductsApi(),
        userApi: UserApi(token)
    }
    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}