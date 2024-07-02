import React from 'react';
import FileUpload from '../components/FileUpload';
import { Container,  Box } from '@mui/material';

const ConflictUpload = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <FileUpload />
      </Box>
    </Container>
  );
};

export default ConflictUpload;
