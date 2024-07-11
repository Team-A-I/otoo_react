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
  const [image, setImage] = useState(null); // Added state for image
  // eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null); // Added ref for image input
  const navigate = useNavigate();

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleImageChange = (event) => { // Handler for image change
      setImage(event.target.files[0]);
  };

  const handleButtonClick = () => {
      fileInputRef.current.click();
  };

  const handleImageClick = () => { // Handler for image button click
      imageInputRef.current.click();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!file || !image) { // Check if both file and image are selected
          return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
          const content = e.target.result;
          try {
            const json = { text: content, image }; // Include image in JSON
            setJsonContent(json);
            navigate('/loading-love', { state: { jsonContent: json } });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
      };
      reader.readAsText(file);
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
            />
            <input
                type="file"
                ref={imageInputRef} // Added image input
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
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
              onClick={handleImageClick}> // Button for image upload
                이미지 업로드
            </Button>
            <Button variant="contained"
              type="submit"
              component="span"
              size="large" 
              disabled={!file || !image} // Disable if either file or image is not selected
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
