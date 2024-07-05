import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import theme1 from "../theme";
import '../css/Home.css'; // CSS 파일 추가

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [scale, setScale] = useState(1);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [animateOutClass, setAnimateOutClass] = useState('');
    const [animateInClass, setAnimateInClass] = useState('');

    const backgroundImages = [
        '/otoo_react/images/main.png',
        '/otoo_react/images/love-main.png',
        '/otoo_react/images/friendship.png'
    ];

    const handleWheel = (event) => {
        event.preventDefault();

        setScale(prevScale => {
            let newScale = prevScale;
            let newBackgroundIndex = backgroundIndex;

            if (event.deltaY > 0) { // 스크롤 In
                if (prevScale < 1.5) {
                    newScale = Math.min(prevScale + 0.1, 1.5);
                    if (newScale === 1.5 && backgroundIndex === 0) {
                        setAnimateOutClass('slide-up-fade-out');
                        setTimeout(() => {
                            setBackgroundIndex(1);
                            setAnimateOutClass('');
                            setAnimateInClass('slide-up-fade-in');
                        }, 500);
                        setTimeout(() => setAnimateInClass(''), 1600);
                    }
                } else if (backgroundIndex < backgroundImages.length - 1) {
                    setAnimateOutClass('slide-up-fade-out');
                    setTimeout(() => {
                        setBackgroundIndex(backgroundIndex + 1);
                        setAnimateOutClass('');
                        setAnimateInClass('slide-up-fade-in');
                    }, 500);
                    setTimeout(() => setAnimateInClass(''), 1600);
                }
            } else { // 스크롤 Out
                if (backgroundIndex > 0) {
                    setAnimateOutClass('slide-down-fade-out');
                    setTimeout(() => {
                        setBackgroundIndex(backgroundIndex - 1);
                        setAnimateOutClass('');
                        setAnimateInClass('slide-down-fade-in');
                    }, 500);
                    setTimeout(() => setAnimateInClass(''), 1600);
                } else {
                    newScale = Math.max(prevScale - 0.1, 1);
                }
            }

            return newScale;
        });
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [backgroundIndex]);

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
                                    fontSize: { xs: '8px', sm: '10px', md: '14px' },
                                    padding: { xs: '2px 4px', sm: '4px 6px', md: '6px 12px' },
                                    borderRadius: 15,
                                }}
                            >
                                Judgment
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '14px' },
                                    padding: { xs: '2px 4px', sm: '4px 6px', md: '6px 12px' },
                                    borderRadius: 15,
                                }}
                            >
                                Janggu
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
                                    fontSize: { xs: '8px', sm: '10px', md: '14px' },
                                    padding: { xs: '2px 4px', sm: '4px 6px', md: '6px 12px' },
                                }}
                            >
                                wow
                            </Button>
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    fontSize: { xs: '8px', sm: '10px', md: '14px' },
                                    padding: { xs: '2px 4px', sm: '4px 6px', md: '6px 12px' },
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
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default Home;
