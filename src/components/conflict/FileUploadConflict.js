import React, { useState, useRef } from 'react';
import { Button, Container, TextField, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import '../../css/conflict/FileUploadConflict.css';
import theme from "../../theme";

// 변수 정의
const cardMaxWidth = 345;
const imageHeight = 300;
const imageSrc = "/otoo_react/images/problems.jpg";
const imageAlt = "Paella dish";
const lovemainText = "계속되는\n언쟁에\n고민\n마세요.";
const cardContentText = "상대방과 나눈 간지러운 대화를 넣어주세요.\n누가 더 좋아하는지 저희가 판단해드릴게요.\n판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요. 지금 무슨 생각을 하고 있을까요?";
const inputPromptText = "무슨 일이 있었는지 적어주세요:";
const btnUploadLabel = "카카오톡 파일 업로드";
const btnResultLabel = "결과 보러가기";
const btnToggleInputLabelShow = "직접 입력하기";
const btnToggleInputLabelHide = "입력창 닫기";
const textFieldRows = 10;
const textFieldVariant = "outlined";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
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
    console.log("handleFileUpload called");
    if (file) {
      console.log("File exists:", file);
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    } else {
      console.log("No file selected");
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
              <Grid item xs={12} sm={6} container alignItems="center">
                <Typography variant="hbig" color="green" className="lovemain-text">
                  {lovemainText}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} pl={1}>
                <Card sx={{ maxWidth: cardMaxWidth }}>
                  <CardHeader />
                  <CardMedia
                    component="img"
                    height={imageHeight}
                    image={imageSrc}
                    alt={imageAlt}
                  />
                  <CardContent>
                    <Typography variant="h3_mid" color="text.secondary">
                      {cardContentText}
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
                      className="btn-upload"
                    >
                      {btnUploadLabel}
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFileUpload}
                    disabled={!file}
                    className="btn-result"
                  >
                    {btnResultLabel}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleToggleInput}
                    className="btn-toggle-input"
                  >
                    {showInput ? btnToggleInputLabelHide : btnToggleInputLabelShow}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {showInput && (
              <Box mt={10} ref={inputRef}>
                <Typography variant="h6">{inputPromptText}</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={textFieldRows}
                  variant={textFieldVariant}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFileUpload}
                  className="btn-textfield"
                >
                  {btnResultLabel}
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
