import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme1 from '../theme';
import '../css/Home.css';
import axiosIns from '../components/axios';
import AgreeModal from '../components/AgreeModal';
import Footer from '../components/Footer';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString();

    const cardMaxWidth = 360;
    const imageHeight = 300;
    const cardContentText = "상황 설명에 따른 과실 여부를 따져보겠습니다.";
    const cardContentText2 = "얼쑤! 네 말이 다 맞다. 무조건 얼쑤다!";

    const cards = [
        { imageSrc: "/images/han.jpg", imageAlt: "Conflict between couple" },
        { imageSrc: "/images/zangu.jpg", imageAlt: "Another conflict" }
    ];

    const handleLogout = async () => {
        try {
            const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/logoutUser', sessionStorage.getItem('userEmail'), {
                headers: {
                    'Authorization': sessionStorage.getItem('userEmail'),
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('userRole');
                setIsLoggedIn(false);
                navigate('/');
                alert('로그아웃 성공');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const usersCode = sessionStorage.getItem('accessToken');
        if (usersCode !== null) {
            setIsLoggedIn(true);
            console.log(sessionStorage.getItem('refreshToken'));
        }
    }, []);

    return (
        <ThemeProvider theme={theme1}>
            <div style={{ fontFamily: theme1.typography.fontFamily, position: 'relative', minHeight: '100vh' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0',
                        boxSizing: 'border-box',
                        marginTop: 5,
                        paddingBottom: '100px', // 푸터 높이만큼 패딩 추가
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', ml: 3.3, mt: 3.5, mb:3}}>
                        <Typography variant="h2_bold" gutterBottom>
                            투데이
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
                            {today}
                        </Typography>
                    </Box>
                    {cards.map((card, index) => (
                        <Card key={index} sx={{ maxWidth: cardMaxWidth, mt: index > 0 ? 3 : 0 }}>
                            <CardMedia
                                component="img"
                                height={imageHeight}
                                image={card.imageSrc}
                                alt={card.imageAlt}
                                sx={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
                            />
                            <CardContent sx={{ paddingTop: '16px' }}>
                                <Typography variant="h6" color="text.secondary">
                                    {cardContentText}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Footer />
                <AgreeModal />
            </div>
        </ThemeProvider>
    );
};

export default Home;
