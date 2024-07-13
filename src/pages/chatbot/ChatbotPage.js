import { Grid, Button, Typography, Box, Tooltip, ThemeProvider } from '@mui/material';
import React, { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/chatbot/ChatbotPage.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import theme from "../../theme"



const ChatBot = () => {
  // 채팅창에 입력한 문자열
  const [chat, setChat] = useState('')
  // 채팅창에 표시할 메시지 목록
  const [messages] = React.useState([]);
  // 채팅창에 표시할 HTML 문자열
  const [htmlString, setHtmlString] = useState("");
  // 최근 10개 메시지 목록
  const [RecentMessages] = React.useState([]);
  // 대화 모드 (0: 대화 시작 전, 1: 일반 대화 모드, 2: 장구 대화 모드)
  const [mode, setMode] = React.useState('0');
  // 커서를 input에 포커스하기 위한 ref
  const inputRef = useRef(null);
  // 리포트 생성 버튼 활성화 여부
  const [disabled, setDisabled] = React.useState(true);
  // Tooltip 표시 여부
  const [showTooltip, setShowTooltip] = useState(true);
  const navigate = useNavigate();
  
  // 챗봇 대화 로직
  const chatbotHandler = async(chat) => {
    if(mode === '0'){
      setMode('1')
    }
    
    messages.push("user : " + chat)

    if(RecentMessages.length > 10) {
      RecentMessages.shift()
    }
    RecentMessages.push("user : " + chat)

    setHtmlString(prevHtmlString => prevHtmlString + `<div class=userDiv><Box class="user">${chat}</Box></div>`);
    
    setChat('')
    
    try {
      const response = await axios.post('https://restapi.otoo.kr/chatbot', {RecentMessages, mode}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data

      messages.push("assistant : " + result)
      
      if(messages.length > 6) {
        setDisabled(false);
      }
      
      if(RecentMessages.length > 10) {
        RecentMessages.shift()
      }
      RecentMessages.push("assistant : " + result)
      setHtmlString(prevHtmlString => prevHtmlString + `<div class="jangguDiv"><Box class="janggu">${result}</Box></div>`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const emotionReportHandler = () => {
    navigate('/emotionReportLoadingPage', { state: { messages } }); 
  }

  // 장구 모드 선택
  const jangguModeHandler = () => {
    setMode('2')
    inputRef.current.focus();
  }
  const nomalModeHandler = () => {
    setMode('1')
    inputRef.current.focus();
  }

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
  
  // disabled가 변경될 때마다 Tooltip을 표시
  useEffect(() => {
    setShowTooltip(disabled);
  }, [disabled]);
  return (
      <Box className='grid'>
        <ThemeProvider theme={theme}>
          <Box className='content'>
            <Box>
              <Typography variant="title_bold" color="gray600">맞장구 챗봇</Typography>
            </Box>
            <Box className="chat_subtitle">
              <Typography variant="sub_mid" color="gray500">장구에게 연인에게 받은 상처를 쏟아내세요!</Typography>
            </Box>
            <Box>
              <Typography variant="sub_mid" color="gray500">채팅을 토대로 리포트를 생성하여 연인에게 나의 감정을 쉽게 전달하세요!</Typography>
            </Box>
            <Box className="chatList_Box">
              {
                RecentMessages.length === 0 && mode === '0'? (
                  <Box className="startBox">
                    <Box className="startBoxItem">
                      <Box className="jangguIMG_Box">
                        <img className="jangguIMG" src="/otoo_react/images/janggu.png" alt='janggu'/>
                      </Box>
                      <Box className="modeExplain">
                        <Box>
                          <Typography variant="body1">장구와 함께하는 감정 대화를 시작해보세요!</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">장구 모드를 클릭시 판소리로 대답합니다.</Typography>
                        </Box>
                      </Box>
                      <Box className="modeSelect">
                        <Button variant="contained" className='nomaltype' onClick={()=>nomalModeHandler()}>일반 모드</Button>
                        <Button variant="contained"className="janggutype" onClick={()=>jangguModeHandler()}>장구 모드</Button>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
                )
              }
            </Box>
            <Grid className="chatInput">
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 2000, borderRadius: 2}}
                  
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, color:"gray500" }}
                  id="chat"
                  placeholder="서운했던 이야기를 들려주세요."
                  value={chat}
                  className='chatInputBase'
                  inputRef={inputRef}
                  onChange={(e) => setChat(e.target.value)}  
                  onKeyDown={(e) => {if (e.key === 'Enter') {chatbotHandler(chat);e.preventDefault();}}}
                />
                <IconButton 
                  type="button" 
                  sx={{ p: '10px' }} 
                  aria-label="send"
                  onClick={() => chatbotHandler(chat)}
                  >
                  <SendIcon /> 
                </IconButton>
              </Paper>
              {showTooltip ? (
                <Tooltip title="일정 대화 진행 후에 감정 리포트 생성이 가능합니다." arrow placement="top">
                  <Box className="tooltipable">
                    <Button
                      variant="contained"
                      className='emotionButton'
                      disabled={disabled}
                      onClick={() => emotionReportHandler()}
                    >
                      감정 리포트 생성
                    </Button>
                  </Box>
                </Tooltip>
              ) : (
                <Box className="tooltipable">
                  <Button
                    variant="contained"
                    className='emotionButton'
                    disabled={disabled}
                    onClick={() => emotionReportHandler()}
                  >
                    감정 리포트 생성
                  </Button>
                </Box>
              )}
            </Grid>
          </Box>
        </ThemeProvider>
      </Box>
  );
};

export default ChatBot;
