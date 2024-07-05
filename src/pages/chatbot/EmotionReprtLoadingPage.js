import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Paper, Box, ThemeProvider, Skeleton  } from '@mui/material';
import '../../css/chatbot/EmotionReportLoadingPage.css';
import theme from "../../theme"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';


const EmotionReportLoadingPage = () => {
    const location = useLocation();
    const messages = location.state?.messages;
    const navigate = useNavigate();
    const emotionReportHandler = useCallback(async() => {
        try {
        const response = await axios.post('http://localhost:8080/emotionReport', {messages}, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const result = response.data
        navigate('/emotionReportPage', { state: { result: result }});
        } catch (error) {
        console.error('Error uploading file:', error);
        }
    }, [messages, navigate])
    useEffect(() => {
        emotionReportHandler();
      }, [emotionReportHandler]);
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
    <ThemeProvider theme={theme}>
        <Box sx={{ height: '90vh', display: 'flex', justifyContent: 'center' }}>
            <Box className="emotionPaper" sx={{ alignItems: 'center', display: 'flex', marginTop: '15px', justifyContent: 'center' }}>
                <Grid className='emotionGrid' container spacing={2} alignItems="stretch">
                    <Grid item xs={4}>
                        <Paper className="letterPaper" elevation={3} maxWidth={350} maxHeight={350}>
                            <Box className="letterBox" >
                                <Skeleton variant="rectangular" className="letterIMG" animation="wave" width={400} height={400}/>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className="reportPaper" sx={{ alignItems: 'center', display: 'flex', position: 'relative', overflow: 'auto', maxHeight:'310px', maxWidth:'700px' }} elevation={3}>
                            <Box className="reportBox" sx={{width:'90%'}}>
                                <Skeleton variant="text" width="80%" height="3rem" animation="wave"/>
                                <Skeleton variant="text" width="60%" height="3rem" animation="wave"/>
                                <Skeleton variant="text" width="90%" height="3rem" animation="wave"/>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} className='moreContent'>
                        <Card>
                            <CardHeader />
                            <Skeleton variant="rectangular" className="moreIMG" height={140} width={365} animation="wave"/>
                            <CardContent>
                                <Skeleton variant="text" width="60%" height="2rem" animation="wave"/>
                                <Skeleton variant="text" width="80%" height="1rem" animation="wave"/>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Skeleton variant="rectangular" width="40%" height="2rem" animation="wave"/>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4} className='moreContent'>
                        <Card>
                            <CardHeader />
                            <Skeleton variant="rectangular" className="moreIMG" height={140} width={365} animation="wave"/>
                            <CardContent>
                                <Skeleton variant="text" width="60%" height="2rem" animation="wave"/>
                                <Skeleton variant="text" width="80%" height="1rem" animation="wave"/>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Skeleton variant="rectangular" width="40%" height="2rem" animation="wave"/>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4} className='moreContent'>
                        <Card>
                            <CardHeader />
                            <Skeleton variant="rectangular" className="moreIMG" height={140} width={365} animation="wave" />
                            <CardContent>
                                <Skeleton variant="text" width="60%" height="2rem" animation="wave"/>
                                <Skeleton variant="text" width="80%" height="1rem" animation="wave"/>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Skeleton variant="rectangular" width="40%" height="2rem" animation="wave"/>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </ThemeProvider>
</Container>
);
};
 

export default EmotionReportLoadingPage;