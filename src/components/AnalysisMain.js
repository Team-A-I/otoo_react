import { Container, ThemeProvider, Typography, Box, Button, useTheme, useMediaQuery, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';
import Carousel from 'react-material-ui-carousel';
import SwipeableTextMobileStepper from './Stepper';

const AnalysisMain = () => {
    const theme1 = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonData = [
        { text: 'ㄱㅏㄹㄷㅡㅇ', link: '/upload-conflict' },
        { text: 'ㅇㅜㅈㅓㅇ', link: '/upload-friendship' },
        { text: 'ㅅㅏㄹㅏㅇ', link: '/upload-love' }
    ];

    const cardData = [
        { image: "/otoo_react/images/톡설명1.png", alt: "talk1", description: "1:1 대화를 추출해주세요." },
        { image: "/otoo_react/images/톡설명2.png", alt: "talk2", description: "원하는 분야를 고르고 카톡txt 파일을 업로드 해주세요." }
    ];

    return (
    <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
            <Box className="container">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={10} direction="column">
                            {buttonData.map((button, index) => (
                                <Grid item key={index}>
                                    <Typography
                                        variant='hhue'
                                        sx={{
                                            mr: 2,
                                            color: theme.palette.peach,
                                            '&:hover': {
                                                color: theme.palette.lightblue,
                                            },
                                            textDecoration: 'none',
                                        }}
                                        component={Link} to={button.link}
                                    >
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
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2} direction="column" alignItems="center">
                            <Grid>
                                <SwipeableTextMobileStepper/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </ThemeProvider>
    );
};

export default AnalysisMain;
