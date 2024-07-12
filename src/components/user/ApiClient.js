import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 API의 기본 URL을 설정합니다.
    headers: {
        'Content-Type': 'application/json',
    },
    
});

// 요청을 보낼 때 Authorization 헤더에 토큰을 포함시키기 위한 인터셉터 설정
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('usersCode'); // 로컬 스토리지에서 토큰을 가져옵니다.
    if (token) {
        config.headers.Authorization =  token;
    }
    return config;
});

export default apiClient;