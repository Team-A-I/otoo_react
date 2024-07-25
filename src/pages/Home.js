import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, Grid, Container, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import theme1 from '../theme';
import '../css/Home.css';
import axiosIns from '../components/axios';
import AgreeModal from '../components/modal/AgreeModal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import QnaChatbot from '../components/modal/QnaChatbot';

const cardData = [
    { title: "(PC)텍스트 파일 추출방법", image: "/images/1pc카톡추출.png", alt: "talk1", description: "카톡에서 1:1 대화를 txt파일로 추출해주세요." },
    { title: "(PC)텍스트파일 업로드방법", image: "/images/2pc카톡업로드.png", alt: "talk2", description: "70KB이하의 카톡txt 파일을 업로드 할 수 있습니다." },
    { title: "(PC)캡쳐파일 추출방법", image: "/images/3pc카톡캡쳐.png", alt: "talk3", description: "5장 이하의 카톡캡쳐 파일을 업로드할 수 있습니다." },
    { title: "(모바일)캡쳐 기능선택", image: "/images/5모바일캡쳐.png", alt: "talk4", description: "카카오톡에서 캡쳐 기능을 선택합니다." },
    { title: "(모바일)캡쳐 사용방법", image: "/images/4모바일선택.png", alt: "talk5", description: "원하는 구역을 선택합니다." },
    { title: "음성 업로드 사용방법", image: "/images/6음성녹음.png", alt: "talk6", description: "음성을 직접 녹음하거나, 파일을 올릴 수 있습니다." },
    { title: "음성 분석 사용방법", image: "/images/7음성업로드.png", alt: "talk7", description: "1MB(60초)이하의 음성만 업로드 할 수 있습니다." },
    { title: "챗봇 선택방법", image: "/images/9챗봇선택.png", alt: "talk8", description: "일반모드(공감모드), 장구모드(판소리모드)의 챗봇을 선택할 수 있습니다." },
    { title: "챗봇 이용방법", image: "/images/8챗봇.png", alt: "talk9", description: "채팅을 입력하고, 일정길이 초과시 조언을 받을 수 있습니다." }
];

const smallBoxes = [
    {
        bgColor: 'gray100',
        slides: [
            { textColor: 'white', image: '/images/로고.png' },
            { text: '몇대몇', textColor: 'gray900'},
        ]
    },
    {
        bgColor: 'gray200',
        slides: [
            { text: '몇대몇 음성\n#실시간 녹음 #음성 파일 분석', textColor: 'gray800' },
            { text: '몇대몇 이미지\n#카톡 캡쳐본 #텍스트 추출', textColor: 'gray800'},
            { text: '몇대몇 텍스트\n#카톡 텍스트 파일 분석', textColor: 'gray800'},
        ]
    },
    {
        bgColor: 'darkgreen',
        slides: [
            { text: '무조건 내편 맞장구 챗봇', textColor: 'white'},
            { text: '맞장구를 넘어 얼쑤 장구 챗봇', textColor: 'white'},
        ]
    }
];    

const finalBoxes = [
    { bgColor: 'gray100', text: '카톡 분석', textColor: 'black', path: '/upload-conflict' },
    { bgColor: 'gray100', text: '맞장구 채팅', textColor: 'black', path: '/chatbot' },
];

