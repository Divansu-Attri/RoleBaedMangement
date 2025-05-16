import { useEffect } from "react";
import {useAuth} from '../Store/auth'
import { Navigate } from "react-router-dom";
export default function Logout() {

    const {LogOutUser} = useAuth()
    
  useEffect(()=>{
    LogOutUser()
  },[LogOutUser])

  return <Navigate to='/login'/>

}

