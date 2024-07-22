import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ThemeProvider, Box, Container, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: '카톡분석', path: '/upload-conflict' },
    { text: '맞장구봇', path: '/chatbot' },
    { text: '로그인', path: '/user-login' },
    { text: 'QnA', path: '/qna-chatbot' },
    { text: '게시판', path: '/board'},
  ];

  const list = () => (
    <Box
      sx={{ width: '250px', padding: '20px', textAlign: 'center' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">메뉴</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.text} onClick={toggleDrawer(false)}>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '2rem', fontWeight: 'bold' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily }}>
        <AppBar position="fixed" style={{ background: 'white', zIndex: 9999, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }} elevation={1}>
          <Container maxWidth={isSmallScreen ? 'md' : 'lg'}>
            <Toolbar sx={{ minHeight: isSmallScreen ? '48px' : '64px', padding: isSmallScreen ? '0 8px' : '0 16px' }}>
              <Typography style={{ color: 'black' }} variant="h2_bold" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', fontSize: isSmallScreen ? '1.2rem' : '2rem' }}>
                몇대몇
              </Typography>
              {!isSmallScreen && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {menuItems.map((item) => (
                    <Typography
                      key={item.text}
                      variant="h6"
                      component={Link}
                      to={item.path}
                      sx={{ marginLeft: 3, textDecoration: 'none', color: 'black', fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                      {item.text}
                    </Typography>
                  ))}
                </Box>
              )}
              <IconButton edge="end" color="inherit">
                <NotificationsIcon style={{ color: 'black' }} />
              </IconButton>
              <Box sx={{ width: '10px' }} /> {/* 간격 추가 */}
              {isSmallScreen && (
                <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon style={{ color: 'black' }} />
                </IconButton>
              )}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ zIndex: 10000 }}
              >
                {list()}
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
        {/* Add a spacer div to push content down below the fixed header */}
        <div style={{ marginTop: isSmallScreen ? '48px' : '64px' }}></div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
