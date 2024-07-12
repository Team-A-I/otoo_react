import React, { useEffect } from 'react';
import { Box, Paper, Grid, Skeleton, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/friendship/LoadingFriendship.css'; // 커스텀 CSS 파일을 임포트합니다.

const LoadingFriendship = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonContent } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      if (jsonContent) {
        try {
          const fileExtension = jsonContent.file.name.split('.').pop().toLowerCase();
          const requestData = { text: jsonContent.text };
          if (usercode) {
            requestData.usercode = usercode;
          }

          let response;
          if (fileExtension === 'txt') {
            response = await axios.post('http://localhost:8080/api/friendship/analysis', requestData);
          } else {
            const formData = new FormData();
            formData.append('file', jsonContent.file);
            if (usercode) {
              formData.append('usercode', usercode);
            }
            response = await axios.post('http://localhost:8080/api/friendship/ocr', formData);
          }

          navigate('/result-friendship', { state: { jsonData: response.data } });
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      }
    };
    fetchData();
  }, [jsonContent, navigate, usercode]);
  

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="93vh">
        <Grid container spacing={2}>
          <Grid item xs={12} mb={1}>
            <Paper elevation={4} sx={{ borderRadius: '35px' }}>
              <Box>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12} sm={4}>
                    <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', marginLeft:'60px',minHeight: '220px' }}>
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={200} height={50} animation="wave" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' ,minHeight: '220px'}}>
                      <Skeleton variant="rectangular"  width={300} height={150} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/otoo_react/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius: '35px' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', marginLeft:'40px' }}>
                    <Skeleton variant="text" width="30%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="63%" height={50} animation="wave" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2} justifyContent={'center'} style={{ marginLeft:'40px' }} >
                    <Grid item xs={12} sm={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton variant="rectangular" width="100%" height={320} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                    <Grid item xs={12} sm={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton variant="rectangular" width="100%" height={320} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoadingFriendship;
