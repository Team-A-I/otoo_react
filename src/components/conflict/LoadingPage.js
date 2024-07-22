import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../axios';
import '../../css/conflict/LoadingPage.css'; // 커스텀 CSS 파일을 임포트합니다.

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonContent } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      console.log('jsonContent:', jsonContent);

      if (jsonContent && jsonContent.text) {
        try {
          const requestData = { text: jsonContent.text || '' };
          if (usercode) {
            requestData.usercode = usercode;
          }

          console.log('Sending text data for analysis:', requestData);
          const response = await axiosIns.post('/api/conflict/analysis', requestData);
          console.log('Server response:', response.data);

          navigate('/result-conflict', { state: { jsonData: response.data } });
        } catch (error) {
          alert('지원하지 않는 데이터 형식입니다.\n아래의 형식인지 확인부탁드려요:)\n\n 1. 카톡 형식 텍스트 파일\n 2. 카톡 기본 테마 캡쳐 이미지');
          console.error("Error sending data to backend:", error);
          navigate('/');
        }
      } else if (jsonContent && jsonContent.files && jsonContent.files.length > 0) {
        try {
          const formData = new FormData();
          jsonContent.files.forEach((file) => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
              formData.append('file', file);  // 변경된 부분: 파일 배열에서 단일 파일로 처리
            } else {
              throw new Error('지원하지 않는 파일형식입니다.');
            }
          });
          if (usercode) {
            formData.append('usercode', usercode);
          }

          console.log('Sending image files for OCR');
          const response = await axiosIns.post('/api/conflict/ocr', formData);

          console.log('Server response:', response.data);
          navigate('/result-conflict', { state: { jsonData: response.data } });
        } catch (error) {
          alert('지원하지 않는 데이터 형식입니다.\n아래의 형식인지 확인부탁드려요:)\n\n 1. 카톡 형식 텍스트 파일\n 2. 카톡 기본 테마 캡쳐 이미지');
          console.error("Error sending data to backend:", error);
          navigate('/');
        }
      } else {
        alert('jsonContent 또는 jsonContent.files가 정의되지 않았거나 비어 있습니다.');
        console.error("jsonContent 또는 jsonContent.files가 정의되지 않았거나 비어 있습니다.");
        navigate('/');
      }
    };

    fetchData();
  }, [jsonContent, navigate, usercode]);


  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 0, margin: 0 }}>
      <img src="/images/moonchul_dance.gif" alt="loading" style={{ width: '60%', height: '60%', objectFit: 'cover' }} />
    </Container>
  );
};

export default LoadingPage;