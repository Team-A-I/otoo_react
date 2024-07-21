import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ThemeProvider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    { text: '음성 업로드', path: '/stt'},
    { text: 'QnA', path: '/qna-chatbot' },
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
        <AppBar position="fixed" style={{ background: 'white', zIndex: 9999 }} elevation={1}>
          <Toolbar>
            <Typography style={{ color: 'black' }} variant="h2_bold" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
              몇대몇
            </Typography>
            <IconButton edge="end" color="inherit">
              <NotificationsIcon style={{ color: 'black' }} />
            </IconButton>
            <Box sx={{ width: '10px' }} /> {/* 간격 추가 */}
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon style={{ color: 'black' }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ zIndex: 10000 }} // AppBar보다 위에 렌더링되도록 zIndex 설정
            >
              {list()}
            </Drawer>
          </Toolbar>
        </AppBar>
        {/* Add a spacer div to push content down below the fixed header */}
        <div style={{ marginTop: '64px' }}></div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
