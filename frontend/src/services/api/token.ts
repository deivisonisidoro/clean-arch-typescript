import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { refreshToken } from '../authenticate';

const getToken = (): string | null => {
  const { 'nextauth-token': token } = parseCookies();
  return token || null;
};

const setToken = (token: string): void => {
  setCookie(null, 'nextauth-token', token, {
    maxAge:  60 * 60 * 1,
    path: '/',
  });
};
const deleteAllCookies = (): void => {
  const cookies = parseCookies();

  Object.keys(cookies).forEach((cookieName) => {
    destroyCookie(null, cookieName);
  });
};
const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshTokenId = parseCookies()['nextauth-refresh-token'];

    if (refreshTokenId) {
      const response = await refreshToken({refreshTokenId});

      if (response.access_token) {
        setToken(response.access_token);
      } else {
        deleteAllCookies();
        throw new Error('Unable to refresh access token');
      }
      if(response.access_token){

      }
    } else {
      throw new Error('No refresh token available');
    }
  } catch (error) {
    deleteAllCookies();
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
export { getToken, setToken, refreshAccessToken };
