import { APP_ROUTES } from "@/constants/app_routes"

export const checkIsPublicRoute = (asPath: string) =>{
  const appPublicRoutes = Object.values(APP_ROUTES.public)
  return appPublicRoutes.includes(asPath) 
}