import React, {useState, useEffect} from 'react';
import axiosIns from '../../components/axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box } from '@mui/material';



const MyPageHome = () => {

  // 회원 정보 1개 조회=======================================================================
  // Initial user data with `usersBan` as 0 (active)
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // 회원 정보 1개 조회
  const getOneUser = async (usersCode) => {
     await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/user/getOneUser/${usersCode}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      }
     }, {params : {usersCode}})
     .then((resp) => {
       setUserData(resp.data);
     }).catch((err) => {
       console.log("회원 정보 1개 가져오기 실패");
       console.log(err);
     })
   }

   const text = sessionStorage.getItem('userName');
  
  useEffect(() => {
    getOneUser(sessionStorage.getItem('usersCode'));
  }, {});


  return (
    <Container sx={{ mt: 8, pt: 2 }}>
      {/* 이미지와 텍스트 오버레이 */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 비율
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <img
              src='../images/로고.png'
              alt="otooLogo"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.5,
                objectFit: 'contain',
              }}
            />
            {/* 텍스트 오버레이 */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'transparent', // 반투명 배경
                color: 'Black',
                p: 2,
                borderRadius: 1,
                textAlign: 'center',
                width: '80%', // 텍스트 박스 너비 조절
              }}
            >
              <Typography variant="h6">
                {text}님 환영합니다!
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <Box 
            sx={{ 
              bgcolor: 'secondary.main', 
              color: 'white', 
              p: 2, 
              borderRadius: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100px', // 일정한 높이 유지
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/user-detail')}
          >
            <Typography variant="h6">내 정보 수정</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box 
            sx={{ 
              bgcolor: 'success.main', 
              color: 'white', 
              p: 2, 
              borderRadius: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100px', // 일정한 높이 유지
              cursor: 'pointer'  
            }}
            onClick={() => navigate('/user-test')}
          >
            <Typography variant="h6">내 테스트 결과 확인</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}






export default MyPageHome;
