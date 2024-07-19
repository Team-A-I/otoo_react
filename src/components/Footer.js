import React from 'react';
import { Box, Button, ThemeProvider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import VerdictIcon from '@mui/icons-material/Gavel';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import theme from '../theme';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getButtonColor = (path) => {
        return location.pathname === path ? '#0000FF' : '#393939'; // 파란색 (#0000FF) 또는 기본 색 (#393939)
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ fontFamily: theme.typography.fontFamily }}>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#fff',  // 배경색을 흰색으로 변경
                        color: '#000',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: '10px 0',
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                        zIndex: 999
                    }}
                >
                    <Button
                        sx={{ color: getButtonColor('/'), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onClick={() => navigate('/')}
                    >
                        <HomeIcon />
                        <Box component="span" sx={{ mt: 1 }}>홈</Box>
                    </Button>
                    <Button
                        sx={{ color: getButtonColor('/upload-conflict'), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onClick={() => navigate('/upload-conflict')}
                    >
                        <VerdictIcon />
                        <Box component="span" sx={{ mt: 1 }}>카톡 판결</Box>
                    </Button>
                    <Button
                        sx={{ color: getButtonColor('/chatbot'), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onClick={() => navigate('/chatbot')}
                    >
                        <ChatIcon />
                        <Box component="span" sx={{ mt: 1 }}>맞장구 봇</Box>
                    </Button>
                    <Button
                        sx={{ color: getButtonColor('/user-login'), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onClick={() => navigate('/user-login')}
                    >
                        <LoginIcon />
                        <Box component="span" sx={{ mt: 1 }}>로그인</Box>
                    </Button>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default Footer;
