import { Grid,  Typography, Box,  ThemeProvider } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/chatbot/ChatbotPage.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import theme from "../../theme"
import axiosIns from '../../components/axios';



const QnaChatbot = () => {
  // 채팅창에 입력한 문자열
  const [chat, setChat] = useState('');
  
  // 채팅창에 표시할 HTML 문자열
  const [htmlString, setHtmlString] = useState('<div class="jangguDiv"><Box class="janggu">얼쑤! 몇대몇 사이트에 대해 궁금한게 있다면 나에게 물어보시오!</Box></div>');
  const inputRef = useRef(null);
  // 리포트 생성 버튼 활성화 여부
  // eslint-disable-next-line
  const [disabled, setDisabled] = useState(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);// eslint-disable-next-line
  const navigate = useNavigate();

  // Localized text values
  const chatbotTitle = 'QnA 챗봇';
  const chatbotSubtitle1 = '몇대몇 사이트 이용 방법을 질문하세요.';
  const chatbotSubtitle2 = '장구가 이용 방법을 알려드립니다.';
  const chatbotPlaceholder = '몇대몇에 궁금한 점을 말해주시게.';

  // 챗봇 대화 로직
  const chatbotHandler = async (chat) => {
    if(chat === '') return;
    setIsButtonDisabled(true); 

    setHtmlString(prevHtmlString => prevHtmlString + `<div class=userDiv><Box class="user">${chat}</Box></div>`);

    setChat('');

    try {

      const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/qna', { chat }, {

        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data;
      setIsButtonDisabled(false);
      setHtmlString(prevHtmlString => prevHtmlString + `<div class="jangguDiv"><Box class="janggu">${result.replace(/\n/g, '<br>')}</Box></div>`);
      inputRef.current.focus();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
                <Box sx={{marginBottom:'10px',height:'100%'}}>
                
                <Box className="chatList" dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
                  
                </Box>
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
          </Grid>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default QnaChatbot;
