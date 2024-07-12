import React, { useState, useRef, useCallback } from 'react';
import { Container, TextField, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ConflictButton from './ConflictButton'; // 새로 만든 버튼 컴포넌트
import theme from "../../theme";

// 변수 정의
const cardMaxWidth = 700;
const imageHeight = 400;
const imageSrc = "/otoo_react/images/problems.jpg";
const imageAlt = "Paella dish";
const lovemainText = "계속되는\n언쟁에\n고민\n마세요.";
const cardContentText = "내가 맞다니까? 오늘도 답답함을 느끼고 계시다면 시원하게 대화를 넣어주세요. 누가 맞았는지 저희가 판단해드릴게요. 무엇이 우리를 싸우게 만들었는지, 어떻게 하면 이 문제를 해결할 수 있을지  알려드릴게요.";
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
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = useCallback((event) => {
    setFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
  }, []);

  const handleFileRead = useCallback((event) => {
    const content = event.target.result;
    try {
      const json = { text: content }; // 전체 텍스트를 하나의 'text' 필드에 저장
      setJsonContent(json);
      console.log("JSON Content:", json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  }, [navigate]);

  const handleFileUpload = () => {
    if (file) {
      console.log("handleFileUpload called");
      console.log("File exists:", file);
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      console.log("JSON Content from text input:", json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } else {
      console.log("No file selected and text input is empty");
    }
  };

  const handleToggleInput = () => {
    setShowInput(prevShowInput => !prevShowInput);
    if (!showInput) {
      setTimeout(() => {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
            <Grid container>
              <Grid item xs={12} sm={6} container alignItems="center">
                <Typography
                  variant="hbig"
                  sx={{
                    fontWeight: 900,
                    whiteSpace: 'pre-line',
                    fontSize: '95px',
                    color: '#346F79'
                  }}
                >
                  {lovemainText}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4vh' }}>
                  <input
                    accept=".txt"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="raised-button-file">
                    <ConflictButton
                      label={btnUploadLabel}
                      onClick={() => {}}
                      disabled={false} // 파일 선택 여부와 관계없이 기본 색상을 유지하도록
                      className="conflict-btn-upload"
                    />
                  </label>
                  <ConflictButton
                    label={btnResultLabel}
                    onClick={handleFileUpload}
                    disabled={!file && !textInput.trim()}
                    className="conflict-btn-result"
                  />
                  <ConflictButton
                    label={showInput ? btnToggleInputLabelHide : btnToggleInputLabelShow}
                    onClick={handleToggleInput}
                    className="conflict-btn-toggle-input"
                  />
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
                  value={textInput}
                  onChange={handleTextInputChange}
                />
                <ConflictButton
                  label={btnResultLabel}
                  onClick={handleFileUpload}
                  disabled={!textInput.trim()}
                  className="conflict-btn-textfield"
                />
              </Box>
            )}
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUpload;
