import theme from "../../theme"
import { Box, Typography, Button, Paper, ThemeProvider, TextField } from '@mui/material';
import React, { useEffect,useState } from 'react';
import axiosIns from "../../components/axios";

const AdminQnA = () => {
    const [qna, setQnA] = React.useState("");
    const [isEditing, setIsEditing] = useState(false);
    const qnaSelectHandler = async() => {
        await axiosIns.get('http://localhost:8080/admin/qna-view', {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420',
                
            },
        }).then((response) => {
            setQnA(response.data);
            setIsEditing(false);
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    };
    
    const qnaUpdateHandler = async() => {
        await axiosIns.post('http://localhost:8080/admin/qna-edit', {
            qna: qna,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
        qnaSelectHandler();
        
    }
    const handleQnaChange = (event) => {
        setQnA(event.target.value);
      };
    useEffect(() => {
        qnaSelectHandler();
    }, []);
    return (
      <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily }}>
        <Box sx={{ padding: 2 }}> 
            <Typography variant="h4" gutterBottom>QnA 상세 정보</Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsEditing(true)}
                style={{ display: isEditing ? 'none' : 'inline-flex' }}
            >
                수정하기
            </Button>
            {isEditing && (
            <Box>
              <Button variant="outlined" color="primary" onClick={qnaUpdateHandler}>
                저장
              </Button>
              <Button variant="outlined" color="primary" onClick={qnaSelectHandler}>
                취소
              </Button>
            </Box>
          )}
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            {isEditing ? (
              <TextField
                variant="filled"
                id="outlined-multiline-flexible"
                multiline
                sx={{ width: '100%' }}
                maxRows={34}
                value={qna}
                onChange={handleQnaChange}
              />
            ) : (
              <Typography variant="body1">
                {qna.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            )}
          </Paper>
        </Box>
      </div>
      </ThemeProvider>
    );
  };
  
  export default AdminQnA;