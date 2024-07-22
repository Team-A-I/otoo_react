import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const RecorderLoading = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        음성 파일 업로드 중...
      </Typography>
    </Box>
  );
};

export default RecorderLoading;
