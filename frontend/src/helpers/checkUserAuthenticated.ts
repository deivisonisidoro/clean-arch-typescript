import { parseCookies } from "nookies"

export const checkUserAuthenticated = () => {
  const {['nextauth-refresh-token']: token} = parseCookies()

  return !!token
}