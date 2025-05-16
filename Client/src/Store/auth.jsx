import {createContext, useContext, useEffect, useState} from 'react'

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState("")
    const [service,setService] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const AuthorizationToken = `Bearer ${token}`

    const storeTokenInLS = (servertoken) => {
        setToken(servertoken)
        return localStorage.setItem('token',servertoken)
        
    }
    let isLoggedIn = !!token

    const LogOutUser = () => {
        setUser("")
        setToken("")
        setService("")
        return localStorage.removeItem('token')
    }
    
    const userAuthentication = async () => {
        if(token){
        try {
            setIsLoading(true)
            let response = await fetch(`https://rolebaedmangement-backend.onrender.com/api/users/getUser`,{
                method:"GET",
                headers:{
                    Authorization:AuthorizationToken
                }
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setUser(data)
                setIsLoading(false)
            }
            else{
                setIsLoading(false)
                console.log("Error from User Data")
            }
        
        } catch (error) {
            console.log("user data eroor ",error)
        }
    }
    }
    console.log(user)

    const getServices = async () => {
        if(token){
            try {
                let response = await fetch(`https://rolebaedmangement-backend.onrender.com/api/products/getAllProducts`,{
                    method:"GET",
                    headers:{
                        Authorization:AuthorizationToken
                    }
                    
                })
                if(response.ok){
                    let data = await response.json()
                    console.log("getAllProducts",data)
                    setService(data)
                }
            } catch (error) {
                console.log(`Servicer Error from FrontEnd ${error}`)
            }
        }else{
            console.log(`No Token Here!!!`)
        }
    }


    useEffect(()=>{
        userAuthentication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

    useEffect(()=>{
        getServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

    return <AuthContext.Provider value={{storeTokenInLS,LogOutUser,isLoggedIn,user,service,AuthorizationToken,isLoading, getServices}}>
        {children}
    </AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}