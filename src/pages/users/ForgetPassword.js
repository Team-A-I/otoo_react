import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
  ThemeProvider
} from '@mui/material';
import theme from "../../theme"

const ForgetPassword = () => {
  const [usersEmail, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [checkEmail, setCheckEmail] = useState('');
  const navigate = useNavigate(); 

  const forgetPasswordMessage = "비밀번호를 잊으셨나요?";
  const emailInputMessage = "이메일을 입력하세요";
  const emailAuthMessage = "이메일 인증";
  const authenticationMessage = "인증 확인";
  const comebackLogin = "로그인 페이지로 돌아가기";

  const sendEmailVerification = async () => {
    try {
      const response = await axios.post(
        `https://ra.otoo.kr/forgotpassword/${usersEmail}`
      );
      if (response.status === 200) {
        window.location.reload();
        alert('이메일 인증 메일이 전송되었습니다.');
        setCheckEmail(response.data);
        setIsVerificationCodeSent(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.location.reload();
        alert('이미 등록한 이메일이 있습니다.');
        setEmail('');
      } else {
        console.error('Error sending email verification:', error);
        window.location.reload();
        alert('이메일 전송 오류');
        setEmail('');
      }
    }
  };

  
  const checkEmailCode = async () => {
    if (checkEmail.toString() === verificationCode) {
      window.location.reload();
      alert("이메일 인증 성공");
      navigate('/resetPassword', {state: { usersEmail: usersEmail }} );
    } else {
      window.location.reload();
      alert("이메일 인증 실패");
      setVerificationCode('');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
         <ThemeProvider theme={theme}>
         <div style={{ fontFamily: theme.typography.fontFamily }}>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6} style={{ padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {forgetPasswordMessage}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {emailInputMessage}
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  value={usersEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={sendEmailVerification}
                  style={{ marginTop: '16px' }}
                >
                  {emailAuthMessage}
                </Button>
                {isVerificationCodeSent && (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="인증 코드"
                      variant="outlined"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={checkEmailCode}
                      style={{ marginTop: '16px' }}
                    >
                      {authenticationMessage}
                    </Button>
                  </>
                )}
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={()=>{navigate('/user-login')}}
                  style={{ marginTop: '16px' }}
                >
                  {comebackLogin}
                </Button>
              </form>
            </CardContent>
          </Grid>
          <Grid item md={6} style={{ display: { xs: 'none', md: 'block' } }}>
            <CardMedia
              component="img"
              image="/images/otooLogo.png"
              alt="Forgot Password"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Grid>
        </Grid>
      </Card>
        </div>
        </ThemeProvider>
    </Container>
  );
};

export default ForgetPassword;
