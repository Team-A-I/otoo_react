import React from 'react';
import FileUpload from '../components/FileUpload';
import { Container, Typography, Box } from '@mui/material';

const ConflictUpload = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Conflict Upload
        </Typography>
        <FileUpload />
      </Box>
    </Container>
  );
};

export default ConflictUpload;
