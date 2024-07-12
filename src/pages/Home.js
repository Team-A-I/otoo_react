import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useNavigate } from 'react-router-dom';
import theme1 from "../theme";
import '../css/Home.css'; // CSS 파일 추가
import AgreeModal from '../components/AgreeModal';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [scale, setScale] = useState(1);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [animateOutClass, setAnimateOutClass] = useState('');
    const [animateInClass, setAnimateInClass] = useState('');
    // eslint-disable-next-line
    const [scrollAmount, setScrollAmount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const scrollThreshold = 100; // 더 느리게 변경되도록 임계치 증가
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const backgroundImages = [
        '/otoo_react/images/main.png',
        '/otoo_react/images/main-conflict.png',
        '/otoo_react/images/friendship.png',
        '/otoo_react/images/love-main.png',
        '/otoo_react/images/main-janggu2.png'
    ];

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleWheel = (event) => {
        event.preventDefault();
        if (isAnimating) return; // 애니메이션 중일 때는 새로운 스크롤 이벤트 무시
    
        setScrollAmount(prevScrollAmount => {
            const newScrollAmount = prevScrollAmount + event.deltaY;
            if (Math.abs(newScrollAmount) >= scrollThreshold) {
                setScrollAmount(0); // 임계치를 초과한 후 스크롤 양을 초기화합니다.
                setScale(prevScale => {
                    let newScale = prevScale;
                    // eslint-disable-next-line
                    let newBackgroundIndex = backgroundIndex;
    
                    if (newScrollAmount > 0) { // 스크롤 In
                        if (prevScale < 1.5) {
                            newScale = Math.min(prevScale + 0.1, 1.5);
                            if (newScale === 1.5 && backgroundIndex === 0) {
                                setAnimateOutClass('slide-up-fade-out');
                                setIsAnimating(true); // 애니메이션 시작
                                setTimeout(() => {
                                    setBackgroundIndex(1);
                                    setAnimateOutClass('');
                                    setAnimateInClass('slide-up-fade-in');
                                    setTimeout(() => setIsAnimating(false), 1600); // 애니메이션 완료
                                }, 500);
                                setTimeout(() => setAnimateInClass(''), 1600);
                            }
                        } else if (backgroundIndex < backgroundImages.length - 1) {
                            setAnimateOutClass('slide-up-fade-out');
                            setIsAnimating(true); // 애니메이션 시작
                            setTimeout(() => {
                                setBackgroundIndex(backgroundIndex + 1);
                                setAnimateOutClass('');
                                setAnimateInClass('slide-up-fade-in');
                                setTimeout(() => setIsAnimating(false), 1600); // 애니메이션 완료
                            }, 500);
                            setTimeout(() => setAnimateInClass(''), 1600);
                        }
                    } else { // 스크롤 Out
                        if (backgroundIndex > 0) {
                            setAnimateOutClass('slide-down-fade-out');
                            setIsAnimating(true); // 애니메이션 시작
                            setTimeout(() => {
                                setBackgroundIndex(backgroundIndex - 1);
                                setAnimateOutClass('');
                                setAnimateInClass('slide-down-fade-in');
                                setTimeout(() => setIsAnimating(false), 1600); // 애니메이션 완료
                            }, 500);
                            setTimeout(() => setAnimateInClass(''), 1600);
                        } else {
                            newScale = Math.max(prevScale - 0.1, 1);
                            setIsAnimating(false); // 애니메이션 완료
                        }
                    }
    
                    return newScale;
                });
            }
            return newScrollAmount;
        });
    };
    const handleLogout = () => {
        sessionStorage.removeItem('usersCode');
        setIsLoggedIn(false);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userRole");
}
    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);// eslint-disable-next-line
    }, [backgroundIndex, isAnimating]);

    const handleNavigation = (path) => {
        navigate(path);
    };
    useEffect(() => {
    
      }, []);
    useEffect(() => {
    const usersCode = sessionStorage.getItem('usersCode');
    if (usersCode !== null) {
        setIsLoggedIn(true);
    }// eslint-disable-next-line
    }, [sessionStorage.getItem('usersCode')]);

    // useEffect(() => {
    //     const checkLoginStatus = () => {
    //       const usersCode = sessionStorage.getItem('usersCode');
    //       setIsLoggedIn(usersCode !== null);
    //     };
      
    //     checkLoginStatus();
      
    //     window.addEventListener('storage', checkLoginStatus);
      
    //     return () => {
    //       window.removeEventListener('storage', checkLoginStatus);
    //     };
    //   }, []);

    return (
        <ThemeProvider theme={theme1}>
            <div style={{ fontFamily: theme.typography.fontFamily, overflow: 'hidden', position: 'relative' }}>
                <Box
                    sx={{
                        backgroundImage: 'url(/otoo_react/images/main-back.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        transition: 'transform 0.5s ease',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center',
                        marginTop: 0
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: isMobile ? '90%' : '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: { xs: '5px', md: '20px' },
                                left: { xs: '10px', md: '35px' },
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '12px' },
                                    padding: { xs: '2px 4px', sm: '3px 6px', md: '4px 8px' },
                                    borderRadius: 15,
                                }}
                                onClick={() => handleNavigation('/analysis')}
                            >
                                카톡 판결
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '12px' },
                                    padding: { xs: '2px 4px', sm: '3px 6px', md: '4px 8px' },
                                    borderRadius: 15,
                                }}
                                onClick={() => handleNavigation('/chatbot')}
                            >
                                맞장구 봇
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: { xs: '5px', md: '20px' },
                                right: { xs: '10px', md: '35px' },
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                            }}
                        >
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '12px' },
                                    padding: { xs: '2px 4px', sm: '3px 6px', md: '4px 8px' },
                                }}
                                onClick={() => isLoggedIn ? handleLogout() : handleNavigation('/user-login')}
                            >
                                 {isLoggedIn ? '로그아웃' : '로그인'}
                            </Button>
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '12px' },
                                    padding: { xs: '2px 4px', sm: '3px 6px', md: '4px 8px' },
                                }}
                            >
                                Q&A
                            </Button>
                        </Box>
                        <Box
                            component="img"
                            src={backgroundImages[backgroundIndex]}
                            alt="Your Image Description"
                            className={`${animateInClass} ${animateOutClass}`}
                            sx={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: { xs: '10px', sm: '20px', md: '30px' },
                                right: { xs: '10px', sm: '20px', md: '40px' },
                                textAlign: 'right',
                            }}
                        >
                            <Typography
                                variant="body1"
                                color="deepblue"
                                sx={{
                                    fontSize: { xs: '6px', sm: '11px', md: '15px' },
                                }}
                            >
                                No more frustrating worries
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: '6px', sm: '11px', md: '15px' },
                                }}
                            >
                                <br />
                            </Typography>
                            <Typography
                                variant="body1"
                                color="deepblue"
                                sx={{
                                    fontSize: { xs: '6px', sm: '11px', md: '15px' },
                                }}
                            >
                                On our "몇대몇" service
                            </Typography>
                            <Typography
                                variant="body1"
                                color="deepblue"
                                sx={{
                                    fontSize: { xs: '6px', sm: '11px', md: '15px' },
                                }}
                            >
                                It will coolly solve your curiosity
                            </Typography>
                            <Typography
                                variant="body1"
                                color="deepblue"
                                sx={{
                                    fontSize: { xs: '6px', sm: '11px', md: '15px' },
                                }}
                            >
                                Thank you for visiting us.
                            </Typography>
                        </Box>
                        {/* 스크롤 힌트 추가 */}
                        {backgroundIndex !== backgroundImages.length - 1 && (
                            <Typography className="scroll-hint" sx={{ fontSize: { xs: 8, sm: 12, md: 15 }}}>
                                Scroll Down <br/> 
                                <KeyboardDoubleArrowDownIcon sx={{ fontSize: { xs: 10, sm: 15, md: 20 }, color: '1B1F23' }} />
                            </Typography>
                        )}
                    </Box>
                </Box>
                <AgreeModal/>
            </div>
        </ThemeProvider>
    );
};

export default Home;
