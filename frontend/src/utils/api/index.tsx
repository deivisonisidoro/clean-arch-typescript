const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const api = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const defaultOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    };

    const response = await fetch(`${baseURL}${url}`, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error while making the request:', error);
    throw error;
  }
};

export { api, baseURL };
