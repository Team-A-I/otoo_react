import React from 'react';
import { Box, Typography, Grid, Paper, Container, Card, CardContent, Tooltip, Button, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab, useMediaQuery, useTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../../css/conflict/ResultPage.css';
import theme from "../../theme"
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 

const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};
  const theme1 = useTheme();
  const isSmallScreen = useMediaQuery(theme1.breakpoints.down('sm'));
  
  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};

  const getImageByPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 20) {
      return '/otoo_react/images/무지개.png';
    } else if (percentage >= 21 && percentage <= 40) {
      return '/otoo_react/images/맑음.png';
    } else if (percentage >= 41 && percentage <= 50) {
      return '/otoo_react/images/약간흐림.png';
    } else if (percentage >= 51 && percentage <= 60) {
      return '/otoo_react/images/구름.png';
    } else if (percentage >= 61 && percentage <= 80) {
      return '/otoo_react/images/비.png';
    } else if (percentage >= 81 && percentage <= 100) {
      return '/otoo_react/images/낙뢰.png';
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
        <Paper elevation={4} sx={{borderRadius:'35px'}}>
          <Box>
          <Grid container alignItems="flex-start">
            <Grid item xs={12} sm={4}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%', minHeight: '220px' , marginLeft: 0}}>
                <Typography 
                  variant="hc_bold" color="gray900" 
                  gutterBottom 
                  dangerouslySetInnerHTML={{ __html: titleText }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <img src="/otoo_react/images/갈등AI.png" alt="결과 이미지" style={{ maxHeight: '220px', maxWidth: '100%' }} />
              </Grid>
            </Grid>
          </Grid>
          </Box>
        </Paper>
      </Grid>
    );
  };

const renderWrongPercentage = () => {
  const names = Object.keys(data.wrong_percentage || {});
  return (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/otoo_react/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius:'35px' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <Typography variant="hc_bold" color="dyellow" gutterBottom >
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
                      <Typography variant="title_bold" color="gray900" gutterBottom mt={3}>{name}</Typography>
                      <img src="/otoo_react/images/무지개.png" alt={name} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
                      <Typography variant="h1_bold" color="gray600" style={{ fontSize: '2vw' }}>{data.wrong_percentage[name]}%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <img src="/otoo_react/images/weathercaster.png" alt="기상캐스터" style={{ position: 'absolute', bottom: '-17px', left: '-115px', width: '250px', height: 'auto' }} />
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
        <Paper elevation={3} style={{ padding: '24px', marginBottom: '24px' ,borderRadius:'35px'}}>
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
                  minHeight: '260px',
                  borderRadius: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h1_bold" color="gray900" mb={5} gutterBottom>
                  {name}님의 <br /> 잘못한 비율
                </Typography>
                <Typography variant="h1_bold" color="gray900"gutterBottom >
                  {data.wrong_percentage[name]}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h3_bold" gutterBottom >T라 미숙해</Typography>
                    <img src={getImageByPercentage(mbtiPercentage)} alt="MBTI 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="h1_bold">{mbtiPercentage}%</Typography>
                    <Tooltip title="T 성향에 대한 상대방과 비교한 비율입니다." arrow>
                      <Button 
                          variant="outlined" 
                          sx={{ 
                            marginTop: '8px', 
                            borderColor: '0495D2', 
                            color: '0495D2',
                            '&:hover': {
                              borderColor: '0350B7',
                              color: '0350B7',
                            } 
                          }}
                        >
                          설명보기
                        </Button>
                    </Tooltip>
                  </Paper>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h3_bold" gutterBottom >서운함</Typography>
                    <img src={getImageByPercentage(offendedPercentage)} alt="기분 상한 비율 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="h1_bold" >{offendedPercentage}%</Typography>
                    <Tooltip title="누가 더 서운한지 상대방과 비교한 비율입니다." arrow>
                      <Button 
                          variant="outlined" 
                          sx={{ 
                            marginTop: '8px', 
                            borderColor: '0495D2', 
                            color: '0495D2',
                            '&:hover': {
                              borderColor: '0350B7',
                              color: '0350B7',
                            } 
                          }}
                        >
                          설명보기
                        </Button>
                    </Tooltip>
                  </Paper>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Typography variant="h3_bold" gutterBottom >눈치없음</Typography>
                    <img src={getImageByPercentage(tactlessPercentage)} alt="눈치 없는 비율 이미지" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
                    <Typography variant="h1_bold">{tactlessPercentage}%</Typography>
                    <Tooltip title="누가 더 눈치없는지 상대방과 비교한 비율입니다." arrow>
                      <Button 
                        variant="outlined" 
                        sx={{ 
                          marginTop: '8px', 
                          borderColor: '0495D2', 
                          color: '0495D2',
                          '&:hover': {
                            borderColor: '0350B7',
                            color: '0350B7',
                          } 
                        }}
                      >
                        설명보기
                      </Button>
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

  const renderConflictCausePercentage = () => {
    if (!data || !data.conflict_cause_percentage) {
      return null;
    }
  
    const labels = Object.keys(data.conflict_cause_percentage);
    const values = Object.values(data.conflict_cause_percentage);
  
    const getColor = (index) => {
      const colors = [
        'rgba(236, 211, 216, 1)',
        'rgba(255, 207, 170, 1)',
        'rgba(238, 202, 66, 1)',
        'rgba(4, 149, 210, 1)',
        'rgba(3, 80, 183, 1)',
        'rgba(250, 227, 0, 1)',
      ];
      return colors[index % colors.length];
    };
  
    const chartData = {
      labels: ['갈등 원인'],
      datasets: labels.map((label, index) => ({
        label,
        data: [values[index]],
        backgroundColor: getColor(index),
      })),
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          max: 100,
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px', borderRadius: '35px' }}>
          <Typography variant="title_bold" gutterBottom>갈등 원인 비율</Typography>
          <div style={{ height: '100px' }}> 
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Paper>
      </Grid>
    );
  };

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
        <Paper elevation={3} style={{ padding: '24px', position: 'relative' ,borderRadius:'35px'}}>
          <Typography variant="title_bold" gutterBottom>우선 순위 키워드</Typography>
          <Grid container spacing={3}>
            {names.map((name, index) => (
              <Grid item xs={12} sm={6} key={name} style={{ position: 'relative' }}>
                {renderTable(name, data.priority_keywords[name], index === 0 ? '#ECD3D8' : '#0495D2')}
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
      <Paper elevation={3} style={{ padding: '24px',borderRadius:'35px' }}>
        <Typography variant="title_bold" gutterBottom>갈등 해결 조언</Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
          {Object.keys(data.conflict_resolution_advice || {}).map((personality, index) => (
            <Tab key={personality} label={personalityMap[personality]} />
          ))}
        </Tabs>
        {Object.entries(data.conflict_resolution_advice || {}).map(([personality, advice], index) => (
          <Box key={personality} mb={1} mt={3} hidden={selectedTab !== index}>
            <Typography variant="sub_bold" >{personalityMap[personality]}가 알려드립니다! <br/><br/></Typography>
            <Typography sx={{ marginBottom: '16px' }}>{advice}</Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );
  

  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid container spacing={3} mt={3}>
              {data.wrong_percentage && titlesection()}
              {data.wrong_percentage && renderWrongPercentage()}
              {Object.keys(data.wrong_percentage || {}).map((name) => renderPersonData(name))}
              {data.priority_keywords && renderPriorityKeywords()}
              {data.conflict_cause_percentage && renderConflictCausePercentage()}
              {data.conflict_resolution_advice && renderConflictResolutionAdvice()}
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultPage;
