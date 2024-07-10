import { Container, Grid, Paper, Box, ThemeProvider, Typography, IconButton, Modal, TextField, Alert, AlertTitle, useMediaQuery } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import '../../css/chatbot/EmotionReportPage.css';
import React, { useState, useEffect, useRef } from 'react';
import theme from "../../theme";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from 'axios';

const TEXTS = {
  clipboardSuccess: '클립보드에 복사되었습니다:',
  clipboardFailure: '클립보드 복사에 실패했습니다:',
  modalTitle: '결과가 만족스러우신가요?',
  modalDescription: '테스트를 평가해주세요!',
  feedbackPlaceholder: '의견을 남겨주세요!',
  card1Title: '갈등',
  card1Description1: '갈등이 해소되지 않았나요?',
  card1Description2:'누가 더 잘못했는지 알아보세요!',
  card2Title: '우정',
  card2Description1: '친구와의 관계가 궁금하신가요?',
  card2Description2: '우정의 깊이를 알아보세요!',
  card3Title: '사랑',
  card3Description1: '연인이 아직도 날 사랑하는지 궁금하신가요?',
  card3Description2: '누가 더 사랑하는지 알아보세요!',
  buttonLabel: '알아보러가기'
};

const EmotionReportPage = () => {
  const location = useLocation();
  const result = location.state?.result;
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      console.log(TEXTS.clipboardSuccess, result);
    }).catch(err => {
      console.error(TEXTS.clipboardFailure, err);
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [feedbackLike, setFeedback_like] = useState(0);
  const [feedbackDislike, setFeedback_dislike] = useState(0);
  const [feedbackType] = useState('report');
  const [feedbackNote, setFeedback_note] = useState('');
  const buttonRef = useRef(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '80%' : '25%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
  };

  const handleLike = () => {
    setLike(!like);
    if (dislike) setDislike(false);
    setFeedback_like(1);
    setFeedback_dislike(0);
  };

  const handleDislike = () => {
    setDislike(!dislike);
    if (like) setLike(false);
    setFeedback_like(0);
    setFeedback_dislike(1);
  };

  const handleTextFieldChange = (e) => {
    setFeedback_note(e.target.value);
  };

  const handleFeedback = async () => {
    const feedback = { feedbackLike, feedbackDislike, feedbackType, feedbackNote };
    try {
      await axios.post('http://localhost:8080/feedback', feedback, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily}}>
       
          <Box className="emotionPaper">
            <Paper className="letterPaper" elevation={3} sx={{maxHeight:'35vh', marginBottom:'50px',position:'relative'}}>
            <Grid className='emotionGrid' container spacing={2} >
              <Grid item xs={4} className='emotionGridItem'sx={{display : isSmallScreen ? 'none':'flex'}}>
                  <Box className="letterBox" sx={{maxHeight:'30vh'}}>
                    <img className="letterIMG" src="/otoo_react/images/letterIMG.jpg" alt='letterIMG' />
                  </Box>
              </Grid>
              <Grid item xs={7} className='emotionGridItem' >
                <Box className="reportTextBox"sx={{overflowY: 'scroll', height:'30vh'}}>
                <Typography variant="title_bold" color="gray500">{result}</Typography>
                </Box>
                <IconButton type="button" aria-label="ContentCopy" onClick={copyToClipboard} sx={{ position: 'absolute', right: 0, bottom: 0 }}>
                    <ContentCopyIcon sx={{ fontSize: '2vh' }}/>
                </IconButton>  
              </Grid>
            </Grid>
            </Paper>
                <Grid container spacing={2} alignItems="stretch" sx={{display:'flex'}}>
              <Grid item xs={4} className='moreContent'
                onMouseEnter={() => setHover1(true)}
                onMouseLeave={() => setHover1(false)}
              >
                <Card sx={{ maxWidth: 400 }}>
                  <CardHeader />
                  <CardMedia
                    className="moreIMG"
                    sx={{ height: 140, opacity: hover1 ? 1 : 0.7 }}
                    image="/otoo_react/images/emotionfight.webp"
                    title="emotionfight"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                      {TEXTS.card1Title}
                    </Typography>
                    <Typography variant="body2" fontSize={'0.7vw'} color="gray500">
                      {TEXTS.card1Description1}<br/> {TEXTS.card1Description2}
                    </Typography>
                  </CardContent>
                  <CardActions  sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button size="small" component={Link} to="/upload-conflict">{TEXTS.buttonLabel}</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4} className='moreContent'
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
              >
                <Card sx={{ maxWidth: 400 }}>
                  <CardHeader />
                  <CardMedia
                    className="moreIMG"
                    sx={{ height: 140, opacity: hover2 ? 1 : 0.7 }}
                    image="/otoo_react/images/emotionfriendship.webp"
                    title="emotionfriendship"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                      {TEXTS.card2Title}
                    </Typography>
                    <Typography variant="body2" fontSize={'0.7vw'} color="gray500">
                      {TEXTS.card2Description1}<br/> {TEXTS.card2Description2}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button size="small" component={Link} to="/UploadFriendship">{TEXTS.buttonLabel}</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4} className='moreContent'
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => setHover3(false)}
              >
                <Card>
                  <CardHeader />
                  <CardMedia
                    className="moreIMG"
                    sx={{ height: 140, opacity: hover3 ? 1 : 0.7 }}
                    image="/otoo_react/images/emotionlove.webp"
                    title="emotionlove"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h2_bold" color="gray500" fontSize={'1vw'} component="div">
                      {TEXTS.card3Title}
                    </Typography>
                    <Typography variant="body2" fontSize={'0.7vw'} color="gray500">
                      {TEXTS.card3Description1} <br/> {TEXTS.card3Description2}
                    </Typography>
                  </CardContent>
                  <CardActions  sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button size="small" component={Link} to="/upload-love">{TEXTS.buttonLabel}</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Button ref={buttonRef} onClick={handleOpen} sx={{ display: 'none' }}>Open modal</Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Alert severity="info">
                <AlertTitle>{TEXTS.modalTitle}</AlertTitle>
                {TEXTS.modalDescription}
              </Alert>
              <Box sx={{ alignContent: "center", height: isSmallScreen ? '100px' : '150px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton color={like ? "primary" : "default"} onClick={handleLike}>
                    <ThumbUpOffAltIcon sx={{ fontSize: isSmallScreen ? 50 : 70 }} />
                  </IconButton>
                  <Box sx={{ width: isSmallScreen ? '50px' : '150px', }} />
                  <IconButton color={dislike ? "primary" : "default"} onClick={handleDislike}>
                    <ThumbDownOffAltIcon sx={{ fontSize: isSmallScreen ? 50 : 70 }} />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={3}
                  placeholder={TEXTS.feedbackPlaceholder}
                  sx={{ width: '100%', mt: isSmallScreen ? 2 : 3 }}
                  onChange={handleTextFieldChange}
                />
                <Button
                  variant="contained"
                  sx={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    m: 1,
                  }}
                  onClick={handleFeedback}
                >
                  제출
                </Button>
              </Box>
            </Box>
          </Modal>
      </div>
      </ThemeProvider>
    </Container>
  );
};

export default EmotionReportPage;