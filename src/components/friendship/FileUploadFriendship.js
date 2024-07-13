
import React, { useState, useRef, useCallback } from 'react';
import { Container, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FriendshipButton from './FriendshipButton';
import theme from "../../theme";
import SendModal from '../SendModal';

// 변수 정의
const cardMaxWidth = 700;
const imageHeight = 400;
const imageSrc = "/otoo_react/images/friendship-1.jpg";
const imageAlt = "friendship-1";
const friendshipmainText = "Best\nFriend\nForever\n";
const cardContentText = "#찐친테스트\n#우정파괴\n#테스트는 테스트일 뿐^^";
const btnUploadLabel = "카카오톡 파일 업로드";
const btnResultLabel = "결과 보러가기";

const FileUploadFriendship = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [jsonContent, setJsonContent] = useState(null);
  const [textInput, setTextInput] = useState("");
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
      navigate('/loading-friendship', { state: { jsonContent: json } });
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
        navigate('/loading-friendship', { state: { jsonContent: json } });
      }
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      navigate('/loading-friendship', { state: { jsonContent: json } });
    } else {
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
                    accept=".txt,image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="raised-button-file">
                    <FriendshipButton
                      label={btnUploadLabel}
                      onClick={() => {}}
                      disabled={false}
                      className="conflict-btn-upload"
                    />
                  </label>
                </Box>
                <SendModal
                  open={openModal}
                  handleClose={handleCloseModal}
                  handlefile={handleFileUpload}
                  filetitle={fileName}
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