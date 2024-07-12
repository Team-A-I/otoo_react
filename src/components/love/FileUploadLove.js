import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, Container, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import '../../css/love/uploadlove.css';
import theme from '../../theme';

const FileUploadLove = () => {
  const [file, setFile] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
  };

  const handleButtonClick = () => {
      fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!file) {
          return;
      }
      if (file.type === 'text/plain') {
          const reader = new FileReader();
          reader.onload = async (e) => {
              const content = e.target.result;
              try {
                  const json = { text: content };
                  setJsonContent(json);
                  navigate('/loading-love', { state: { jsonContent: json } });
              } catch (error) {
                  console.error('Error uploading file:', error);
              }
          };
          reader.readAsText(file);
      } else if (file.type.startsWith('image/')) {
          const json = { image: file };
          setJsonContent(json);
          navigate('/loading-love', { state: { jsonContent: json } });
      }
  };

  const lovecopy = "네가 좋아\n너는?\n솔직하게\n말해줘.";
  const loveintrocopy = "상대방과 나눈 간지러운 대화를 넣어주세요.\n누가 더 좋아하는지 저희가 판단해드릴게요.\n판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요.\n지금 무슨 생각을 하고 있을까요?";

  return (
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
        <Grid container>
          <Grid item xs={12} sm={6} container alignItems="center">
          <Typography 
            variant="hbig"
            color="peach"
            sx={{
              fontWeight: 900,
              whiteSpace: 'pre-line',
              fontSize: '95px',
            }}>
              {lovecopy}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 700 }}>
            <CardHeader/>
            <CardMedia
              component="img"
              height="400"
              image="/otoo_react/images/lovemain.jpg"
              alt="lovemain"
            />
            <CardContent>
              <Typography variant="h3_mid" color="text.secondary">
                <span dangerouslySetInnerHTML={{ __html: loveintrocopy }} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4vh' }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".txt,image/*" // Accept both text and image files
            />
            <Button variant="contained"
              component="span" 
              size="large"
              sx={{ 
                mr: 2, 
                backgroundColor: theme.palette.peach, 
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
              size="large" 
              disabled={!file} // Enable if either file is selected
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
