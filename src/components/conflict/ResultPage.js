import React from 'react';
import { Box, Typography, Grid, Paper, Container, Card, CardContent, Tooltip, Button, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../../css/conflict/ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};

  const getImageByPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 20) {
      return '/otoo_react/images/낙뢰.png';
    } else if (percentage >= 21 && percentage <= 40) {
      return '/otoo_react/images/비.png';
    } else if (percentage >= 41 && percentage <= 60) {
      return '/otoo_react/images/약간흐림.png';
    } else if (percentage >= 61 && percentage <= 80) {
      return '/otoo_react/images/맑음.png';
    } else if (percentage >= 81 && percentage <= 100) {
      return '/otoo_react/images/무지개.png';
    } else {
      return '';
    }
  };

  const personalityMap = {
    'positive_personality': '맑음이',
    'straightforward_personality': '천둥이',
    'timid_personality': '비돌이'
  };

  const titlesection = () => {
    const names = Object.keys(data.wrong_percentage || {});
    const titleText = names.length === 2 
      ? `${names[0]}님과<br />${names[1]}님의<br />판결 결과입니다` 
      : '판결 결과입니다';
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px', minHeight: '200px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%', minHeight: '220px' }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ fontWeight: 'bold', fontSize: '25px' }} 
                  dangerouslySetInnerHTML={{ __html: titleText }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8} style={{ backgroundImage: 'url(/otoo_react/images/circle2.png)', backgroundSize: '60%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <img src="/otoo_react/images/battle.png" alt="결과 이미지" style={{ maxHeight: '250px', maxWidth: '100%' }} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };

const renderWrongPercentage = () => {
  const names = Object.keys(data.wrong_percentage || {});
  return (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/otoo_react/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#EECA42', fontWeight: 'bold', fontSize: '25px' }}>
                오늘의 <br /> 갈등 일기예보 입니다. <br />누가 더 잘 못했는지 <br /> 알아 보겠습니다.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2} justifyContent={isSmallScreen ? 'center' : 'flex-end'}>
              {names.map(name => (
                <Grid item xs={12} sm={5} key={name} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Card style={{ height: '100%', width: '100%', borderRadius: '15px', minHeight: '320px' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body1" gutterBottom mt={3}>{name}</Typography>
                      <img src="/otoo_react/images/무지개.png" alt={name} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
                      <Typography variant="h6" style={{ fontSize: '2vw' }}>{data.wrong_percentage[name]}%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <img src="/otoo_react/images/weathercaster.png" alt="기상캐스터" style={{ position: 'absolute', bottom: '-50px', left: '-150px', width: '300px', height: 'auto' }} />
      </Paper>
    </Grid>
  );
};

  const renderPersonData = (name) => {
    const mbtiPercentage = data.mbti_tendency_percentage[name];
    const offendedPercentage = data.offended_percentage[name];
    const tactlessPercentage = data.tactless_percentage[name];

    return (
      <Grid item xs={12} key={name} mt={2}>
        <Paper elevation={3} style={{ padding: '24px', marginBottom: '24px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  backgroundImage: 'url(/otoo_react/images/rain3.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  minHeight: '300px',
                  borderRadius: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" mb={5} gutterBottom style={{ fontWeight: 'bold', fontSize: '22px' }}>
                  {name}님의 <br /> 잘못한 비율
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', fontSize: '45px' }}>
                  {data.wrong_percentage[name]}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontSize: '1vw' }}>T 성향</Typography>
                    <img src={getImageByPercentage(mbtiPercentage)} alt="MBTI 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="body1" style={{ fontSize: '2vw' }}>{mbtiPercentage}%</Typography>
                    <Tooltip title="T 성향에 대한 설명입니다." arrow>
                      <Button variant="outlined" style={{ marginTop: '8px' }}>설명보기</Button>
                    </Tooltip>
                  </Paper>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontSize: '1vw' }}>서운함</Typography>
                    <img src={getImageByPercentage(offendedPercentage)} alt="기분 상한 비율 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="body1" style={{ fontSize: '2vw' }}>{offendedPercentage}%</Typography>
                    <Tooltip title="서운함에 대한 설명입니다." arrow>
                      <Button variant="outlined" style={{ marginTop: '8px' }}>설명보기</Button>
                    </Tooltip>
                  </Paper>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontSize: '1vw' }}>눈치없음</Typography>
                    <img src={getImageByPercentage(tactlessPercentage)} alt="눈치 없는 비율 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="body1" style={{ fontSize: '2vw' }}>{tactlessPercentage}%</Typography>
                    <Tooltip title="눈치에 대한 설명입니다." arrow>
                      <Button variant="outlined" style={{ marginTop: '8px' }}>설명보기</Button>
                    </Tooltip>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  const renderConflictCausePercentage = () => (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Typography variant="h6" gutterBottom>갈등 원인 비율</Typography>
        {Object.entries(data.conflict_cause_percentage || {}).map(([cause, percentage]) => (
          <Typography key={cause}>{cause}: {percentage}%</Typography>
        ))}
      </Paper>
    </Grid>
  );

  const renderPriorityKeywords = () => {
    const names = Object.keys(data.priority_keywords || {});
    const renderTable = (name, keywords, color) => (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">키워드</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keywords.map((keyword, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}위</TableCell>
              <TableCell align="center" style={{ backgroundColor: color }}>{keyword}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  
    const images = [
      { src: "/otoo_react/images/yumi2.png", width: '110px', height: 'auto' }, // 첫 번째 이미지 크기
      { src: "/otoo_react/images/yumi.png", width: '90px', height: 'auto' }  // 두 번째 이미지 크기
    ];
  
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px', position: 'relative' }}>
          <Typography variant="h6" gutterBottom>우선 순위 키워드</Typography>
          <Grid container spacing={3}>
            {names.map((name, index) => (
              <Grid item xs={12} sm={6} key={name} style={{ position: 'relative' }}>
                {renderTable(name, data.priority_keywords[name], index === 0 ? '#cfe8fc' : '#f8d7da')}
                <img
                  src={images[index].src}
                  alt="일러스트"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: index === 1 ? '10px' : 'auto',
                    right: index === 0 ? '10px' : 'auto',
                    width: images[index].width,
                    height: images[index].height,
                    zIndex: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    );
  };

  
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderConflictResolutionAdvice = () => (
    <Grid item xs={12} mb={5}>
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Typography variant="h6" gutterBottom>갈등 해결 조언</Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
          {Object.keys(data.conflict_resolution_advice || {}).map((personality, index) => (
            <Tab key={personality} label={personalityMap[personality]} />
          ))}
        </Tabs>
        {Object.entries(data.conflict_resolution_advice || {}).map(([personality, advice], index) => (
          <Box key={personality} mb={2} hidden={selectedTab !== index}>
            <Typography variant="subtitle1">{personalityMap[personality]}가 알려드립니다!</Typography>
            <Typography>{advice}</Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Grid container spacing={3}>
          {data.wrong_percentage && titlesection()}
          {data.wrong_percentage && renderWrongPercentage()}
          {Object.keys(data.wrong_percentage || {}).map((name) => renderPersonData(name))}
          {data.priority_keywords && renderPriorityKeywords()}
          {data.conflict_cause_percentage && renderConflictCausePercentage()}
          {data.conflict_resolution_advice && renderConflictResolutionAdvice()}
        </Grid>
      </Box>
    </Container>
  );
};

export default ResultPage;
