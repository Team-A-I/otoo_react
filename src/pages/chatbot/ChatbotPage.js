import { Grid, Button, Typography, Box, Tooltip, ThemeProvider, Paper, InputBase, IconButton } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import theme from "../../theme";
import axiosIns from '../../components/axios';
import '../../css/chatbot/ChatbotPage.css';

const ChatBot = () => {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [htmlString, setHtmlString] = useState('');
  const [RecentMessages, setRecentMessages] = useState([]);
  const [mode, setMode] = useState('0');
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const chatbotTitle = '맞장구 챗봇';
  const chatbotSubtitle1 = '연인에게 받은 상처를 쏟아내세요.';
  const chatbotSubtitle2 = '장구가 당신의 이야기에 맞장구를 쳐줄게요.';
  const chatbotPlaceholder = '서운했던 이야기를 들려주세요.';
  const chatbotTooltipText = '채팅을 바탕으로 장구가 조언을 해줍니다.';
  const chatbotEmotionReportButtonText = '감정 리포트 생성';
  const chatbotStartText1 = '장구와 함께하는 감정 대화를 시작해보세요.';
  const chatbotStartText2 = '장구 모드를 클릭시 판소리로 대답합니다.';
  const chatbotNomalModeButtonText = '일반 모드';
  const chatbotJangguModeButtonText = '장구 모드';

  const chatbotHandler = async (chat) => {
    if(chat === '') return;
    setIsButtonDisabled(true); 
    if (mode === '0') {
      setMode('1');
    }

    setMessages([...messages, "user : " + chat]);

    if (RecentMessages.length > 10) {
      setRecentMessages(RecentMessages.slice(1));
    }
    setRecentMessages([...RecentMessages, "user : " + chat]);

    setHtmlString(prevHtmlString => prevHtmlString + `<div class=userDiv><Box class="user">${chat}</Box></div>`);

    setChat('');

    try {
      const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/chatbot', { RecentMessages, mode }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data;
      setIsButtonDisabled(false);
    
      setMessages([...messages, "assistant : " + result]);

      if (messages.length > 6) {
        setDisabled(false);
      }

      if (RecentMessages.length > 10) {
        setRecentMessages(RecentMessages.slice(1));
      }
      setRecentMessages([...RecentMessages, "assistant : " + result]);
      setHtmlString(prevHtmlString => prevHtmlString + `<div class="jangguDiv"><Box class="janggu">${result}</Box></div>`);
      inputRef.current.focus();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const emotionReportHandler = () => {
    navigate('/emotionReportLoadingPage', { state: { messages } });
  };

  const jangguModeHandler = () => {
    setMode('2');
    inputRef.current.focus();
  };
  const nomalModeHandler = () => {
    setMode('1');
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!isButtonDisabled) {
      inputRef.current.focus();
    }
  }, [isButtonDisabled]); 

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const chatListBox = document.querySelector('.chatList_Box');
    if (chatListBox) {
      chatListBox.scrollTop = chatListBox.scrollHeight;
    }
  }, [htmlString]);

  return (
    <Box className='grid'>
      <ThemeProvider theme={theme}>
        <Box className='content'>
          <Box className="chat_subtitle">
            <Typography variant="title_bold" color="gray600">{chatbotTitle}</Typography>
          </Box>
          <Box className="chat_subtitle">
            <Typography variant="sub_mid" color="gray500">{chatbotSubtitle1}</Typography>
          </Box>
          <Box className="chat_subtitle">
            <Typography variant="sub_mid" color="gray500">{chatbotSubtitle2}</Typography>
          </Box>
          <Box className="chatList_Box">
            {
              RecentMessages.length === 0 && mode === '0' ? (
                <Box className="startBox">
                  <Box className="startBoxItem">
                    <Box className="jangguIMG_Box">
                      <img className="jangguIMG" src="/images/janggu.png" alt='janggu' />
                    </Box>
                    <Box className="modeExplain">
                      <Box>
                        <Typography variant="body1">{chatbotStartText1}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body1">{chatbotStartText2}</Typography>
                      </Box>
                    </Box>
                    <Box className="modeSelect">
                      <Button variant="contained" className='nomaltype' onClick={nomalModeHandler}>{chatbotNomalModeButtonText}</Button>
                      <Button variant="contained" className="janggutype" onClick={jangguModeHandler}>{chatbotJangguModeButtonText}</Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ marginBottom: '10px' }}>
                  <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
                  <Box sx={{ position: 'relative' }}>
                    <Tooltip title={chatbotTooltipText} arrow placement="top">
                      <Button
                        variant="contained"
                        className='emotionButton bounce'
                        style={{ display: disabled ? 'none' : 'inline-block', position: 'absolute', right: 10, bottom: 10 }}
                        onClick={emotionReportHandler}
                      >
                        {chatbotEmotionReportButtonText}
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              )
            }
          </Box>
          <Grid container className="chatInput" direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Grid item xs={12} >
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
                  onKeyDown={(e) => { if (e.key === 'Enter') { chatbotHandler(chat); e.preventDefault(); } }}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="send"
                  disabled={isButtonDisabled}
                  onClick={async () => {
                    chatbotHandler(chat);
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={2} className="tooltipable">
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default ChatBot;
