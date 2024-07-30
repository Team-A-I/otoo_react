import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosIns from '../../components/axios';
import { Container, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import OutlinedInput from '@mui/material/OutlinedInput';

const RootContainer = styled(Container)({
  marginTop: 20,
});

const TableStyled = styled(Table)({
  minWidth: 650,
});

const MyPageUserDetail = () => {

// 회원 정보 1개 조회=======================================================================
  // Initial user data with `usersBan` as 0 (active)
  const [userData, setUserData] = useState({});

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
  
  useEffect(() => {
    getOneUser(sessionStorage.getItem('usersCode'));
  }, {});

//회원 정보 1개 수정=======================================================================
const [name, setName] = useState('');
const [gender, setGender] = useState('');

  // 사용자 정보 수정
  const changeUser = async () => {
    try {
      const updatedUserData = {
        ...userData, // 기존 사용자 데이터 복사
        usersName: name, // 변경된 이름 설정
        usersGender: gender, // 변경된 성별 설정
      };

      // 서버로 수정된 사용자 데이터를 전송
      await axiosIns.post(`https://gnat-suited-weekly.ngrok-free.app/user/changeUser`, updatedUserData);
      // 사용자 정보 다시 조회해서 화면 갱신
      getOneUser(sessionStorage.getItem('usersCode'));
    } catch (error) {
      console.error("회원 정보 1개 수정 실패", error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

//회원 정보 1개 삭제=======================================================================
const navigate = useNavigate();
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


const deleteUser = async (usersCode) => {
    handleLogout();
    await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/user/deleteUser/${usersCode}`, {
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          }}, 
    {params : {usersCode}}).then(()=> {
        alert("계정이 삭제되었습니다. 메인페이지로 이동합니다.");
        navigate('/');
    })
}

const handleGoBack = () => {
  navigate(-1); // Navigate to the previous page
};


//결과 화면===============================================================================
  return (
    <RootContainer >
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCell align="center">항목</TableCell>
              <TableCell align="center">정보</TableCell>
              <TableCell align="center">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">usersEmail</TableCell>
              <TableCell align="center">{userData.usersEmail}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">usersName</TableCell>
              <TableCell align="center">
                {userData.usersName}
              </TableCell>
              <TableCell align="center">
                <OutlinedInput
                  value={name}
                  onChange={handleNameChange}
                  placeholder="이름 입력"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">usersGender</TableCell>
              <TableCell align="center">
                {userData.usersGender}
              </TableCell>
              <TableCell align="center">
                <OutlinedInput
                  value={gender}
                  onChange={handleGenderChange}
                  placeholder="성별 입력"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </TableStyled>
      </TableContainer>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={changeUser}
        >
          수정
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteUser(userData.usersCode)}
        >
          삭제
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
        >
          뒤로가기
        </Button>

      </Box>
    </RootContainer>
  );
}

export default MyPageUserDetail;
