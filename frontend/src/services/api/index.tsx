import { getToken, refreshAccessToken } from './token';

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const api = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const token = getToken();
    const defaultOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
      ...(options.body && { body: options.body }),
    };

    const response = await fetch(`${baseURL}${url}`, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401 && !url.startsWith('/authenticate/login/')) {
        await refreshAccessToken();
        getToken()
        return api(url, options);
      }
     
      throw new Error(`${errorData.error}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error while making the request:', error);
    throw error;
  }
};

export { api, baseURL };
