import { ThemeProvider, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AnalysisMain = () => {

    const buttonData = [
        { text: 'ㄱㅏㄹㄷㅡㅇ', link: '/upload-conflict' },
        { text: 'ㅇㅜㅈㅓㅇ', link: '/upload-friendship' },
        { text: 'ㅅㅏㄹㅏㅇ', link: '/upload-love' }
    ];

    const cardData = [
        { image: "/otoo_react/images/톡설명1.png", alt: "talk1", description: "카톡에서 1:1 대화를 txt파일로 추출해주세요." },
        { image: "/otoo_react/images/톡설명2.png", alt: "talk2", description: "원하는 분야를 고르고 파일을 업로드 해주세요." },
        { image: "/otoo_react/images/톡설명3.png", alt: "talk3", description: "카톡 캡쳐 이미지도 업로드 가능합니다." }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const renderIndicator = (clickHandler, isSelected, index) => {
        return (
            <span
                className={isSelected ? "indicator selected" : "indicator"}
                onClick={clickHandler}
                onKeyDown={clickHandler}
                role="button"
                key={index}
            />
        );
    };

    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % cardData.length);
    };

    const prev = () => {
        setCurrentSlide((prev) => (prev - 1 + cardData.length) % cardData.length);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ fontFamily: theme.typography.fontFamily }}>
                <Box mt={5} sx={{ padding: { xs: 1, sm: 5, md: 10, xl: 15 } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}
                            sx={{ minHeight: "30vh" }}
                            display="flex" alignItems="center"
                            justifyContent="center">
                            <Box>
                                {buttonData.map((button, index) => (
                                    <Box key={index} p={1} mb={8}>
                                        <Typography
                                            variant='hbig_bold'
                                            sx={{
                                                mr: 2,
                                                color: theme.palette.peach,
                                                '&:hover': {
                                                    color: theme.palette.lightblue,
                                                },
                                                textDecoration: 'none',
                                            }}
                                            component={Link} to={button.link}>
                                            {button.text.split('').map((char, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        position: 'relative',
                                                        textDecoration: 'none',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {char}
                                                    {i < 2 && (
                                                        <span
                                                            style={{
                                                                position: 'absolute',
                                                                bottom: -2,
                                                                left: 0,
                                                                right: 0,
                                                                height: '1px',
                                                                backgroundColor: 'currentColor',
                                                            }}
                                                        />
                                                    )}
                                                </span>
                                            ))}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}
                            sx={{ minHeight: "30vh" }}
                            display="flex" alignItems="center"
                            justifyContent="center">
                            <Box sx={{ padding: { xs: 0, sm: 0, md: 0, xl: 12 } }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <button
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            color: "gray",
                                            cursor: "pointer",
                                            zIndex: 2,
                                            position: "relative",
                                            margin: "0 1px"
                                        }}
                                        onClick={prev}>
                                        <ArrowBackIosIcon />
                                    </button>
                                    <div style={{ flexGrow: 1 }}>
                                        <Carousel
                                            infiniteLoop
                                            useKeyboardArrows
                                            autoPlay
                                            showThumbs={false}
                                            showStatus={false}
                                            showArrows={false}
                                            interval={6000}
                                            selectedItem={currentSlide}
                                            onChange={(index) => setCurrentSlide(index)}
                                            renderIndicator={renderIndicator}
                                        >
                                            {cardData.map((card, index) => (
                                                <div key={index}>
                                                    <img src={card.image} alt={card.alt} />
                                                    <br></br>
                                                    <br></br>
                                                    <Typography
                                                        variant='title_bold'>
                                                        {card.description}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <button style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "gray",
                                        cursor: "pointer",
                                        zIndex: 2,
                                        position: "relative",
                                        margin: "0 1px"
                                    }} onClick={next}>
                                        <ArrowForwardIosIcon />
                                    </button>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default AnalysisMain;
