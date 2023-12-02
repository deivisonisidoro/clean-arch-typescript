import { api } from "@/utils/api";

interface UserData {
  name: string;
  email: string;
  password: string;
}

async function createUser(userData: UserData): Promise<any> {
  try {
    const response = await api('/users/', {
      method: 'POST',
      body: userData,
      cache: "no-store"
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export { createUser };
