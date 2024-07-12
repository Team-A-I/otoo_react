import { Container, Box, ThemeProvider, IconButton, Modal, TextField, Alert, AlertTitle, useMediaQuery } from '@mui/material';
import '../css/chatbot/EmotionReportPage.css';
import React, { useState, useEffect, useRef } from 'react';
import theme from "../theme";
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from 'axios';

const TEXTS = {
  modalTitle: '결과가 만족스러우신가요?',
  modalDescription: '테스트를 평가해주세요!',
  feedbackPlaceholder: '의견을 남겨주세요!',
};

const FeedbackModal = () => {
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

export default FeedbackModal;