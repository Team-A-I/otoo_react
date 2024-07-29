import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Person as PersonIcon, Assignment as AssignmentIcon, Home as HomeIcon, Logout as LogoutIcon, AssignmentTurnedIn as AssignmentTurnedInIcon  } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line
    const currentPath = location.pathname;
    // eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleMenuClick = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://ra.otoo.kr/logoutUser', sessionStorage.getItem('userEmail'), {
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

    const menuItems = [
        { path: '/admin-user', label: '회원관리', icon: <PersonIcon />, sx: { mr: 2 } },
        { path: '/admin-analyze', label: '테스트 결과 확인', icon: <AssignmentIcon />, sx: { mr: 2 } },
        { path: '/admin-qna', label: 'QnA 관리', icon: <AssignmentIcon />, sx: { mr: 2 } },
        { path: '/admin-board', label: '방명록관리', icon: <AssignmentTurnedInIcon /> },
    ];

    const rightMenuItems = [
        { path: '/', label: '메인으로', icon: <HomeIcon />, sx: { mr: 2 } },
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    {menuItems.map((item) => (
                        <Button
                            key={item.path}
                            color="inherit"
                            onClick={() => handleMenuClick(item.path)}
                            startIcon={item.icon}
                            sx={item.sx}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ display: 'flex' }}>
                    {rightMenuItems.map((item) => (
                        <Button
                            key={item.path}
                            color="inherit"
                            onClick={() => handleMenuClick(item.path)}
                            startIcon={item.icon}
                            sx={item.sx}
                        >
                            {item.label}
                        </Button>
                    ))}
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
