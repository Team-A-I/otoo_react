import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Typography, Paper, TablePagination } from '@mui/material';
import { StopOutlined, CheckCircleOutlined } from '@mui/icons-material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'

const AdminUser = () => {

  //=================================초기 상태====================================
  // Initial user data with `usersBan` as 0 (active)
  const [userData, setUserData] = useState([]);

  // 전체 회원 정보 조회
  const getAllUser = async () => {
     await axios.get("https://ra.otoo.kr/getAllUser", {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      }
     })
     .then((resp) => {
       setUserData(resp.data);
     }).catch((err) => {
       console.log("회원 전체정보 가져오기 실패");
       console.log(err);
     })
   }
  
  useEffect(() => {
    getAllUser();
  }, []);

  //=================================계정 활성화, 정지====================================

  const changeBanned = async (user) => {
    try {
      const endpoint = user.usersBan === 'N' ? "changeStatusBan" : "changeStatusNotBan";// eslint-disable-next-line
      const response = await axios.post(`https://ra.otoo.kr/admin/${endpoint}`, {
        usersCode: user.usersCode,
        usersId: user.usersId,
        usersPw: user.usersPw,
        usersEmail: user.usersEmail,
        usersName: user.usersName,
        usersRole: user.usersRole,
        usersBan: user.usersBan,
        usersGender: user.usersGender,
        oAuthProvider: user.oAuthProvider,
      });

      // 서버에서 새로운 userData를 받아와서 업데이트
      getAllUser();
    } catch (error) {
      console.error("회원 계정 상태 변경 실패");
      console.error(error);
    }
  }

  //=================================페이징 처리========================================

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // 버튼 선택별 조회 메소드 다르게 적용 - 성별, 아이디 유형, 계정 정지 여부
  // 위 3가지 조건을 섞어서 만드는 조회 메소드도 만들어야 함
  //=============하나 선택시 테이블에 즉시 결과 반영=====================================
  
  // 조회 1. 성별 1개 선택 시 조회
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
    if(event.target.value === '남자' || event.target.value === '여자') {
      getGenderOne(event.target.value);
    } else if(event.target.value === '선택'){
      getAllUser();
    }
  };

  const getGenderOne = async(usersGender) => {
    await axios.get(`https://ra.otoo.kr/admin/getGenderOne/${usersGender}`,{
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      }
    },
      {params : {usersGender : '남자' ? '남자' : '여자'}})
      .then((resp) => {
        setUserData(resp.data);
      })
      .catch((err) => {
        console.log("성별 1개 선택 시 조회 실패");
        console.log(err);
      })
  }

  // 조회 2. 밴 상태 1개 선택 시 조회
  const [ban, setBan] = useState('');

  const handleChangeBan = (event) => {
    setBan(event.target.value);// eslint-disable-next-line
    const ban1 = event.target.value;
    if(event.target.value === 'Y' || event.target.value === 'N') {
      getBanOne(event.target.value);
    } else if(event.target.value === '선택'){
      getAllUser();
    }
  };

  const getBanOne = async(usersBan) => {
    await axios.get(`https://ra.otoo.kr/admin/getBanOne/${usersBan}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      }
    },
      {params : {usersBan : 'Y' ? 'Y' : 'N'}})
      .then((resp) => {
        setUserData(resp.data);
      })
      .catch((err) => {
        console.log("밴 1개 선택 시 조회 실패");
        console.log(err);
      })
  }

  // 조회 3. 계정 종류 1개 선택

  const [auth, setAuth] = useState('');
  const [filteredAuth, setFilteredAuth] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleChangeAuth = (event) => {
      setAuth(event.target.value);
      const auth1 = event.target.value;
      const filtered = userData.filter(user => user.oauthProvider === auth1);
      setFilteredAuth(filtered);
      setIsFiltered(true);
      if(auth1 === "선택"){
        setIsFiltered(false);
        getAllUser();
      }
  }

  //=============N개 선택시 조회============================
  

  // // 남자/여자 + Y/N - 4개
  // const twoPairSelect = (event1, event2) => {
  //   handleChange(event1) && handleChangeBan(event2);
  // }

  // // 남자/여자 + Y/N + KAKAO/NAVER/GOOGLE - 6개
  // const threePairSelect = (event1, event2, event3) => {
  //   handleChange(event1) && handleChangeBan(event2) && handleChangeAuth(event3);
  // }




  //=============페이지=====================================
  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>회원 관리</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={handleChange}
            >
            <MenuItem value={"선택"}>선택</MenuItem>
            <MenuItem value={"남자"}>남자</MenuItem>
            <MenuItem value={"여자"}>여자</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Banned</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ban}
              label="Banned"
              onChange={handleChangeBan}
            >
            <MenuItem value={"선택"}>선택</MenuItem>
            <MenuItem value={"Y"}>Y</MenuItem>
            <MenuItem value={"N"}>N</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">oAthProvider</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={auth}
              label="oAthProvider"
              onChange={handleChangeAuth}
            >
            <MenuItem value={"선택"}>선택</MenuItem>
            <MenuItem value={"KAKAO"}>KAKAO</MenuItem>
            <MenuItem value={"NAVER"}>NAVER</MenuItem>
            <MenuItem value={"GOOGLE"}>GOOGLE</MenuItem>
            </Select>
          </FormControl>
        </Box>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'Email', 'Name', 'Role', 'oAuthProvider', 'Gender', 'Banned', 'Ban설정'].map(header => (
                <TableCell key={header} sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFiltered
              ? Array.isArray(userData) && filteredAuth.map(user => (
                <TableRow key={user.usersCode}>
                  <TableCell>{user.usersId}</TableCell>
                  <TableCell>{user.usersEmail}</TableCell>
                  <TableCell>{user.usersName}</TableCell>
                  <TableCell>{user.usersRole}</TableCell>
                  <TableCell>{user.oauthProvider}</TableCell>
                  <TableCell>{user.usersGender}</TableCell>
                  <TableCell>{user.usersBan}</TableCell>
                  <TableCell>
                    <Button
                      variant={user.usersBan === 'N' ? "contained" : "outlined"}
                      color={user.usersBan === 'N' ? "error" : "success"}
                      startIcon={user.usersBan === 'N' ? <StopOutlined /> : <CheckCircleOutlined />}
                      onClick={() => changeBanned(user)}
                    >
                      {user.usersBan === 'N' ? "계정 정지" : "계정 활성화"}
                    </Button>
                  </TableCell>
                </TableRow>
                ))
            : Array.isArray(userData) && userData.map(user => (
              <TableRow key={user.usersCode}>
                <TableCell>{user.usersId}</TableCell>
                <TableCell>{user.usersEmail}</TableCell>
                <TableCell>{user.usersName}</TableCell>
                <TableCell>{user.usersRole}</TableCell>
                <TableCell>{user.oauthProvider}</TableCell>
                <TableCell>{user.usersGender}</TableCell>
                <TableCell>{user.usersBan}</TableCell>
                <TableCell>
                  <Button
                    variant={user.usersBan === 'N' ? "contained" : "outlined"}
                    color={user.usersBan === 'N' ? "error" : "success"}
                    startIcon={user.usersBan === 'N' ? <StopOutlined /> : <CheckCircleOutlined />}
                    onClick={() => changeBanned(user)}
                  >
                    {user.usersBan === 'N' ? "계정 정지" : "계정 활성화"}
                  </Button>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
    </>
  );
};

export default AdminUser;
