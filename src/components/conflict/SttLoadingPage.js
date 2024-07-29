import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../axios';
import '../../css/conflict/LoadingPage.css'; // 커스텀 CSS 파일을 임포트합니다.

const SttLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonContent } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      if (jsonContent && jsonContent.file) {
        try {
          const fileExtension = jsonContent.file.name.split('.').pop().toLowerCase();
          const requestData = { text: jsonContent.text };
          if (usercode) {
            requestData.usercode = usercode;
          }

          let response;
          if (fileExtension === 'txt') {
            response = await axiosIns.post('/api/conflict/analysis', requestData);
            navigate('/result-conflict', { state: { jsonData: response.data } });
            window.location.reload();
          } else if (fileExtension === 'wav' || fileExtension === 'mp3') {
            const formData = new FormData();
            formData.append('file', jsonContent.file);
            if (usercode) {
              formData.append('usercode', usercode);
            }
            response = await axiosIns.post('/api/transcribe/file', formData);
            navigate('/stt-result', { state: { jsonData: response.data } });
            window.location.reload();
          } else {
            const formData = new FormData();
            formData.append('file', jsonContent.file);
            if (usercode) {
              formData.append('usercode', usercode);
            }
            response = await axiosIns.post('/api/conflict/ocr', formData);
            navigate('/result-conflict', { state: { jsonData: response.data } });
            window.location.reload();
          }
        } catch (error) {
          alert(error.response?.data?.message || "대화내용이 짧아서 분석할 수 없습니다.");
          navigate('/upload-conflict'); // 오류 발생 시 /upload-conflict로 이동
        }
      } else {
        console.error("jsonContent or jsonContent.file is undefined");
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

export default SttLoadingPage;
