import React, { useState, useRef } from 'react';
import { Button, Container, TextField, Typography, Box, Grid ,ThemeProvider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import '../../css/conflict/FileUploadConflict.css';
import theme from "../../theme"

const FileUpload = () => {
  const [file, setFile] = useState(null);
  // eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    try {
      const json = parseKakaoTalkText(content);
      setJsonContent(json);
      console.log("JSON Content:", json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const parseKakaoTalkText = (text) => {
    const lines = text.split('\n');
    const json = lines.map((line, index) => ({ id: index, text: line }));
    return json;
  };

  const handleToggleInput = () => {
    setShowInput(prevShowInput => !prevShowInput);
    if (!showInput) {
      setTimeout(() => {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box className="container">
            <Grid container>
                <Grid item xs={12} sm={6}container
                  alignItems="center">
                    <Typography variant="hbig"
                    color="green" className="lovemain-text">
                      계속되는{'\n'}언쟁에{'\n'}고민{'\n'}마세요.
                    </Typography>
                  </Grid>
                <Grid item xs={12} sm={6} pl={1}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader/>
                    <CardMedia
                      component="img"
                      height="300"
                      image="/otoo_react/images/problems.jpg"
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="h3_mid" color="text.secondary">
                        상대방과 나눈 간지러운 대화를 넣어주세요.<br/> 누가 더 좋아하는지 저희가 판단해드릴게요.<br/> 판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요. 지금 무슨 생각을 하고 있을까요?
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              <Grid item xs={12}>
                <Box className="button-container">
                  <input
                    accept=".txt"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="raised-button-file">
                    <Button 
                      variant="contained" 
                      component="span" 
                      sx={{ 
                        mr: 2, 
                        backgroundColor: '#346F79', 
                        color: '#FFFFFF',
                        '&:hover': {
                          backgroundColor: '#346F79', // 호버 시 배경색 변경
                        }
                      }}
                    >
                      카카오톡 파일 업로드
                    </Button>
                  </label>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleFileUpload} 
                    disabled={!file}
                    sx={{ 
                      backgroundColor: '#346F79', 
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#346F79', // 호버 시 배경색 변경
                      }
                    }}
                  >
                    결과 보러가기
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleToggleInput}
                    sx={{ 
                      ml: 2,
                      backgroundColor: '#346F79', 
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#346F79', // 호버 시 배경색 변경
                      }
                    }}
                  >
                    {showInput ? '입력창 닫기' : '직접 입력하기'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {showInput && (
              <Box mt={10} ref={inputRef}>
                <Typography variant="h6">무슨 일이 있었는지 적어주세요:</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  variant="outlined"
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleFileUpload} 
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#0350B7', 
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#033080', // 호버 시 배경색 변경
                    }
                  }}
                >
                  결과 보러가기
                </Button>
              </Box>
            )}
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUpload;
