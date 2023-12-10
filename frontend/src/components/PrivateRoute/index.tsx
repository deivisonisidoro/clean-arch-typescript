"use client"
import { checkUserAuthenticated } from "@/helpers/checkUserAuthenticated";
import { PrivateRouteProps } from "./@types/PrivateRoutesProps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app_routes";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const isUserAuthenticated = checkUserAuthenticated()
  const [userFounded, setUserFounded] = useState(false)
  
  useEffect(()=>{
    if(isUserAuthenticated){
      setUserFounded(true)
    }else{
      push(APP_ROUTES.public.sign_in)
    }
  }, [])
  return (
    <>
      {!userFounded && null}
      {userFounded && children}
    </>
  )
}