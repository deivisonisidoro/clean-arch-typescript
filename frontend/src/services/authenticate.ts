import { api } from "@/services/api";

export interface LoginData {
  email: string;
  password: string;
}

async function signInRequest(loginData: LoginData): Promise<any> {
  try {
    const response = await api('/authenticate/login/', {
      method: 'POST',
      body: JSON.stringify(loginData),
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function refreshToken(refreshTokenId: object): Promise<any> {
  try {
    const response = await api('/authenticate/refresh-token/', {
      method: 'POST',
      body: JSON.stringify(refreshTokenId),
      cache: "no-store",
    });
    return response;
  } catch (error) {
    throw error;
  }
}
async function recoverUserInformation(refreshTokenId: string){
  try {
    const response = await api(`/authenticate/user/?refreshTokenId=${refreshTokenId}`, {
      method: 'GET',
      cache: "no-store"
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { signInRequest, recoverUserInformation, refreshToken };
