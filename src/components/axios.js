import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000000,
});

axiosIns.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  const refresh = sessionStorage.getItem('refreshToken');

  if (token) {
    config.headers = config.headers || {};
    config.headers.access = token;
    config.headers.refresh = refresh;
  }
  return config;
});

axiosIns.interceptors.response.use(
  (response) => {
    if(typeof response.headers.access !== 'undefined'){
      sessionStorage.setItem('accessToken', response.headers.access);
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      const email = sessionStorage.getItem('userEmail');
      try {
        const response = await axios.post('/logoutUser',email, {
            headers: {
                'Authorization': email,
                'Content-Type': 'application/json',
            },
      });
        
        if ((response).status === 200) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userRole');
           
              
        }
    } catch (error) {
        console.error('Logout failed', error);
    }            
    
       
     
    } else {
      return Promise.reject(error);
    }
   
  }
);

export default axiosIns;
