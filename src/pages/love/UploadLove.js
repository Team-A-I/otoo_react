import React from 'react';
import FileUploadLove from '../../components/love/FileUploadLove';
import {Container, Box} from '@mui/material';

const UploadLove = () => {
    return (
    <Container maxWidth="md">
      <Box>
        <FileUploadLove />
      </Box>
    </Container>
    );
};

export default UploadLove;