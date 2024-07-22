import { Grid, Button, Typography, Box, Tooltip, ThemeProvider } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/chatbot/ChatbotPage.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import theme from "../../theme"
import axiosIns from '../../components/axios';



const ChatBot = () => {
  // 채팅창에 입력한 문자열
  const [chat, setChat] = useState('');
  // 채팅창에 표시할 메시지 목록
  const [messages] = useState([]);
  // 채팅창에 표시할 HTML 문자열
  const [htmlString, setHtmlString] = useState('');
  // 최근 10개 메시지 목록
  const [RecentMessages] = useState([]);
  // 대화 모드 (0: 대화 시작 전, 1: 일반 대화 모드, 2: 장구 대화 모드)
  const [mode, setMode] = useState('0');
  // 커서를 input에 포커스하기 위한 ref
  const inputRef = useRef(null);
  // 리포트 생성 버튼 활성화 여부
  const [disabled, setDisabled] = useState(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  // Localized text values
  const chatbotTitle = '맞장구봇';
  const chatbotSubtitle1 = '연인에게 받은 상처를 쏟아내세요.';
  const chatbotSubtitle2 = '장구가 당신의 이야기에 맞장구를 쳐줄게요.';
  const chatbotPlaceholder = '서운했던 이야기를 들려주세요.';
  const chatbotTooltipText = '채팅을 바탕으로 장구가 조언을 해줍니다.';
  const chatbotEmotionReportButtonText = '감정 리포트 생성';
  const chatbotStartText1 = '장구와 함께하는 감정 대화를 시작해보세요.';
  const chatbotStartText2 = '장구 모드를 클릭시 판소리로 대답합니다.';
  const chatbotNomalModeButtonText = '일반 모드';
  const chatbotJangguModeButtonText = '장구 모드';

  // 챗봇 대화 로직
  const chatbotHandler = async (chat) => {
    if(chat === '') return;
    setIsButtonDisabled(true); 
    if (mode === '0') {
      setMode('1');
    }

    messages.push("user : " + chat);

    if (RecentMessages.length > 10) {
      RecentMessages.shift();
    }
    RecentMessages.push("user : " + chat);

    setHtmlString(prevHtmlString => prevHtmlString + `<div class=userDiv><Box class="user">${chat}</Box></div>`);

    setChat('');

    try {

      const response = await axiosIns.post('http://localhost:8080/chatbot', { RecentMessages, mode }, {

        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data;
      setIsButtonDisabled(false);
    
      messages.push("assistant : " + result);

      if (messages.length > 6) {
        setDisabled(false);
      }

      if (RecentMessages.length > 10) {
        RecentMessages.shift();
      }
      RecentMessages.push("assistant : " + result);
      setHtmlString(prevHtmlString => prevHtmlString + `<div class="jangguDiv"><Box class="janggu">${result}</Box></div>`);
      inputRef.current.focus();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const emotionReportHandler = () => {
     navigate('/emotionReportLoadingPage', { state: { messages } });
  };

  // 장구 모드 선택
  const jangguModeHandler = () => {
    setMode('2');
    inputRef.current.focus();
  };
  const nomalModeHandler = () => {
    setMode('1');
    inputRef.current.focus();
  };
  useEffect(() => {
    // 2. isButtonDisabled 상태 변화 감지
    if (!isButtonDisabled) {
      // 3. isButtonDisabled가 false가 되면 입력 필드에 포커스 설정
      inputRef.current.focus();
    }
  }, [isButtonDisabled]); 

  // 컴포넌트가 마운트되면 input에 포커스 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 채팅창 스크롤 자동으로 내리기
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
                      <Button variant="contained" className='nomaltype' onClick={() => nomalModeHandler()}>{chatbotNomalModeButtonText}</Button>
                      <Button variant="contained" className="janggutype" onClick={() => jangguModeHandler()}>{chatbotJangguModeButtonText}</Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                
                <Box sx={{marginBottom:'10px',height:'100%'}}>
                
                <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
                  <Box sx={{position:'relative'}}>
                    <Tooltip title={chatbotTooltipText} arrow placement="top">
                    <Button
                      variant="contained"
                      className='emotionButton bounce'
                      style={{ display: disabled ? 'none' : 'inline-block' }} // 조건부 스타일 적용
                      onClick={() => emotionReportHandler()}
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
