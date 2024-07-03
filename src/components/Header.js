import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Toolbar>
        <Typography style={{ color: 'black' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OTOO
        </Typography>
        <Button style={{ color: 'black' }} component={Link} to="/">Home</Button>
        <Button style={{ color: 'black' }} component={Link} to="/analysis">Analysis</Button>
        <Button style={{ color: 'black' }} component={Link} to="/chatbot">ChatBot</Button>
        <Button style={{ color: 'black' }} component={Link} to="/conflict-upload">Conflict Upload</Button>
        <Button style={{ color: 'black' }} component={Link} to="/upload-love">UploadLove</Button>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
