import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../../components/axios';
import { Container } from '@mui/material';
import '../../css/chatbot/EmotionReportLoadingPage.css';



const EmotionReportLoadingPage = () => {
    const location = useLocation();
    const messages = location.state?.messages;
    const navigate = useNavigate();
    const usersCode = sessionStorage.getItem('usersCode');
    const emotionReportHandler = useCallback(async() => {
        try {
            if (!messages) {
                alert('잘못된 접근입니다.');
                navigate('/');
                return;
            }
            const requestBody = usersCode ? { messages, usersCode } : { messages };
            const response = await axiosIns.post('http://localhost:8080/emotionReport', requestBody, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const result = response.data
            navigate('/emotionReportPage', { state: { result: result }});
            window.location.reload();
            } catch (error) {
            console.error('Error uploading file:', error);

        }
    }, [messages, navigate, usersCode])
    useEffect(() => {
        emotionReportHandler();
      }, [emotionReportHandler]);
  return (
    <Container sx={{ display: 'flex', marginTop:"35px", justifyContent:'center'}}>
      <img src="/images/janggu_dance.gif" alt="loading" />
    </Container>
  );
};

 

export default EmotionReportLoadingPage;