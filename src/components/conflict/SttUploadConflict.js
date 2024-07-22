// eslint-disable-next-line
import React, { useState, useRef, useCallback } from 'react'; // eslint-disable-next-line
import { Container, TextField, Typography, Box, Grid, ThemeProvider, Divider, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadButton from '../UploadButton';
import theme1 from "../../theme";
import SendModal from '../modal/SendModal';
import OnboardingCarousel from "../Onboarding";

// 변수 정의
const inputPromptText = "무슨 일이 있었는지 적어주세요:";
const btnUploadLabel = "카카오톡 파일 업로드";
const btnResultLabel = "결과 보러가기";
const textFieldRows = 10;
const textFieldVariant = "outlined";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState('');
  const [fileCount, setFileCount] = useState(0); // eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null); // eslint-disable-next-line
  const [showInput, setShowInput] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showCarousel, setShowCarousel] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    const selectedFile = selectedFiles[0];
    const isImage = selectedFile.type.startsWith('image/');

    if (selectedFiles.length > 0) {
      if (isImage) {
        setFiles(selectedFiles);
        setFileName(selectedFiles.map(file => file.name).join(', '));
        setFileSize(selectedFiles.reduce((acc, file) => acc + file.size, 0));
        setFileType(selectedFiles.map(file => file.type).join(', '));
        setFileCount(selectedFiles.length);
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setFileSize(selectedFile.size);
        setFileType(selectedFile.type);
        setFileCount(1);
      }
      setOpenModal(true);
    }
  }, []);

  const handleFileRead = useCallback((event) => {
    const content = event.target.result;
    try {
      const json = { text: content, file };
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
        navigate('/stt-loading', { state: { jsonContent: json } });
      }
    } else if (files.length > 0) {
      const json = { text: textInput, files };
      setJsonContent(json);
      navigate('/stt-loading', { state: { jsonContent: json } });
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      navigate('/stt-loading', { state: { jsonContent: json } });
    } else {
      // 파일이나 텍스트 입력이 없을 때 처리
    }
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSkip = () => {
    setShowCarousel(false);
  };

  if (showCarousel) {
    return <OnboardingCarousel onSkip={handleSkip} />;
  }

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily, position: 'relative', minHeight: '100vh' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            boxSizing: 'border-box',
            marginTop: 5,
            paddingBottom: '100px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'flex-start', ml: 3.3, mt: 3.5, mb: 3 }}>
            <Typography variant="h2_bold" gutterBottom>
              카톡판결
            </Typography>
            <Typography variant="h2_mid">
              갈등 판결 몇대몇
            </Typography>
            <Typography variant="h3_mid">
              누가 맞는지 결정해드리겠습니다.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
              <input
                accept=".wav, .mp3"
                style={{ display: 'none' }}
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                multiple
              />
              <UploadButton
                label={btnUploadLabel}
                onClick={handleButtonClick}
                disabled={false}
                className="conflict-btn-upload"
                title_str="카톡 캡쳐이미지 또는 txt파일만 올려주세요"
                defaultColor='#F7E600'
                hoverColor='#F7E60090'
                disabledColor='#B0B0B0'
                fontColor='#000'
              />
            </Box>
          </Box>
          <Box>
            <img src="/images/H.png" alt="intro" style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
          </Box>
          <Divider sx={{ width: '90%', mb: 2, backgroundColor: '#ccc' }} />
          <Box sx={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", width: '90%', mb: 2 }}>
            <Paper sx={{ p: 15, minWidth: '200px', marginRight: 2 }}>
              안녕
            </Paper>
            <Paper sx={{ p: 15, minWidth: '200px', marginRight: 2 }}>
              안녕
            </Paper>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SendModal
                open={openModal}
                handleClose={handleCloseModal}
                handlefile={handleFileUpload}
                filetitle={fileName}
                filesize={fileSize}
                filetype={fileType}
                filecount={fileCount}
              />
            </Grid>
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
                defaultColor='#346F79'
                hoverColor='#295961'
                disabledColor='#B0B0B0'
                fontColor='#fff'
              />
            </Box>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default FileUpload;
