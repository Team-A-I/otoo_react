// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Container, ThemeProvider, Grid, Typography, Paper, Button, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import theme from '../../theme';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactGA from 'react-ga4';

function UserLoginPage() {
  const navigate = useNavigate(); 
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);// eslint-disable-next-line
  const [userName, setUserName] = useState('');
  const handleNavigation = (path) => {
    ReactGA.event('navigation_click', {
      event_category: 'Navigation',
      event_label: path,
    });
    navigate(path);
  };
 

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        userEmail,
        userPassword,
      });

      if (response.status === 200) {
        ReactGA.event('login_success', {
          event_category: 'User Actions',
          event_label: 'Login Success',
        });
        sessionStorage.setItem('accessToken', response.headers.access);
        sessionStorage.setItem('refreshToken', response.headers.refresh);
        sessionStorage.setItem('usersCode', response.data.usersCode);
        sessionStorage.setItem('userName', response.data.userName);
        sessionStorage.setItem('userEmail', response.data.userEmail);
        sessionStorage.setItem('userRole', response.data.role);
        navigate('/');
        window.location.reload();
        
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.location.reload();
        alert('아이디나 비밀번호가 일치하지 않습니다.');
      } else if (error.response && error.response.status === 401) {
        window.location.reload();
        alert('아이디나 비밀번호가 일치하지 않습니다.');
      } else {
        console.error('로그인 버튼 오류:', error);
      }
      ReactGA.event('login_failed', {
        event_category: 'User Actions',
        event_label: 'Login Failed',
      });
    }
  };

  const handleSocialLogin = (url, provider) => {
    ReactGA.event('social_login_click', {
      event_category: 'Social Login',
      event_label: provider,
    });
    window.location.href = url;
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('5a7a8b2fc3e9f6c8e7fabdd16d3dda48'); // 여기에 본인의 Kakao 앱 키를 입력합니다.
    }
  }, []);

  const kakaoClick = async () => {
    try {
      window.Kakao.Auth.login({
        success: async (authObj) => {
          const accessToken = authObj.access_token;

          const response = await axios.get(
            "http://localhost:8080/kakaoLogin/" + accessToken, {
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
              }
            }
          );

          if (response.status === 200) {
            ReactGA.event('kakao_login_success', {
              event_category: 'User Actions',
              event_label: 'Kakao Login Success',
            });

            sessionStorage.setItem("accessToken", response.headers.access);
            sessionStorage.setItem("refreshToken", response.headers.refresh);
            sessionStorage.setItem("usersCode", response.data.usersCode);
            sessionStorage.setItem("userName", response.data.userName);
            sessionStorage.setItem("userEmail", response.data.userEmail);
            sessionStorage.setItem("userRole", response.data.role);
          
            navigate("/");
            window.location.reload();
          }
        },
        fail: (err) => {
          alert(err.response.data.message);
          ReactGA.event('kakao_login_failed', {
            event_category: 'User Actions',
            event_label: 'Kakao Login Failed',
          });
        },
      });
    } catch (error) {
      console.error("Error kakao login click", error);
    }
  };

  const googleClick = async () => {
    try {
      handleSocialLogin("https://accounts.google.com/o/oauth2/v2/auth?client_id=750077853896-rc6oo0md5bae842jv00ddj1agk0vvqlt.apps.googleusercontent.com&redirect_uri=https://ai.otoo.kr/googlelogin&response_type=code&scope=email profile", "Google");
    } catch (error) {
      console.error("Error google login click", error);
    }
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily, display: 'flex', justifyContent: 'center' }}>
          <Grid container sx={{ maxWidth: 425 }} display="flex" alignItems="center" justifyContent="center" style={{ height: '90vh' }}>
            <Paper sx={{ borderRadius: 5 }} elevation={4}>
              <Grid container spacing={2} justifyContent="center" padding={'30px'}>
                <Grid item xs={12}>
                  <Typography variant="hc_bold" color="gray600" align="center">몇대몇</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    id="email" 
                    label="아이디" 
                    variant="outlined" 
                    sx={{ width: '100%' }} 
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} paddingTop='5px'>
                  <TextField 
                    id="password" 
                    label="비밀번호" 
                    variant="outlined" 
                    type={isPasswordVisible ? 'password' : 'text'} 
                    sx={{ width: '100%' }} 
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleLoginClick(); e.preventDefault(); } }}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                          {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" onClick={handleLoginClick}>로그인</Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="text" onClick={() => handleNavigation('/user-signup')}>회원가입</Button>
                  <Button variant="text" onClick={() => handleNavigation("/forgetPassword")}>비밀번호 찾기</Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {/* <IconButton onClick={() => naverClick()}>
                  <img src="/images/naver.png" alt="Naver Icon" style={{ width: '24px', height: '24px' }} />
                  </IconButton> */}
                  <IconButton onClick={() => googleClick()}>
                    <GoogleIcon />
                  </IconButton>
                  <IconButton onClick={() => kakaoClick()}>
                    <img src="/images/kakao.png" alt="Kakao Icon" style={{ width: '24px', height: '24px' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default UserLoginPage;
