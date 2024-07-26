import React, {useState} from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Person as PersonIcon, Assignment as AssignmentIcon, Home as HomeIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();// eslint-disable-next-line
    const currentPath = location.pathname;// eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleMenuClick = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://gnat-suited-weekly.ngrok-free.app/logoutUser',sessionStorage.getItem('userEmail'), {
                headers: {
                    'Authorization': sessionStorage.getItem('userEmail'),
                    'Content-Type': 'application/json',
                },
            });
            
            if ((response).status === 200) {
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
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button color="inherit" onClick={() => handleMenuClick('/admin-user')} startIcon={<PersonIcon />} sx={{ mr: 2 }}>
                        회원관리
                    </Button>
                    <Button color="inherit" onClick={() => handleMenuClick('/admin-analyze')} startIcon={<AssignmentIcon />}>
                        테스트 결과 확인
                    </Button>
                    <Button color="inherit" onClick={() => handleMenuClick('/admin-qna')} startIcon={<AssignmentIcon />}>
                        QnA
                    </Button>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Button color="inherit" onClick={() => handleMenuClick('/')} startIcon={<HomeIcon />} sx={{ mr: 2 }}>
                        메인으로
                    </Button>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;