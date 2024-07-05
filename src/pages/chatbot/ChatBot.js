import { Button, Box } from '@mui/material';
import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/chatbot/chatbot.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';



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
      const response = await axios.post('http://localhost:8080/chatbot', {RecentMessages, mode}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data

      messages.push("assistant : " + result)
      
      if(messages.length > 10) {
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
  
  const emotionReportHandler = async() => {
    try {
      const response = await axios.post('http://localhost:8080/emotionReport', {messages}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // eslint-disable-next-line
      const result = response.data
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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

  return (
      <Box className='grid'>
        <Box className='content'>
          <Box>
            <h2>맞장구 챗봇</h2>
          </Box>
          <Box>
            <h5>장구에게 연인에게 받은 상처를 쏟아내세요!</h5>
            <h5>채팅을 토대로 리포트를 생성하여 연인에게 나의 감정을 쉽게 전달하세요!</h5>
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
                      <h5>장구와 함께하는 감정 대화를 시작해보세요!</h5>
                      <h5>장구 모드를 클릭시 판소리로 대답합니다.</h5>
                    </Box>
                    <Box>
                      <Button variant="contained" className='nomaltype'onClick={()=>nomalModeHandler()}>일반 모드</Button>
                      <Button variant="contained"className="janggutype" onClick={()=>jangguModeHandler()}>장구 모드</Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
              <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
              )
            }
          </Box>
          <Box className="chatInput">
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 2000, borderRadius: 2}}
                
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
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
            <Button variant="contained" className='emotionButton' disabled={disabled} onClick={() => emotionReportHandler()}>감정 리포트 생성</Button>
          </Box>
        </Box>
      </Box>
  );
};

export default ChatBot;
