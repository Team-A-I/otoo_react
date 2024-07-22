import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Grid, Container, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme1 from '../theme';
import '../css/Home.css';
import axiosIns from '../components/axios';
import AgreeModal from '../components/modal/AgreeModal';
import { Carousel } from 'react-responsive-carousel';
import QnaChatbot from '../components/modal/QnaChatbot';

const cardData = [
    { title: "데이터 추출방법", image: "/images/톡설명1.png", alt: "talk1", description: "카톡에서 1:1 대화를 txt파일로 추출해주세요." },
    { title: "텍스트파일 업로드방법", image: "/images/톡설명2.png", alt: "talk2", description: "70KB이하의 카톡txt 파일을 업로드 할 수 있습니다." },
    { title: "캡쳐파일 업로드방법", image: "/images/톡설명3.png", alt: "talk3", description: "5장 이하의 카톡캡쳐 파일을 업로드할 수 있습니다." }
];

const smallBoxes = [
    { bgColor: 'darkgreen', text: '몇대몇', textColor: 'white' },
    { bgColor: 'gray200', text: '음성, 사진, 텍스트\n\n 모든 형태의 대화 데이터 판결', textColor: 'gray800' },
    { bgColor: 'gray200', text: '무조건 내편 맞장구 챗봇', textColor: 'gray800' }
];

const finalBoxes = [
    { bgColor: 'gray200', text: '카톡 분석', textColor: 'black' },
    { bgColor: 'gray200', text: '맞장구 채팅', textColor: 'black' },
];

const Home = () => {
    const [openChat, setOpenChat] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const largeImageSrc = "/images/main.png";
    const largeImageAlt = "Large Content";
    const largeImageText = "대화 판결의 모든 것";
    const largeImageTextSub = "몇대몇";
    const servicetitle1 = '몇대몇 서비스 사용 방법';
    const servicetitle2 = '갈등 상황에서 판결을 내려주는 몇대몇 서비스';

    const handleOpenChat = () => setOpenChat(true);
    const handleCloseChat = () => setOpenChat(false);

    const handleLogout = async () => {
        try {
            const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/logoutUser', sessionStorage.getItem('userEmail'), {
                headers: {
                    'Authorization': sessionStorage.getItem('userEmail'),
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                sessionStorage.clear();
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
        if (usersCode) {
            setIsLoggedIn(true);
            console.log(sessionStorage.getItem('refreshToken'));
        }
    }, []);

    return (
        <ThemeProvider theme={theme1}>
            <div style={{ fontFamily: theme1.typography.fontFamily }}>
                <Box p={5} sx={{ backgroundColor: 'white' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9}>
                                <Box sx={{ position: 'relative', width: '100%', height: '100%', textAlign: 'right' }}>
                                    <img src={largeImageSrc} alt={largeImageAlt} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h1_bold" sx={{ position: 'absolute', top: { xs: 50, md: 150 }, left: { xs: 20, md: 450 }, color: 'white', fontSize: { xs: '1.5rem', md: '3rem' } }}>
                                        {largeImageText}<br />
                                        {largeImageTextSub}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item container xs={12} md={3} spacing={2}>
                                {smallBoxes.map((box, index) => (
                                    <Grid item xs={12} sm={4} md={12} key={index}>
                                        <Box sx={{ position: 'relative', width: '100%', height: '125px', backgroundColor: box.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                            <Typography p={3} variant="title_bold" sx={{ color: box.textColor, fontSize: { xs: '0.8rem', md: '1rem' } }}>
                                                {box.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Box mt={7}>
                            <Typography variant='h2_bold'>
                                {servicetitle1}
                            </Typography>
                            <Box sx={{ display: 'flex', overflowX: 'auto', mt: 2 }}>
                                <Carousel
                                    infiniteLoop={false}
                                    useKeyboardArrows
                                    showThumbs={false}
                                    showStatus={false}
                                    showArrows={true}
                                    selectedItem={currentSlide}
                                    onChange={(index) => setCurrentSlide(index)}
                                    renderIndicator={false}
                                >
                                    {cardData.map((card, index) => (
                                        <Box key={index} sx={{ textAlign: 'center', p: 2 }}>
                                            <Box sx={{ mb: 5 }}>
                                                <Typography 
                                                    variant="h2_bold" 
                                                    sx={{ 
                                                        display: 'inline-block',
                                                        position: 'relative',
                                                        '&:before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '35%',
                                                            bottom: 0,
                                                            left: 0,
                                                            backgroundColor: 'vlightgreen',
                                                            zIndex: -1,
                                                        }
                                                    }}
                                                >
                                                    {card.title}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ mt: 1, mb: 5 }}>
                                                <Typography variant="title_bold">
                                                    {card.description}
                                                </Typography>
                                            </Box>
                                            <img src={card.image} alt={card.alt} style={{ maxWidth: '60%', height: 'auto', margin: '0 auto' }} />
                                        </Box>
                                    ))}
                                </Carousel>
                            </Box>
                        </Box>
                        <Box mt={7}>
                            <Typography variant='h2_bold'>
                                {servicetitle2}
                            </Typography>
                            <Grid container spacing={2} mt={2}>
                                {finalBoxes.map((box, index) => (
                                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                                        <Box sx={{ position: 'relative', width: '100%', height: '90px', backgroundColor: box.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                            <Typography variant="title_bold" sx={{ color: box.textColor }}>
                                                {box.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Container>
                    <AgreeModal />
                    <IconButton 
                        color="#04613E"
                        fontSize='Large'
                        onClick={handleOpenChat} 
                        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                    >
                        <img src='/images/qnaIcon.png' style={{height:'80px'}} alt="Q&A Icon" />
                    </IconButton>
                    <QnaChatbot open={openChat} onClose={handleCloseChat} />
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default Home;
