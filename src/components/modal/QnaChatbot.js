import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, ThemeProvider, Modal, Paper, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../../theme";
import axiosIns from '../axios';
import ReactGA from 'react-ga4';

const QnaChatbot = ({ open, onClose }) => {
  const [chat, setChat] = useState('');
  const [htmlString, setHtmlString] = useState('<img class="jangguFace" src="/images/jangguQnA.png"/><div class="jangguDiv"><Box class="janggu">얼쑤! 몇대몇 사이트에 대해 궁금한게 있다면 나에게 물어보시오!</Box></div>');
  const inputRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const chatbotTitle = 'QnA봇';
  const chatbotPlaceholder = '몇대몇에 궁금한 점을 말해주시게.';

  const chatbotHandler = async (chat) => {
    if (chat === '') return;
    setIsButtonDisabled(true); 
    setHtmlString(prevHtmlString => prevHtmlString + `<div class=userDiv><Box class="user">${chat}</Box></div>`);
    setChat('');
    try {
      const response = await axiosIns.post('http://localhost:8080/qna', { chat }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data;
      setIsButtonDisabled(false);
      setHtmlString(prevHtmlString => prevHtmlString + `<img class="jangguFace" src="/images/jangguQnA.png"/><div class="jangguDiv"><Box class="janggu">${result.replace(/\n/g, '<br>')}</Box></div>`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, isButtonDisabled]);

  useEffect(() => {
    const chatListBox = document.querySelector('.chatList_Box');
    if (chatListBox) {
      chatListBox.scrollTop = chatListBox.scrollHeight;
    }
  }, [htmlString]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        const chatInput = document.querySelector('.chatInput');
        const chatListBox = document.querySelector('.chatList_Box');
        if (chatInput && chatListBox) {
          chatListBox.style.paddingBottom = `${chatInput.offsetHeight}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleResize);
    };
  }, []);

  const handleChatSubmit = async () => {
    ReactGA.event('submit_qna', {
      event_category: 'User Actions',
      event_label: 'Submit QnA'
    });
    chatbotHandler(chat);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="qna-chatbot-modal"
        aria-describedby="qna-chatbot-modal-description"
      >
        <Box className="chatbot-modal">
          <Box className='grid' sx={{ width: '100%' }}>
            <Box className='content' sx={{ width: '100%', margin: 0, position: 'relative' }}>
              <IconButton 
                sx={{ position: 'absolute', top: 2, right: 10 }} 
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
              <Box className="QnAchat_subtitle">
                <Typography variant="title_bold">{chatbotTitle}</Typography>
              </Box>
              <Box className="chatList_Box" sx={{ height: '500px', marginTop: '10px' }}>
                <Box sx={{ marginBottom: '10px', height: '100%' }}>
                  <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
                </Box>
              </Box>
              <Grid container className="chatInput" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Grid item xs={12}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: '100%', borderRadius: 2 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, color: "gray500" }}
                      id="chat"
                      placeholder={chatbotPlaceholder}
                      value={chat}
                      className='chatInputBase'
                      disabled={isButtonDisabled}
                      inputRef={inputRef}
                      onChange={(e) => setChat(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { handleChatSubmit(); e.preventDefault(); } }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="send"
                      disabled={isButtonDisabled}
                      onClick={handleChatSubmit}
                    >
                      <SendIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default QnaChatbot;