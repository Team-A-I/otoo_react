import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, ThemeProvider} from '@mui/material';
import theme from '../theme';

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
    <div style={{ fontFamily: theme.typography.fontFamily }}>
      <AppBar position="static" style={{ background: 'white'}}>
        <Toolbar>
            <Typography style={{ color: 'black' }} variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }} >
              몇대몇
            </Typography>
          <Button style={{ color: 'black' }} component={Link} to="/">Home</Button>
          <Button style={{ color: 'black' }} component={Link} to="/analysis">Analysis</Button>
          <Button style={{ color: 'black' }} component={Link} to="/chatbot">ChatBot</Button>

        </Toolbar>
      </AppBar>
      </div>
      </ThemeProvider>
  );
};

export default Header;
