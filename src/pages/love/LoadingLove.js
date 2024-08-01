import React, { useEffect } from 'react';
import { Box, Paper, Grid, Skeleton, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../../components/axios';
import '../../css/conflict/LoadingPage.css'; // 커스텀 CSS 파일을 임포트합니다.

const LoadingLove = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonContent } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      if (jsonContent && jsonContent.file) {
        try {
          const fileExtension = jsonContent.file.name.split('.').pop().toLowerCase();
          const requestData = { text: jsonContent.text, type: 'love' };
          if (usercode) {
            requestData.usercode = usercode;
          }

          let response;
          if (fileExtension === 'txt') {
            response = await axiosIns.post('http://localhost:8080/api/love/analysis', requestData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } else {
            const formData = new FormData();
            formData.append('file', jsonContent.file);
            formData.append('type', 'love');
            if (usercode) {
              formData.append('usercode', usercode);
            }
            response = await axiosIns.post('http://localhost:8080/api/love/ocr', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }

          if (response.status === 200) {
            navigate('/result-love', { state: { jsonData: response.data } });
          } else {
            console.error("Error in response:", response);
          }
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      } else {
        console.error("No jsonContent or file found");
      }
    };
    fetchData();
  }, [jsonContent, navigate, usercode]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="93vh">
        <Grid container spacing={2}>
          <Grid item xs={12} mb={1}>
            <Paper elevation={4} sx={{ borderRadius: '35px', padding: { xs: 2, sm: 4 } }}>
              <Box>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12} sm={4}>
                    <Grid container justifyContent="center" alignItems="start" direction="column" sx={{ height: '100%', minHeight: '220px' }}>
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={200} height={50} animation="wave" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', minHeight: '220px' }}>
                      <Skeleton variant="rectangular" width={300} height={150} sx={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 }, backgroundImage: 'url(/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius: '35px' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Grid container justifyContent="center" alignItems="start" direction="column" sx={{ height: '100%' }}>
                    <Skeleton variant="text" width="30%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="63%" height={50} animation="wave" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Skeleton variant="rectangular" width="100%" height={320} sx={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Skeleton variant="rectangular" width="100%" height={320} sx={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
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

export default LoadingLove;
