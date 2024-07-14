import React, { useState, useRef, useCallback } from 'react';
import { Container, TextField, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import UploadButton from '../UploadButton'; // 새로 만든 버튼 컴포넌트
import theme from "../../theme";
import SendModal from '../SendModal';

// 변수 정의
const cardMaxWidth = 700;
const imageHeight = 400;
const imageSrc = "/otoo_react/images/problems.jpg";
const imageAlt = "Paella dish";
const lovemainText = "계속되는\n언쟁에\n고민\n마세요.";
const cardContentText = "내가 맞다니까? 오늘도 답답함을 느끼고 계시다면 시원하게 대화를 넣어주세요. 누가 맞았는지 저희가 판단해드릴게요. 무엇이 우리를 싸우게 만들었는지, 어떻게 하면 이 문제를 해결할 수 있을지 알려드릴게요.";
const inputPromptText = "무슨 일이 있었는지 적어주세요:";
const btnUploadLabel = "카카오톡 파일 업로드";
const btnResultLabel = "결과 보러가기";
// const btnToggleInputLabelShow = "직접 입력하기";
// const btnToggleInputLabelHide = "입력창 닫기";
const textFieldRows = 10;
const textFieldVariant = "outlined";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');// eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
  // const [showInput, setShowInput] = useState(false);
  const [textInput, setTextInput] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setOpenModal(true);
  }, []);

  const handleFileRead = useCallback((event) => {
    const content = event.target.result;
    try {
      const json = { text: content, file }; // 전체 텍스트를 하나의 'text' 필드에 저장하고 파일 추가
      setJsonContent(json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  }, [file, navigate]);

  const handleFileUpload = () => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();
      if (fileExtension === 'txt') {
        reader.onload = handleFileRead;
        reader.readAsText(file);
      } else {
        const json = { text: textInput, file };
        setJsonContent(json);
        navigate('/loading-conflict', { state: { jsonContent: json } });
      }
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } else {
    }
  };

  // const handleToggleInput = () => {
  //   setShowInput(prevShowInput => !prevShowInput);
  //   if (!showInput) {
  //     setTimeout(() => {
  //       fileInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     }, 100);
  //   }
  // };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
            <Grid container>
              <Grid item xs={12} sm={6} container alignItems="center">
                <Typography
                  variant="hbig_bold"
                  sx={{
                    whiteSpace: 'pre-line',
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
                    accept=".txt,image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <UploadButton
                    label={btnUploadLabel}
                    onClick={handleButtonClick}
                    disabled={false}
                    className="conflict-btn-upload"
                    title_str="카톡 캡쳐이미지 또는 txt파일만 올려주세요"
                    defaultColor = '#346F79'
                    hoverColor = '#295961'
                    disabledColor = '#B0B0B0'
                  />
                    {/* <UploadButton
                  label={showInput ? btnToggleInputLabelHide : btnToggleInputLabelShow}
                  onClick={handleToggleInput}
                  className="conflict-btn-toggle-input"
                  defaultColor = '#346F79'
                  hoverColor = '#295961'
                  disabledColor = '#B0B0B0'
                /> */}
                </Box>
                <SendModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    handlefile={handleFileUpload}
                    filetitle={fileName}
                  />
              </Grid>
              {showInput && (
              <Box mt={10} ref={fileInputRef}>
                <Typography variant="h6">{inputPromptText}</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={textFieldRows}
                  variant={textFieldVariant}
                  value={textInput}
                  onChange={handleTextInputChange}
                />
                <UploadButton
                  label={btnResultLabel}
                  onClick={handleFileUpload}
                  disabled={!textInput.trim()}
                  className="conflict-btn-textfield"
                  defaultColor = '#346F79'
                  hoverColor = '#295961'
                  disabledColor = '#B0B0B0'
                />
              </Box>
            )}
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUpload;
