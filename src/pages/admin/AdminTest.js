import React, { useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, Paper, TablePagination } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosIns from '../../components/axios';

const AdminTest = () => {

  // 데이터 상태 선언
  const [ocrData, setOcrData] = useState([]);
  const [analyzeData, setAnalyzeData] = useState([]);
  const [chatBotData, setChatBotData] = useState([]);
  const [sttData, setSttData] = useState([]);

  // 페이징 처리 상태 선언
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // 테스트 데이터 조회 함수
  const getAllOcr = async () => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/admin/getAllOcr`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      });
      setOcrData(response.data);
      console.log("갈등테스트(이미지) : "+response);
      console.log("갈등테스트(이미지) 상세 : "+response.data);
      console.log("JSONresponse.data : "+ JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("갈등테스트(이미지) 전체 가져오기 실패", error);
    }
  };

  const getAllAnalysis = async () => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/admin/getAllAnalysis`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      });
      setAnalyzeData(response.data);
      console.log("갈등테스트(텍스트) : "+response);
      console.log("갈등테스트(텍스트) 상세 : "+response.data);
      console.log("JSONresponse.data : "+ JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("갈등테스트(텍스트) 전체 가져오기 실패", error);
    }
  };

  const getAllChatBot = async () => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/admin/getAllChatbot`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      });
      setChatBotData(response.data);
      console.log("챗봇 데이터 : "+response);
      console.log("챗봇 데이터 상세 : "+response.data);
      console.log("JSONresponse.data : "+ JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("챗봇-감정분석 전체 가져오기 실패", error);
    }
  };

  const getAllStt = async () => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/admin/getAllStt`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      });
      setSttData(response.data);
      console.log("갈등테스트(음성) : "+response);
      console.log("갈등테스트(음성) 상세 : "+response.data);
      console.log("JSONresponse.data : "+ JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("갈등테스트(음성) 전체 가져오기 실패", error);
    }
  };

  // 선택된 테스트 종류에 따른 데이터 로딩
  const [choose, setChoose] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setChoose(value);
    switch (value) {
      case '갈등-텍스트':
        getAllAnalysis();
        break;
      case '갈등-이미지':
        getAllOcr();
        break;
      case '갈등-음성':
        getAllStt();
        break;
      case '챗봇':
        getAllChatBot();
        break;
      default:
        break;
    }
  };

  // 데이터의 길이에 따른 페이지 수 설정
  const dataToDisplay = {
    '갈등-텍스트': analyzeData,
    '갈등-이미지': ocrData,
    '갈등-음성': sttData,
    '챗봇': chatBotData
  }[choose] || [];

  //=============페이지=====================================
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>내 테스트 결과 확인</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">테스트 종류 선택</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={choose}
            label="Choose"
            onChange={handleChange}
          >
            <MenuItem value={"선택"}>선택</MenuItem>
            <MenuItem value={"갈등-텍스트"}>갈등테스트-텍스트</MenuItem>
            <MenuItem value={"갈등-이미지"}>갈등테스트-이미지</MenuItem>
            <MenuItem value={"갈등-음성"}>갈등테스트-음성</MenuItem>
            <MenuItem value={"챗봇"}>챗봇&감정분석보고서</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br /><br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['번호', '테스트 날짜', '테스트종류'].map(header => (
                <TableCell key={header} sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.usersCode || item.ocrUsersCode || item.sttUsersCode}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{choose === '갈등-텍스트' ? item.talksDate :
                            choose === '갈등-이미지' ? item.ocrTalksDate :
                            choose === '갈등-음성' ? item.sttTalksDate :
                            choose === '챗봇' ? item.emotionReportDate : ''}</TableCell>
                <TableCell>{choose === '갈등-텍스트' ? '갈등테스트(텍스트)' :
                            choose === '갈등-이미지' ? '갈등테스트(이미지)' :
                            choose === '갈등-음성' ? '갈등테스트(음성)' :
                            choose === '챗봇' ? '챗봇-감정분석' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataToDisplay.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminTest;
