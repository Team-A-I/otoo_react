import React, { useEffect } from 'react';
import { Box, Paper, Grid, Skeleton, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosIns from '../axios';
import '../../css/conflict/LoadingPage.css'; // 커스텀 CSS 파일을 임포트합니다.

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonContent } = location.state || {};
  const usercode = sessionStorage.getItem('usersCode');

  useEffect(() => {
    const fetchData = async () => {
      console.log('jsonContent:', jsonContent);

      if (jsonContent && jsonContent.text) {
        try {
          const requestData = { text: jsonContent.text || '' };
          if (usercode) {
            requestData.usercode = usercode;
          }

          console.log('Sending text data for analysis:', requestData);
          const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/api/conflict/analysis', requestData);
          console.log('Server response:', response.data);
          navigate('/result-conflict', { state: { jsonData: response.data } });
        } catch (error) {
          alert('지원하지 않는 데이터 형식입니다.\n아래의 형식인지 확인부탁드려요:)\n\n 1. 카톡 형식 텍스트 파일\n 2. 카톡 기본 테마 캡쳐 이미지');
          console.error("Error sending data to backend:", error);
          navigate('/');
        }
      } else if (jsonContent && jsonContent.files && jsonContent.files.length > 0) {
        try {
          const formData = new FormData();
          jsonContent.files.forEach((file) => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
              formData.append('file', file);  // 변경된 부분: 파일 배열에서 단일 파일로 처리
            } else {
              throw new Error('지원하지 않는 파일형식입니다.');
            }
          });
          if (usercode) {
            formData.append('usercode', usercode);
          }

          console.log('Sending image files for OCR');
          const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/api/conflict/ocr', formData);

          console.log('Server response:', response.data);
          navigate('/result-conflict', { state: { jsonData: response.data } });
        } catch (error) {
          alert('지원하지 않는 데이터 형식입니다.\n아래의 형식인지 확인부탁드려요:)\n\n 1. 카톡 형식 텍스트 파일\n 2. 카톡 기본 테마 캡쳐 이미지');
          console.error("Error sending data to backend:", error);
          navigate('/');
        }
      } else {
        alert('jsonContent 또는 jsonContent.files가 정의되지 않았거나 비어 있습니다.');
        console.error("jsonContent 또는 jsonContent.files가 정의되지 않았거나 비어 있습니다.");
        navigate('/');
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
                    <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', marginLeft: '60px', minHeight: '220px' }}>
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={100} height={50} animation="wave" />
                      <Skeleton variant="text" width={200} height={50} animation="wave" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%', minHeight: '220px' }}>
                      <Skeleton variant="rectangular" width={300} height={150} style={{ borderRadius: '15px' }} className="custom-wave-skeleton" />
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
                    <Skeleton variant="text" width="30%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="90%" height={50} animation="wave" />
                    <Skeleton variant="text" width="63%" height={50} animation="wave" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2} justifyContent={'center'} style={{ marginLeft: '40px' }}>
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

export default LoadingPage;