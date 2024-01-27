import { api } from "@/services/api";

interface UserData {
  name: string;
  email: string;
  password: string;
}

async function createUser(userData: UserData): Promise<any> {
  try {
    const response = await api('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
      cache: "no-store"
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getAllUsers(page: number = 1): Promise<any> {
  try {
    const response = await api(`/users/?page=${page}`, {
      method: 'GET',
      cache: "no-store"
    });
    return response;
  } catch (error) {
    console.error('Error get all users:', error);
    throw error;
  }
}

export { createUser, getAllUsers };
