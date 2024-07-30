import React, { useState, useRef, useCallback } from 'react';
import { Container, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import UploadButton from '../UploadButton';
import theme from "../../theme";
import SendModal from '../modal/SendModal';

// 변수 정의
const cardMaxWidth = 700;
const imageHeight = 400;
const imageSrc = "/images/friendship-1.jpg";
const imageAlt = "friendship-1";
const friendshipmainText = "우정 몇대몇";
const cardContentText = "#찐친테스트\n#우정파괴\n#테스트는 테스트일 뿐^^";
const btnUploadLabel = "카카오톡 파일 업로드";

const FileUploadFriendship = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState('');
  const [fileCount, setFileCount] = useState(0);
  // eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
  // eslint-disable-next-line
  const [textInput, setTextInput] = useState("");
  // eslint-disable-next-line
  const [selectedTab, setSelectedTab] = useState(0);
  const textFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const resetFileInput = () => {
    if (selectedTab === 1) {
      textFileInputRef.current.value = null;
    } else if (selectedTab === 0) {
      imageFileInputRef.current.value = null;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetFileInput();
  };

  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    const selectedFile = selectedFiles[0];
    const isImage = selectedFile.type.startsWith('image/');
    const isText = selectedFile.type === 'text/plain';

    if (selectedFiles.length > 0) {
      if (isImage) {
        setFiles(selectedFiles);
        setFileName(selectedFiles.map(file => file.name).join(', '));
        setFileSize(selectedFiles.reduce((acc, file) => acc + file.size, 0));
        setFileType(selectedFiles.map(file => file.type).join(', '));
        setFileCount(selectedFiles.length);
      } else if (isText) {
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
      navigate('/loading-friendship', { state: { jsonContent: json } });
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  }, [file, navigate]);

  const handleFileUpload = () => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();
      reader.onload = handleFileRead;
      if (fileExtension === 'txt') {
        reader.readAsText(file);
      } else {
        const json = { text: textInput, file };
        setJsonContent(json);
        navigate('/loading-friendship', { state: { jsonContent: json } });
      }
    } else if (files.length > 0) {
      const json = { text: textInput, files };
      setJsonContent(json);
      navigate('/loading-friendship', { state: { jsonContent: json } });
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      navigate('/loading-friendship', { state: { jsonContent: json } });
    }
  };

  const handleButtonClick = () => {
    if (selectedTab === 1) textFileInputRef.current?.click();
    else imageFileInputRef.current?.click();
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
                    color: '#0495D2'
                  }}
                >
                  {friendshipmainText}
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
                    ref={imageFileInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <UploadButton
                    label={btnUploadLabel}
                    onClick={handleButtonClick}
                    disabled={false}
                    className="conflict-btn-upload"
                    title_str="카톡 txt파일만 올려주세요"
                    defaultColor = '#0495D2'
                    hoverColor = '#0495D2'
                    disabledColor = '#B0B0B0'
                  />
                </Box>
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
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUploadFriendship;
