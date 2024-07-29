import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ThemeProvider, Box, Container, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axiosIns from '../components/axios';
import theme from '../theme';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoleAdmin, setUserRoleAdmin] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await axiosIns.post('https://ra.otoo.kr/logoutUser', sessionStorage.getItem('userEmail'), {
        headers: {
          'Authorization': sessionStorage.getItem('userEmail'),
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userRole');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const usersCode = sessionStorage.getItem('accessToken');
    if (usersCode !== null) {
      setIsLoggedIn(true);
    }
    if (sessionStorage.getItem('userRole') === 'ROLE_ADMIN') {
      setUserRoleAdmin(true);
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    ...(!isLoggedIn ? [] : [{ text: sessionStorage.getItem('userName') + " 님" }]),
    { text: '카톡분석', path: '/upload-conflict' },
    { text: '맞장구봇', path: '/chatbot' },
    { text: '방명록', path: '/board' },
    ...(!isLoggedIn ? [{ text: '로그인', path: '/user-login' }] : [{ text: '로그아웃', action: handleLogout }]),
    ...(!userRoleAdmin ? [] : [{ text: '관리자 페이지', path: '/admin-user' }])
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
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={item.path ? Link : 'div'}
            to={item.path || ''}
            onClick={item.action ? item.action : toggleDrawer(false)}
            onMouseEnter={() => setHoveredButton(item.text)}
            onMouseLeave={() => setHoveredButton(null)}
            sx={isLoggedIn && index === 0 ? { borderBottom: 'solid 2px #01A76280' } : {}}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: hoveredButton && hoveredButton !== item.text ? 'gray' : 'black',
                ...(isLoggedIn && index === 0 ? {} : {})
              }}
            />
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
              <Typography style={{ color: 'black' }} variant="h2_bold" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                몇대몇
              </Typography>
              {!isSmallScreen && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {menuItems.map((item) => (
                    item.action ? (
                      <Typography
                        key={item.text}
                        variant="h3_bold"
                        onClick={item.action}
                        onMouseEnter={() => setHoveredButton(item.text)}
                        onMouseLeave={() => setHoveredButton(null)}
                        sx={{ marginLeft: 3, textDecoration: 'none', cursor: 'pointer', color: hoveredButton && hoveredButton !== item.text ? 'gray' : 'black' }}
                      >
                        {item.text}
                      </Typography>
                    ) : (
                      <Typography
                        key={item.text}
                        variant="h3_bold"
                        component={Link}
                        to={item.path}
                        onMouseEnter={() => setHoveredButton(item.text)}
                        onMouseLeave={() => setHoveredButton(null)}
                        sx={{ marginLeft: 3, textDecoration: 'none', color: hoveredButton && hoveredButton !== item.text ? 'gray' : 'black' }}
                      >
                        {item.text}
                      </Typography>
                    )
                  ))}
                </Box>
              )}
              <Box sx={{ width: '10px' }} />
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
        <div style={{ marginTop: isSmallScreen ? '48px' : '64px' }}></div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
