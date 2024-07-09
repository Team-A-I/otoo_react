import { ThemeProvider, Typography, Box, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';
import ExplainAnalysis from './ExplainAnalysis';

const AnalysisMain = () => {

    const buttonData = [
        { text: 'ㄱㅏㄹㄷㅡㅇ', link: '/upload-conflict' },
        { text: 'ㅇㅜㅈㅓㅇ', link: '/upload-friendship' },
        { text: 'ㅅㅏㄹㅏㅇ', link: '/upload-love' }
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
                                        variant='h1'
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
                                <ExplainAnalysis/>
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
