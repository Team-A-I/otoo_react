import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../../components/axios';
import { Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../../css/chatbot/EmotionReportLoadingPage.css';
import theme from "../../theme"



const EmotionReportLoadingPage = () => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const messages = location.state?.messages;
    const navigate = useNavigate();
    const usersCode = sessionStorage.getItem('usersCode');
    const emotionReportHandler = useCallback(async() => {
        try {
            const requestBody = usersCode ? { messages, usersCode } : { messages };
            const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/emotionReport', requestBody, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const result = response.data
            navigate('/emotionReportPage', { state: { result: result }});
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