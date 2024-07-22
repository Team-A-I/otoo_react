import React from 'react';
import { Container } from '@mui/material';

const RecorderLoading = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 0, margin: 0 }}>
      <img src="/images/moonchul_dance.gif" alt="loading" style={{ width: '60%', height: '60%', objectFit: 'cover' }} />
    </Container>
  );
};

export default RecorderLoading;
