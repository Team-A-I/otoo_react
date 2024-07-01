import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/analysis">Analysis</Button>
        <Button color="inherit" component={Link} to="/chatbot">ChatBot</Button>
        <Button color="inherit" component={Link} to="/conflict-upload">Conflict Upload</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
