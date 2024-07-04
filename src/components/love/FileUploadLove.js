import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, Container, TextField, Typography, Box, Grid, ThemeProvider} from '@mui/material';
import '../../css/uploadlove.css';
import theme from '../../theme';

const FileUploadLove = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
      fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!file) {
          return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
          const content = e.target.result;
          const userId = "example_user_id"; // 실제 사용자 ID를 여기에 넣어야 합니다.
          const data = {
              user_id: userId,
              content: content
          };
          console.log("data",data)

          try {
              navigate('/loading-love');
              const response = await axios.post('http://localhost:8080/upload', data, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              console.log("response", response)
              console.log("response.data", response.data)
              navigate('/result-love', { state: { result: response.data } });
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      };
      reader.readAsText(file);
  };

  return (
      <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
        <Box className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}container
          alignItems="center">
            <Typography variant="hbig"
            color="lightpurple" className="lovemain-text">
              누가 더{'\n'}좋아해?{'\n'}묻지{'\n'}마세요.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader/>
            <CardMedia
              component="img"
              height="300"
              image="/otoo_react/images/lovemain.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="h3_mid" color="text.secondary">
                상대방과 나눈 간지러운 대화를 넣어주세요.<br/> 누가 더 좋아하는지 저희가 판단해드릴게요.<br/> 판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요. 지금 무슨 생각을 하고 있을까요?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className="button-container">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button variant="contained"
              component="span" 
              size="medium"
              sx={{ 
                mr: 2, 
                backgroundColor: theme.palette.lightpurple, 
                color: theme.palette.gray700,
                '&:hover': {
                  backgroundColor: theme.palette.peach, // 호버 시 배경색 변경
                }
              }}
              onClick={handleButtonClick}>
                카카오톡 데이터 입력하기
            </Button>
            <Button variant="contained"
              type="submit"
              component="span"
              size="medium" 
              disabled={!file}
              sx={{ 
                mr: 2, 
                backgroundColor: theme.palette.peach,
                color: theme.palette.gray700,
                '&:hover': {
                  backgroundColor: theme.palette.peach, // 호버 시 배경색 변경
                }
                }}
                onClick={handleSubmit}>
                결과 보러가기
            </Button>
          </Box>
        </Grid>
        </Box>
        </div>
        </ThemeProvider>
      </Container>
  );
};

export default FileUploadLove;
