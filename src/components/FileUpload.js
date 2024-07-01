import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

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
    // 카카오톡 텍스트 파일을 JSON으로 변환하는 로직을 구현합니다.
    // 이 부분은 카카오톡 텍스트 파일 형식에 따라 다릅니다.
    // 예시로 간단히 텍스트를 라인별로 나누어 JSON 객체로 변환하는 코드를 작성합니다.
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
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" component="h1" gutterBottom>
          File Upload Example
        </Typography>
        <input
          accept=".txt"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={!file}>
          Process File
        </Button>
        {jsonContent && (
          <Box mt={2} width="100%">
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
