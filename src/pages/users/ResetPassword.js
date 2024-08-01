import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  ThemeProvider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from "../../theme"

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const ChangePwdClick = async () => {
    try {
      // URLSearchParams를 사용하여 URL에서 usersEmail 파라미터를 추출합니다.
      const usersEmail = location.state?.usersEmail;

      if (password === confirmPassword) {
        const response = await axios.post('http://localhost:8080/changePwd', {
          usersEmail: usersEmail,
          usersPw: password,
          pwd1: confirmPassword,
        });

        if (response.status === 200) {
          window.location.reload();
          alert('비밀번호 재설정 완료');
          navigate('/user-login');
        }
      } else {
        window.location.reload();
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
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
                비밀번호 재설정
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  fullWidth
                  margin="normal"
                  label="비밀번호"
                  variant="outlined"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="비밀번호 확인"
                  variant="outlined"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={ChangePwdClick}
                  style={{ marginTop: '16px' }}
                >
                  변경하기
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/user-login')}
                  style={{ marginTop: '16px' }}
                >
                  로그인 페이지로 돌아가기
                </Button>
              </form>
            </CardContent>
          </Grid>
          <Grid item md={6} style={{ display: { xs: 'none', md: 'block' } }}>
            <CardMedia
              component="img"
              alt="Forgot Password"
              image="/images/otooLogo.png"
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

export default ResetPassword;
