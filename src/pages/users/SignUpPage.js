import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  ThemeProvider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import theme from "../../theme"

const SignUpPage = () => {
  
  const navigate = useNavigate(); 
  const [users, setUsers] = useState({
    usersEmail: '',
    usersPw: '',
    pwd1: '',
    usersName: '',
    usersGender: '',
    verificationCode: '',
    usersRole: "ROLE_USER",
    usersBan: 0,
    users_logintype: 'normal',
  });
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isVerificationCodeSent, setVerificationCodeSent] = useState(false);
  const [isAllInputCompleted, setAllInputCompleted] = useState(false);
  const [checkEmail, setCheckEmail] = useState('');
  const passwordError = users.usersPw ? !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(users.usersPw) : false;
  const helperText = users.usersPw ? (passwordError ? "비밀번호는 8~16자 영문자, 숫자, 특수문자 조합이여야 합니다." : "비밀번호를 입력하세요") : "비밀번호를 입력하세요";
  const helperText2 = users.usersPw ? (passwordError ? "비밀번호는 8~16자 영문자, 숫자, 특수문자 조합이여야 합니다." : "비밀번호를 다시 입력하세요") : "비밀번호를 다시 입력하세요";
  const visable = isPasswordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
  const visableType = isPasswordVisible ? 'password' : 'text'

  useEffect(() => {
    const { usersRole, usersBan, oAuthProvider, ...rest } = users;
    setAllInputCompleted(Object.values(rest).every(value => value));
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const sendEmailVerification = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/email/${users.usersEmail}`, {});
      setVerificationCodeSent(true);
      if (response.status === 200) {
        alert("이메일 인증 메일이 전송되었습니다.");
        setCheckEmail(response.data);
      }
    } catch (error) {
      alert(error.response?.status === 400 ? "이미 등록한 이메일이 있습니다." : "이메일 전송 오류");
      setUsers({ ...users, usersEmail: '' });
    }
  };

  const checkEmailCode = async () => {
    if (checkEmail.toString() === users.verificationCode) {
      alert("이메일 인증 성공");
    } else {
      alert("이메일 인증 실패");
      setUsers({ ...users, verificationCode: '' });
    }
  };

  const submitUserInfo = async () => {
    try {
      const response = await axios.post("http://localhost:8080/join", users);
      if (response.data.usersEmail) {
        alert("회원 가입 성공");
        navigate('/user-login');
        window.location.reload();
      } else {
        alert("회원 가입 실패");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.status === 400 ? "이미 등록된 이메일 입니다" : "회원 가입 오류");
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: 2
    }}
    >
        <ThemeProvider theme={theme}>
             <div style={{ fontFamily: theme.typography.fontFamily }}>
      <Card sx={{ maxWidth: 900, minWidth: 300, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ padding: 2 }}>
            <CardHeader title="일반 회원가입" />
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                  <TextField
                    name="usersEmail"
                    label="이메일"
                    value={users.usersEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                    helperText="이메일을 입력하세요"
                    error={Boolean(users.usersEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.usersEmail))}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button 
                    color="primary"
                    variant="contained"
                    onClick={sendEmailVerification} 
                    sx={{ marginLeft: 1, height: 56, width: 120, marginBottom:'23px' }} // Set a fixed width
                  >
                    이메일 인증
                  </Button>
                </Box>

                {isVerificationCodeSent && (
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                    <TextField
                      name="verificationCode"
                      label="인증 코드"
                      value={users.verificationCode}
                      onChange={handleChange}
                      fullWidth
                      required
                      helperText="인증 코드를 입력하세요"
                      sx={{ flexGrow: 1 }}
                    />
                    <Button 
                      color="primary" 
                      variant="contained"
                      onClick={checkEmailCode} 
                      sx={{ marginLeft: 1, height: 56, width: 120, marginBottom:'23px' }} // Set a fixed width
                    >
                      인증 확인
                    </Button>
                  </Box>
                )}

                <TextField
                  name="usersPw"
                  label="비밀번호"
                  type={visableType}
                  value={users.usersPw}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText={helperText}
                  error={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={() => setPasswordVisible(!isPasswordVisible)}
                          style={{ cursor: 'pointer' }}
                        >
                          {visable}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />

                <TextField
                  name="pwd1"
                  label="비밀번호 확인"
                  type={isPasswordVisible ? 'password' : 'text'}
                  value={users.pwd1}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText={helperText2}
                  error={Boolean(users.pwd1 && users.pwd1 !== users.usersPw)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={() => setPasswordVisible(!isPasswordVisible)}
                          style={{ cursor: 'pointer' }}
                        >
                          {visable}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />

                <TextField
                  name="usersName"
                  label="이름"
                  value={users.usersName}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="이름을 입력하세요"
                  sx={{ marginBottom: 3 }}
                />

                <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                  <InputLabel>성별</InputLabel>
                  <Select
                    name="usersGender"
                    value={users.usersGender}
                    onChange={handleChange}
                  >
                    <MenuItem value="남자">남자</MenuItem>
                    <MenuItem value="여자">여자</MenuItem>
                  </Select>
                </FormControl>

                <Button 
                  type="submit" 
                  color="primary" 
                  variant="contained" 
                  fullWidth 
                  onClick={submitUserInfo}
                  disabled={!isAllInputCompleted}
                  sx={{ height: 47 }}
                >
                  회원가입
                </Button>
              </form>
            </CardContent>
          </Grid>

          <Grid item xs={12} md={6} sx={{ padding: 2 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="title_bold" sx={{ padding: 2 }}>
                이미 회원이십니까?
              </Typography>
              <img src="/images/otooLogo.png" alt="logo" style={{ width: '100%' }} />
              <Button 
                variant="outlined" 
                color="primary" 
                href="/user-login"
              >
                로그인 페이지로 이동
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
    </ThemeProvider>
    </Box>
  );
};

export default SignUpPage;
