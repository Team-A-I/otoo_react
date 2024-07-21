import {jwtDecode} from 'jwt-decode';

export const getToken = () => {
  return sessionStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const role = sessionStorage.getItem('userRole');
    return role;
  } catch (e) {
    return null;
  }
};
