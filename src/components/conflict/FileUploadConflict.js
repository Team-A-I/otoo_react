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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h2" component="h1" color="primary" className="header-text">
                  계속되는{'\n'}언쟁에{'\n'}고민{'\n'}마세요
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader/>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/otoo_react/images/conflict4.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
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
                        backgroundColor: '#0350B7', 
                        color: '#FFFFFF',
                        '&:hover': {
                          backgroundColor: '#033080', // 호버 시 배경색 변경
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
                      backgroundColor: '#0350B7', 
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#033080', // 호버 시 배경색 변경
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
                      backgroundColor: '#0350B7', 
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#033080', // 호버 시 배경색 변경
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
