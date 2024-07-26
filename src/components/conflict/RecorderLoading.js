import React from 'react';
import { Container } from '@mui/material';

const RecorderLoading = () => {
  return (
    <Container sx={{ display: 'flex', marginTop:"35px", justifyContent:'center'}}>
      <img src="/images/moonchul_dance.gif" alt="loading" />
    </Container>
  );
};

export default RecorderLoading;
