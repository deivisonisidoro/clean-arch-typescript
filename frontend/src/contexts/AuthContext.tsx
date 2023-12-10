'use client'
import { createContext,  useEffect,  useState } from 'react';
import { parseCookies, setCookie} from 'nookies'
import { LoginData, recoverUserInformation, signInRequest } from '../services/authenticate';
import { UserType } from './@types/User';
import { AuthContextType } from './@types/AuthContext';


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children}: {
  children: React.ReactNode
}){
  const [user, setUser] = useState<UserType | null>(null)
  const isAuthenticated = !!user;
 
  async function signIn({email, password}: LoginData) {
    const { token, refreshToken, user  } = await signInRequest({
      email,
      password
    })
    const expirationDate = new Date(refreshToken.expires_in * 1000);
    setCookie(undefined, 'nextauth-token', token, {
      expires: expirationDate
    })
    setCookie(undefined, 'nextauth-refresh-token', refreshToken.id, {
      expires: expirationDate
    })
    setUser(user)
  }
  const loadUserInformation = async () =>{
    const {'nextauth-refresh-token': refreshToken} = parseCookies()
    if(refreshToken){
      try {
        const response = await recoverUserInformation(refreshToken) 
        setUser(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(()=>{
    loadUserInformation()
  }, [])
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}