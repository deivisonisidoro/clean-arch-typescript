import { api } from "@/utils/api";

export interface LoginData {
  email: string;
  password: string;
}

async function signInRequest(loginData: LoginData): Promise<any> {
  try {
    const response = await api('/authenticate/login/', {
      method: 'POST',
      body: loginData,
      cache: "no-store"
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { signInRequest };
