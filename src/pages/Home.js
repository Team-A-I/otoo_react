import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import theme1 from "../theme";
import '../css/Home.css'; // CSS 파일 추가

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [scale, setScale] = useState(1);
    const [backgroundImage, setBackgroundImage] = useState('/otoo_react/images/main10.png');
    const [animateOutClass, setAnimateOutClass] = useState('');
    const [animateInClass, setAnimateInClass] = useState('');

    const handleWheel = (event) => {
        event.preventDefault();

        setScale(prevScale => {
            const newScale = event.deltaY > 0 ? Math.min(prevScale + 0.1, 1.5) : Math.max(prevScale - 0.1, 1);

            if (newScale === 1.5 && prevScale < 1.5) {
                setAnimateOutClass('slide-up-fade-out');
                setTimeout(() => {
                    setBackgroundImage('/otoo_react/images/love-main5.png');
                    setAnimateOutClass('');
                    setAnimateInClass('slide-up-fade-in');
                }, 500); // 0.5s 이후 이미지 변경
                setTimeout(() => setAnimateInClass(''), 1600); // 새로운 이미지 애니메이션 끝

            } else if (newScale < 1.5 && prevScale === 1.5) {
                setAnimateOutClass('slide-down-fade-out');
                setTimeout(() => {
                    setBackgroundImage('/otoo_react/images/main10.png');
                    setAnimateOutClass('');
                    setAnimateInClass('slide-down-fade-in');
                }, 500); // 0.5s 이후 이미지 변경
                setTimeout(() => setAnimateInClass(''), 1600); // 새로운 이미지 애니메이션 끝
            }

            return newScale;
        });
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <ThemeProvider theme={theme1}>
            <div style={{ fontFamily: theme.typography.fontFamily, overflow: 'hidden', position: 'relative' }}>
                <Box
                    sx={{
                        backgroundImage: 'url(/otoo_react/images/main-back2.png)',
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
                            src={backgroundImage}
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
