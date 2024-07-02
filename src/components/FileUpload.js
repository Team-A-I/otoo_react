import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography, Box, Grid } from '@mui/material';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    try {
      const json = parseKakaoTalkText(content);
      setJsonContent(json);
      console.log("JSON Content:", json);
      sendJsonToBackend(json);
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

  const sendJsonToBackend = (json) => {
    axios.post('http://localhost:8080/upload', json)
      .then(response => {
        console.log("Response from backend:", response.data);
      })
      .catch(error => {
        console.error("Error sending JSON to backend:", error);
      });
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" component="h1" color="primary" sx={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}>
              익숙하고{'\n'}편리한{'\n'}기능{'\n'}그대로
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src="/mnt/data/연애_소개.png" alt="소개 이미지" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={4}>
              <input
                accept=".txt"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" sx={{ mr: 2 }}>
                  Upload
                </Button>
              </label>
              <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={!file}>
                카카오톡 데이터 입력하기
              </Button>
            </Box>
          </Grid>
        </Grid>
        {jsonContent && (
          <Box mt={4} width="100%">
            <Typography variant="h6">JSON Output:</Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={JSON.stringify(jsonContent, null, 2)}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FileUpload;
