import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, Paper, TablePagination } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosIns from '../../components/axios';

const MyPageTestResult = () => {
  //====================사용할 변수들=======================
  const navigate = useNavigate();
  const usersCode = sessionStorage.getItem('usersCode');
  const ocrUserCode = sessionStorage.getItem('usersCode');
  const sttUsersCode = sessionStorage.getItem('usersCode');


  const [ocrData, setOcrData] = useState([]);
  const [analyzeData, setAnalyzeData] = useState([]);
  const [chatBotData, setChatBotData] = useState([]);
  const [sttData, setSttData] = useState([]);

  //====================페이징 처리========================
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  //===========테스트 기록 1개 불러오기===================
  const getOneOcr = async (ocrTalksCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneOcr/${ocrTalksCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {ocrTalksCode}});
      const state = {data : response.data};
      navigate('/result-conflict', {state : state})
    } catch (error) {
      console.error("갈등테스트(이미지) 전체 가져오기 실패", error);
    }
  };

  const getOneAnalysis = async (talksCode) => {

    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneAnalysis/${talksCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {talksCode}});
      const state = {data : response.data};
      navigate('/result-conflict', {state : state})
    } catch (error) {
      console.error("갈등테스트(텍스트) 1개 가져오기 실패", error);
    }
  };

  const getOneChatBot = async (emotionReportCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/user/getOneChatbot/${emotionReportCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {emotionReportCode}});
      const state = {data : response.data};
      navigate('/emotionReportPage', { state : state });
    } catch (error) {
      console.error("챗봇-감정분석 전체 가져오기 실패", error);
    }
  };

  const getOneStt = async (sttTalksCode) => {

    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneStt/${sttTalksCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {sttTalksCode}})
      // console.log("sttTalksDate : "+sttTalksCode);
      // console.log("response : "+response);
      // console.log("response.data : "+response.data);
      // console.log("JSONresponse.data : "+ JSON.stringify(response.data, null, 2));
      const state = {data : response.data};
      navigate('/stt-result', {state : state})
    } catch (error) {
      console.error("갈등테스트(음성) 전체 가져오기 실패", error);
    }
  };

  //========1개 선택해서 결과 확인==============
  const handleRowClick = (item) => {
    // 현재 선택된 테스트 종류에 따라 다른 함수 호출
    switch (choose) {
      case '갈등-텍스트':
        getOneAnalysis(item.talksCode); // '갈등-텍스트'에 대한 세부 정보 함수 호출
        break;
      case '갈등-이미지':
        getOneOcr(item.ocrTalksCode); // '갈등-이미지'에 대한 세부 정보 함수 호출
        break;
      case '갈등-음성':
        getOneStt(item.sttTalksCode); // '갈등-음성'에 대한 세부 정보 함수 호출
        break;
      case '챗봇':
        getOneChatBot(item.emotionReportCode); // '챗봇'에 대한 세부 정보 함수 호출
        break;
      default:
        break;
    }
  };


  //===========테스트 기록 전체 불러오기===================
  const getOneOcrAll = async (ocrUserCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneOcrAll/${ocrUserCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {ocrUserCode}});
      setOcrData(response.data);
    } catch (error) {
      console.error("갈등테스트(이미지) 전체 가져오기 실패", error);
    }
  };

  const getOneAnalysisAll = async (usersCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneAnalysisAll/${usersCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {usersCode}});
      setAnalyzeData(response.data);
    } catch (error) {
      console.error("갈등테스트(텍스트) 전체 가져오기 실패", error);
    }
  };

  const getOneChatBotAll = async (usersCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/user/getOneChatbotAll/${usersCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {usersCode}});
      setChatBotData(response.data);
    } catch (error) {
      console.error("챗봇-감정분석 전체 가져오기 실패", error);
    }
  };

  const getOneSttAll = async (sttUsersCode) => {
    try {
      const response = await axiosIns.get(`https://gnat-suited-weekly.ngrok-free.app/api/user/getOneSttAll/${sttUsersCode}`, {
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' }
      }, {params : {sttUsersCode}})
      setSttData(response.data);
    } catch (error) {
      console.error("갈등테스트(음성) 전체 가져오기 실패", error);
    }
  };

  //========전체 결과 확인 할 테스트 종류 선택=============
  const [choose, setChoose] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setChoose(value);
    switch (value) {
      case '갈등-텍스트':
        getOneAnalysisAll(usersCode);
        break;
      case '갈등-이미지':
        getOneOcrAll(ocrUserCode);
        break;
      case '갈등-음성':
        getOneSttAll(sttUsersCode);
        break;
      case '챗봇':
        getOneChatBotAll(usersCode);
        break;
      default:
        break;
    }
  };

  //========테스트별 페이지 수 설정=============
  const dataToDisplay = {
    '갈등-텍스트': analyzeData,
    '갈등-이미지': ocrData,
    '갈등-음성': sttData,
    '챗봇': chatBotData
  }[choose] || [];

  //=============결과화면=====================
  return (
    <Box sx={{ padding: 2, mt: 2, pt: 2 }} >
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
              <TableRow key={item.usersCode || item.ocrUsersCode || item.sttUsersCode} onClick={() => handleRowClick(item)}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
        >
          뒤로가기
        </Button>
    </Box>
  );
};

export default MyPageTestResult;
