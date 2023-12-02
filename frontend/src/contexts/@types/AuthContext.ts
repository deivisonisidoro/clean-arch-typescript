import { LoginData } from "@/services/authenticate";
import { UserType } from "./User";

export type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  signIn: (data: LoginData)=> Promise<void>
}