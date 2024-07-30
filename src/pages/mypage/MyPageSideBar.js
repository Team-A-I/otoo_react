import *  as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import axiosIns from '../../components/axios';
import { Logout as LogoutIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: 'relative',
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function MyPageSideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

const [isLoggedIn, setIsLoggedIn] = useState(false);
const handleLogout = async () => {
    try {
        const response = await axiosIns.post('https://gnat-suited-weekly.ngrok-free.app/logoutUser', sessionStorage.getItem('userEmail'), {
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
        }
    } catch (error) {
        console.error('Logout failed', error);
    }            
};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography 
            variant="h6" 
            noWrap sx={{ flexGrow: 1 }} 
            component="div"
            onClick={() => {navigate('/user-home')}}
          >
            마이페이지
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon onClick={() => {navigate('/user-detail')}}>
              <AccountCircleIcon />
            </ListItemIcon>
              <ListItemText 
                primary="프로필 수정"
                onClick={() => {navigate('/user-detail')}}
              />
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => {navigate('/user-test')}}>
              <EmojiEmotionsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="테스트 결과 확인"
              onClick={() => {navigate('/user-test')}}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon onClick={() => {navigate('/')}}>
              <HouseIcon />
            </ListItemIcon>
              <ListItemText 
                primary="처음으로" 
                onClick={() => {navigate('/')}}
              />
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={handleLogout}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="로그아웃"
              onClick={handleLogout} 
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default MyPageSideBar;
