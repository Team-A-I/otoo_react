import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
      <Typography variant="h6" mt={2}>로딩 중...</Typography>
    </Box>
  );
};

export default LoadingPage;
