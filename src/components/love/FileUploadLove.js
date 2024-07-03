import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import LoadingLove from '../../pages/love/LoadingLove';
import '../../css/uploadlove.css';

const FileUploadLove = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
      fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!file) {
          return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
          const content = e.target.result;
          const userId = "example_user_id"; // 실제 사용자 ID를 여기에 넣어야 합니다.
          const data = {
              user_id: userId,
              content: content
          };
          console.log("data",data)

          try {
              navigate('/loading-love');
              const response = await axios.post('http://localhost:8080/upload', data, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              console.log("response", response)
              console.log("response.data", response.data)
              navigate('/result-love', { state: { result: response.data } });
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      };
      reader.readAsText(file);
  };

  return (
      <div>
        <Box className="button-container">
          <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
          />
          <Button variant="contained"
            component="span" 
            sx={{ 
              mr: 2, 
              backgroundColor: '#0350B7', 
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#033080', // 호버 시 배경색 변경
              }
            }}
            onClick={handleButtonClick}>
              카카오톡 데이터 입력하기
          </Button>
          <Button variant="contained"
            type="submit"
            component="span" 
            disabled={!file}
            sx={{ 
              mr: 2, 
              backgroundColor: '#0350B7', 
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#033080', // 호버 시 배경색 변경
              }
              }}
              onClick={handleSubmit}>
              업로드
          </Button>
        </Box>
      </div>
  );
};

export default FileUploadLove;
