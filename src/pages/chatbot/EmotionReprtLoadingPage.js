import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, ThemeProvider, Box, Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActions, Paper, IconButton, Skeleton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../../css/chatbot/EmotionReportLoadingPage.css';
import theme from "../../theme"



const EmotionReportLoadingPage = () => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const messages = location.state?.messages;
    const navigate = useNavigate();
    const usersCode = sessionStorage.getItem('usersCode');
    const emotionReportHandler = useCallback(async() => {
        try {
            const requestBody = usersCode ? { messages, usersCode } : { messages };
            const response = await axios.post('http://localhost:8080/emotionReport', requestBody, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const result = response.data
            navigate('/emotionReportPage', { state: { result: result }});
            } catch (error) {
            console.error('Error uploading file:', error);
        }
    }, [messages, navigate, usersCode])
    useEffect(() => {
        emotionReportHandler();
      }, [emotionReportHandler]);
  return (
    <Container sx={{ display: 'flex', marginTop:"35px", justifyContent:'center'}}>
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box className="reportLoading_emotionPaper">
            <Paper className="reportLoading_letterPaper" elevation={3} sx={{ maxHeight: '35vh', marginBottom: '50px', position: 'relative', minWidth:'125vh'}}>
              <Grid className='reportLoading_emotionGrid' container spacing={2}>
                <Grid item xs={4} className='reportLoading_emotionGridItem' sx={{ display: isSmallScreen ? 'none' : 'flex' }}>
                  <Box className="reportLoading_letterBox" sx={{ maxHeight: '30vh', overflow:"hidden" }}>
                    <Skeleton variant="rectangular" width="800px" height="800px" />
                  </Box>
                </Grid>
                <Grid item xs={7} className='reportLoading_emotionGridItem'>
                  <Box className="reportLoading_reportTextBox" sx={{ height: '30vh' }}>
                    <Typography variant="title_bold" color="gray500" fontSize={'1vw'}>
                      <Skeleton />
                    </Typography>
                    <Typography variant="title_bold" color="gray500" fontSize={'1vw'}>
                      <Skeleton />
                    </Typography>
                    <Typography variant="title_bold" color="gray500" fontSize={'1vw'}>
                      <Skeleton />
                    </Typography>
                  </Box>
                  <IconButton type="button" aria-label="ContentCopy" sx={{ position: 'absolute', right: 0, bottom: 0 }}>
                    <ContentCopyIcon sx={{ fontSize: '2vh' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
            <Grid container spacing={2} alignItems="stretch" sx={{ display: 'flex', marginTop:'40px' }}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={4} className='reportLoading_moreContent' key={index}>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardHeader />
                    <CardMedia
                      className="reportLoading_moreIMG"
                      sx={{ height: 140, opacity: 0.7 }}
                      children={<Skeleton variant="rectangular" width="100%" height="100%" />}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                        <Skeleton />
                      </Typography>
                      <Typography variant="body2" fontSize={'0.7vw'} color="gray500">
                        <Skeleton />
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                      <Skeleton variant="rectangular" width={80} height={30} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

 

export default EmotionReportLoadingPage;