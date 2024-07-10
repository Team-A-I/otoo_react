import { Container, Grid, Paper, Box, ThemeProvider, Typography, IconButton } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import '../../css/chatbot/EmotionReportPage.css';
import React, { useState } from 'react';
import theme from "../../theme"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';



const EmotionReportPage = () => {
    const location = useLocation();
    const result = location.state?.result;
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result).then(() => {
            console.log('클립보드에 복사되었습니다:', result);
        }).catch(err => {
          console.error('클립보드 복사에 실패했습니다:', err);
        });
      };
 
   

    
  return (
    <Container sx={{  display:'flex', justifyContent:'center'}}>
        <ThemeProvider theme={theme}>
            <Box sx={{ height: '90vh' , display:'flex', justifyContent:'center'}}>
                <Box className="emotionPaper" sx={{alignItems:'center', display:'flex', marginTop:'15px',justifyContent:'center'}}>
                    <Grid className='emotionGrid'container spacing={2} alignItems="stretch">
                        <Grid item xs={4}>
                            <Paper className="letterPaper" elevation={3}>
                                <Box className="letterBox">
                                    <img className="letterIMG" src="/otoo_react/images/letterIMG.jpg" alt='letterIMG'/>   
                                </Box>                            
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper className="reportPaper" sx={{alignItems:'center', display:'flex', position: 'relative'}} elevation={3}>
                                <Box className="reportBox">
                                    <Typography variant="title_bold" color="gray500" fontSize={'1vw'}>{result}</Typography>
                                </Box>
                                <IconButton 
                                type="button" 
                                sx={{ p: '10px',
                                    position: 'absolute',
                                    right: 0, 
                                    bottom: 0,  
                                }} 
                                aria-label="ContentCopy"
                                onClick={() => copyToClipboard()}
                                >
                                <ContentCopyIcon /> 
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} className='moreContent'
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                            >
                            <Card sx={{ maxWidth: 400 }}>
                                <CardHeader/>
                                <CardMedia
                                    className="moreIMG"
                                    sx={{ height: 140, opacity: hover1 ? 1 : 0.7  }}
                                    image="/otoo_react/images/emotionfight.webp"
                                    title="emotionfight"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                                    갈등
                                    </Typography>
                                    <Typography variant="body2" fontSize={'0.7vw'}color="gray500">
                                    갈등이 해소되지 않았나요?<br/>
                                    누가 더 잘못했는지 알아보세요!
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display:'flex', justifyContent:'right'}}>
                                    <Button size="small" component={Link} to="/upload-conflict">알아보러가기</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} className='moreContent'
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}
                        >
                            <Card sx={{ maxWidth: 400 }}>
                                <CardHeader/>
                                <CardMedia
                                    className="moreIMG"
                                    sx={{ height: 140, opacity: hover2 ? 1 : 0.7  }}
                                    image="/otoo_react/images/emotionfriendship.webp"
                                    title="emotionfriendship"
                                    
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'}component="div">
                                    우정
                                    </Typography>
                                    <Typography variant="body2" fontSize={'0.7vw'}color="gray500">
                                    친구와의 관계가 궁금하신가요? <br/>
                                    우정의 깊이를 알아보세요!
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display:'flex', justifyContent:'right'}}>
                                    <Button size="small" component={Link} to="/UploadFriendship">알아보러가기</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} className='moreContent'
                            onMouseEnter={() => setHover3(true)}
                            onMouseLeave={() => setHover3(false)}
                            >
                            <Card sx={{ maxWidth: 400 }}>
                                <CardHeader/>
                                <CardMedia
                                    className="moreIMG"
                                    sx={{ height: 140 ,opacity: hover3 ? 1 : 0.7 }}
                                    image="/otoo_react/images/emotionlove.webp"
                                    title="emotionlove"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                                    사랑
                                    </Typography>
                                    <Typography variant="body2" fontSize={'0.7vw'}color="gray500">
                                    연인이 아직도 날 사랑하는지 궁금하신가요?<br/>
                                    누가 더 사랑하는지 알아보세요!
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display:'flex', justifyContent:'right'}}>
                                    <Button size="small" component={Link} to="/upload-love">알아보러가기</Button>
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

export default EmotionReportPage;