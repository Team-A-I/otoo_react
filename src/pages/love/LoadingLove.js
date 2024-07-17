import React, { useEffect } from 'react';
import { Box, Paper, Grid, Skeleton, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../../components/axios';
import '../../css/conflict/LoadingPage.css'; // 커스텀 CSS 파일을 임포트합니다.

const LoadingLove = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { file, isTextFile } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        try {
          if (isTextFile) {
            // Handle text file upload
            const text = await file.text();
            const requestData = { text, type: 'love' };
            if (usercode) {
              requestData.usercode = usercode;
            }
            const response = await axiosIns.post('https://717f-1-214-19-22.ngrok-free.app/api/love/analysis', requestData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            navigate('/result-love', { state: { jsonData: response.data } });
          } else {
            // Handle image file upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'love');
            if (usercode) {
              formData.append('usercode', usercode);
            }
            const response = await axiosIns.post('https://717f-1-214-19-22.ngrok-free.app/api/love/ocr', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            navigate('/result-love', { state: { jsonData: response.data } });
          }
        } catch (error) {
          console.error("Error sending file to backend:", error);
        }
      }
    };
    fetchData();
  }, [file, isTextFile, navigate, usercode]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="93vh">
        <Grid container spacing={2}>
          <Grid item xs={12} mb={1}>
            <Paper elevation={4} sx={{ borderRadius: '35px' }}>
              <Box>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12} sm={4}>
                    <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', marginLeft: '60px', minHeight: '220px' }}>
                      <Skeleton key="text1" variant="text" width={100} height={50} animation="wave" />
                      <Skeleton key="text2" variant="text" width={100} height={50} animation="wave" />
                      <Skeleton key="text3" variant="text" width={200} height={50} animation="wave" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%', minHeight: '220px' }}>
                      <Skeleton key="rect1" variant="rectangular" width={300} height={150} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius: '35px' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', marginLeft: '40px' }}>
                    <Skeleton key="text4" variant="text" width="30%" height={50} animation="wave" />
                    <Skeleton key="text5" variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton key="text6" variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton key="text7" variant="text" width="63%" height={50} animation="wave" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2} justifyContent={'center'} style={{ marginLeft: '40px' }} >
                    <Grid item xs={12} sm={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton key="rect2" variant="rectangular" width="100%" height={320} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
                    </Grid>
                    <Grid item xs={12} sm={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Skeleton key="rect3" variant="rectangular" width="100%" height={320} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
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
