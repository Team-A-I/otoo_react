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
  const apiUrl = 'https://gnat-suited-weekly.ngrok-free.app/api/conflict';
  const alertMessage = '지원하지 않는 데이터 형식입니다.\n아래의 형식인지 확인부탁드려요:)\n\n 1. 카톡 형식 텍스트 파일\n 2. 카톡 기본 테마 캡쳐 이미지';
  const errorMessage = 'jsonContent 또는 jsonContent.files가 정의되지 않았거나 비어 있습니다.';
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('jsonContent:', jsonContent);
  
        try {
          if (jsonContent?.text) {
            const requestData = { text: jsonContent.text || '', usercode };
            console.log('Sending text data for analysis:', requestData);
            const response = await axiosIns.post(`${apiUrl}/analysis`, requestData);
            console.log('Server response:', response.data);
            navigate('/result-conflict', { state: { jsonData: response.data } });
          } else if (jsonContent?.files?.length > 0) {
            const formData = new FormData();
            jsonContent.files.forEach((file) => {
              const fileExtension = file.name.split('.').pop().toLowerCase();
              if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
                formData.append('file', file);
              } else {
                throw new Error('지원하지 않는 파일형식입니다.');
              }
            });
            if (usercode) {
              formData.append('usercode', usercode);
            }
            console.log('Sending image files for OCR');
            const response = await axiosIns.post(`${apiUrl}/ocr`, formData);
            console.log('Server response:', response.data);
            navigate('/result-conflict', { state: { jsonData: response.data } });
          } else {
            throw new Error(errorMessage);
          }
        } catch (error) {
          alert(error.message === errorMessage ? errorMessage : alertMessage);
          console.error("Error sending data to backend:", error);
          navigate('/');
        }
      };
  
      fetchData();
    }, [jsonContent, navigate, usercode]);


  return (
    <Container sx={{ display: 'flex', marginTop:"35px", justifyContent:'center'}}>
      <img src="/images/moonchul_dance.gif" alt="loading" />
    </Container>
  );
};

export default LoadingPage;