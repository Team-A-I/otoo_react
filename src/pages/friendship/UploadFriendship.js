import React from 'react';
import FileUploadFriendship from '../../components/friendship/FileUploadFriendship';
import {Container, Box} from '@mui/material';

const UploadFriendship = () => {
    return (
    <Container maxWidth="xl">
      <Box>
        <FileUploadFriendship />
      </Box>
    </Container>
    );
};

export default UploadFriendship;