const Home = () => {
    const [openChat, setOpenChat] = useState(false);// eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const largeImageSrc = "/images/main.jpg";
    const largeImageAlt = "Large Content";
    const largeImageText = ["대화 판결의", "모든 것"];
    const largeImageTextSub = "몇대몇";
    const servicetitle1 = '🙌몇대몇 서비스 사용 방법';
    const servicetitle2 = '👏판결과 공감의 몇대몇 서비스';

    const handleOpenChat = () => setOpenChat(true);
    const handleCloseChat = () => setOpenChat(false);
    // eslint-disable-next-line
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
        }
    }, []);

    const handleBoxClick = (path) => {
        navigate(path);
    };

    const handlePrev = () => {
        setCurrentSlide(currentSlide === 0 ? cardData.length - 1 : currentSlide - 1);
    };

    const handleNext = () => {
        setCurrentSlide(currentSlide === cardData.length - 1 ? 0 : currentSlide + 1);
    };

    const renderIndicator = (onClickHandler, isSelected, index, label) => {
        const style = {
            background: isSelected ? '#FFFFFF' : '#ccc', // 선택된 상태는 검은색, 선택되지 않은 상태는 회색
            width: 7,
            height: 7,
            display: 'inline-block',
            margin: '0 8px',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' // 그림자 추가
        };
        return (
            <li
                style={style}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
            />
        );
    };
    
    

    return (
        <ThemeProvider theme={theme1}>
            <div style={{ fontFamily: theme1.typography.fontFamily }}>
                <Box p={5} sx={{ backgroundColor: 'white' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={9}>
                                <LargeImageBox
                                    src={largeImageSrc}
                                    alt={largeImageAlt}
                                    text={largeImageText}
                                    subText={largeImageTextSub}
                                />
                            </Grid>
                            <Grid item container xs={12} md={12} lg={3} spacing={2}>
                                {smallBoxes.map((box, index) => (
                                    <Grid item xs={12} sm={4} md={4} lg={12} key={index}>
                                        <SmallBoxCarousel box={box} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Box mt={7}>
                            <Typography variant='h2_bold'>
                                {servicetitle1}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <IconButton
                                    onClick={handlePrev}
                                    sx={{
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <ArrowBackIos />
                                </IconButton>
                                <Box sx={{ flex: 1, overflowX: 'hidden' }}>
                                    <Carousel
                                        infiniteLoop={false}
                                        useKeyboardArrows={false}
                                        showThumbs={false}
                                        showStatus={false}
                                        showArrows={false}
                                        selectedItem={currentSlide}
                                        onChange={(index) => setCurrentSlide(index)}
                                        renderIndicator={renderIndicator}
                                        autoPlay={false}
                                    >
                                        {cardData.map((card, index) => (
                                            <CardBox key={index} card={card} />
                                        ))}
                                    </Carousel>
                                </Box>
                                <IconButton
                                    onClick={handleNext}
                                    sx={{
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <ArrowForwardIos />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant='h2_bold'>
                                {servicetitle2}
                            </Typography>
                            <Grid container spacing={2} mt={2}>
                                {finalBoxes.map((box, index) => (
                                    <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                                        <FinalBox box={box} onClick={() => handleBoxClick(box.path)} />
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

const LargeImageBox = ({ src, alt, text, subText }) => (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' , textAlign:'right'}}>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
        <Typography
            variant="hc_bold"
            sx={{
                position: 'absolute',
                top: { xs: 25, sm: 50, md: 80, lg: 100 },
                left: { xs: 160, sm: 360, md: 600, lg: 640 },
                color: 'white',
            }}
            >
            {text.map((line, index) => (
                <React.Fragment key={index}>
                {line}
                <br />
                </React.Fragment>
            ))}
            <Typography
            variant="hb_bold"
            color="gray600">
                {subText}
            </Typography>
        </Typography>
    </Box>
);

const SmallBoxCarousel = ({ box }) => (
    <Carousel
        showArrows={false}
        showThumbs={false}
        infiniteLoop={false}
        showStatus={false}
        autoPlay={false}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
    >
        {box.slides.map((slide, slideIndex) => (
            <Box
                key={slideIndex}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: '80px', md: '125px' },
                    backgroundColor: box.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    flexDirection: 'column',
                    padding: 2,
                    textAlign: 'center'
                }}
            >
                {slide.image && (
                    <img src={slide.image} alt={`slide-${slideIndex}`} style={{ width: '38%', objectFit: "cover" }} />
                )}
                {slide.text && (
                    <Typography
                        variant="title_bold"
                        sx={{
                            color: slide.textColor,
                            fontSize: { xs: '0.8rem', md: '1rem' },
                            whiteSpace: 'pre-line' // This allows for line breaks in the text
                        }}
                    >
                        {slide.text}
                    </Typography>
                )}
            </Box>
        ))}
    </Carousel>
);

const CardBox = ({ card }) => (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="title_bold" 
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
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="h3_bold">
          {card.description}
        </Typography>
      </Box>
      <img 
        src={card.image} 
        alt={card.alt} 
        style={{ 
          maxWidth: '30%', 
          height: 'auto', 
          margin: '0 auto',
          width: '100%',
          '@media (minWidth: 400px)': {
            maxWidth: '50%',
          }
        }} 
      />
    </Box>
  );
  

const FinalBox = ({ box, onClick }) => (
    <Box 
        sx={{ 
            position: 'relative', 
            width: '100%', 
            height: { xs: '60px', sm: '80px', md: '90px' }, 
            backgroundColor: box.bgColor, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '10px', 
            cursor: 'pointer',
            overflow: 'hidden',
            '&:hover': {
                backgroundColor: 'lightgray',
            }
        }}
        onClick={onClick}
    >
        <Typography variant="title_bold" sx={{ color: box.textColor }}>
            {box.text}
        </Typography>
    </Box>
);

export default Home;
