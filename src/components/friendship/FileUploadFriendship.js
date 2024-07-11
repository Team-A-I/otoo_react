
import React, { useState, useCallback } from 'react';
import { Container, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FriendshipButton from './FriendshipButton';
import theme from "../../theme";

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
  const [file, setFile] = useState(null);// eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);
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
      navigate('/loading-friendship', { state: { jsonContent: json } });
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
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="raised-button-file">
                    <FriendshipButton
                      label={btnUploadLabel}
                      onClick={() => {}}
                      disabled={false} // 파일 선택 여부와 관계없이 기본 색상을 유지하도록
                      className="conflict-btn-upload"
                    />
                  </label>
                  <FriendshipButton
                    label={btnResultLabel}
                    onClick={handleFileUpload}
                    disabled={!file}
                    className="conflict-btn-result"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FileUploadFriendship;
