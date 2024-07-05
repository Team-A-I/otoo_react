import React from 'react';
import FileUploadConflict from '../../components/conflict/FileUploadConflict';
import { Container,  Box } from '@mui/material';

const ConflictUpload = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <FileUploadConflict />
      </Box>
    </Container>
  );
};

export default ConflictUpload;
