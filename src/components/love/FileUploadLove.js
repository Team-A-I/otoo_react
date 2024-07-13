import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Container, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import '../../css/love/uploadlove.css';
import theme from '../../theme';
import UploadButton from '../UploadButton';
import SendModal from '../SendModal';

const FileUploadLove = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setOpenModal(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isTextFile = fileExtension === 'txt';

    navigate('/loading-love', { state: { file, isTextFile } });
  };

  const lovecopy = "네가 좋아\n너는?\n솔직하게\n말해줘.";
  const loveintrocopy = "상대방과 나눈 간지러운 대화를 넣어주세요.\n누가 더 좋아하는지 저희가 판단해드릴게요.\n판단의 기준과 함께 서로의 관심사를 같이 보여드릴게요.\n지금 무슨 생각을 하고 있을까요?";
  const btnUploadLabel = "카카오톡 파일 업로드"

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
            <Grid container>
              <Grid item xs={12} sm={6} container alignItems="center">
                <Typography
                  variant="hbig_bold"
                  color="peach"
                  sx={{
                    whiteSpace: 'pre-line',
                  }}>
                  {lovecopy}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 700 }}>
                  <CardHeader />
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
                  accept=".txt,image/*" // Accept both text and image files
                />
                <UploadButton
                  label={btnUploadLabel}
                  onClick={handleButtonClick}
                  disabled={false}
                  className="conflict-btn-upload"
                  title_str="카톡 캡쳐이미지 또는 txt파일만 올려주세요"
                  defaultColor = '#FFCFAA'
                  hoverColor = '#FFCFAA'
                  disabledColor = '#B0B0B0'
                />
              </Box>
              <SendModal
                open={openModal}
                handleClose={handleCloseModal}
                handlefile={handleSubmit}
                filetitle={fileName}
              />
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUploadLove;
