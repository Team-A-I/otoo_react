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
const cardContentText = "상대방과 나눈 간지러운 대화를 넣어주세요.\n누가 더 좋아하는지 저희가 판단해드릴게요.\n판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요. 지금 무슨 생각을 하고 있을까요?";
const inputPromptText = "무슨 일이 있었는지 적어주세요:";
const btnUploadLabel = "카카오톡 파일 업로드";
const btnResultLabel = "결과 보러가기";
const btnToggleInputLabelShow = "직접 입력하기";
const btnToggleInputLabelHide = "입력창 닫기";
const textFieldRows = 10;
const textFieldVariant = "outlined";


const FileUpload = () => {
  const [file, setFile] = useState(null);// eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
  const [showInput, setShowInput] = useState(false);
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
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log("handleFileUpload called");
    console.log("File exists:", file);
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
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
                    disabled={!file}
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
                />
                <ConflictButton
                  label={btnResultLabel}
                  onClick={handleFileUpload}
                  disabled={!file}
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
