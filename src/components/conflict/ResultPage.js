import React from 'react';
import { Box, Typography, Grid, Paper, Container, Table, TableHead, TableRow, TableCell, TableBody, Tabs, Tab, ThemeProvider, useMediaQuery, useTheme , Card , CardContent} from '@mui/material';
import { useLocation } from 'react-router-dom';
import theme from "../../theme";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { CustomPaper, AttributeCard, TitleSection } from './CommonComponentsConflict';

const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};
  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};
  const theme1 = useTheme();
  const isSmallScreen = useMediaQuery(theme1.breakpoints.down('sm'));

  //성격별 캐릭터
  const personalityMap = {
    'positive_personality': '맑음이',
    'straightforward_personality': '천둥이',
    'timid_personality': '흐림이'
  };

  //비율별 날씨아이콘
  const getImageByPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 20) return '/otoo_react/images/무지개.png';
    if (percentage >= 21 && percentage <= 40) return '/otoo_react/images/맑음.png';
    if (percentage >= 41 && percentage <= 50) return '/otoo_react/images/약간흐림.png';
    if (percentage >= 51 && percentage <= 60) return '/otoo_react/images/구름.png';
    if (percentage >= 61 && percentage <= 80) return '/otoo_react/images/비.png';
    if (percentage >= 81 && percentage <= 100) return '/otoo_react/images/낙뢰.png';
    return '';
  };

  //비율별 배경이미지&텍스트
  const getStyleByTotalscore = (percentage) => {
    if (percentage >= 0 && percentage <= 10) {
      return {
        imageUrl: '/otoo_react/images/낙뢰하늘사진.jpg',
        color: theme.palette.gray200
      };
    } else if (percentage >= 11 && percentage <= 20) {
      return {
        imageUrl: '/otoo_react/images/비하늘사진.jpg',
        color: theme.palette.gray900
      };
    } else if (percentage >= 21 && percentage <= 45) {
      return {
        imageUrl: '/otoo_react/images/흐린하늘사진.png',
        color: theme.palette.gray900
      };
    } else if (percentage >= 46 && percentage <= 100) {
      return {
        imageUrl: '/otoo_react/images/맑은하늘사진.jpg',
        color: theme.palette.gray200
      };
    } else {
      return {
        imageUrl: '',
        color: '#000000' // 기본 색상 (검정색)
      };
    }
  };

  // 결과페이지 타이틀
  const titleText = () => {
    const names = Object.keys(data.wrong_percentage || {});
    return names.length === 2 
      ? `${names[0]}님과<br />${names[1]}님의<br />판결 결과입니다` 
      : '판결 결과입니다';
  };


  // 전체 통계 
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
                        <img src={getImageByPercentage(data.wrong_percentage[name])} alt={name} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
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


  // 세부분석
  const renderPersonData = (name) => {
    const mbtiPercentage = data.mbti_tendency_percentage[name];
    const offendedPercentage = data.offended_percentage[name];
    const tactlessPercentage = data.tactless_percentage[name];
    const wrongPercentage = data.wrong_percentage[name];
    const style = getStyleByTotalscore(wrongPercentage);
  
    const attributes = [
      {
        title: 'T라 미숙해',
        percentage: mbtiPercentage,
        tooltip: 'T 성향에 대한 상대방과 비교한 비율입니다.',
      },
      {
        title: '서운함',
        percentage: offendedPercentage,
        tooltip: '누가 더 서운한지 상대방과 비교한 비율입니다.',
      },
      {
        title: '눈치없음',
        percentage: tactlessPercentage,
        tooltip: '누가 더 눈치없는지 상대방과 비교한 비율입니다.',
      },
    ];
  
    return (
      <Grid item xs={12} key={name}>
        <CustomPaper>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  backgroundImage: `url(${style.imageUrl})`,
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
                <Typography variant="h1_bold" color={style.color} gutterBottom>
                  {name}님의 <br /> 잘못한 비율
                </Typography>
                <Typography variant="h1_bold" color={style.color} gutterBottom>
                  {wrongPercentage}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3} alignItems="stretch">
                {attributes.map((attr, index) => (
                  <Grid item xs={4} key={index}>
                    <AttributeCard
                      title={attr.title}
                      percentage={attr.percentage}
                      tooltip={attr.tooltip}
                      imageSrc={getImageByPercentage(attr.percentage)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CustomPaper>
      </Grid>
    );
  };

  
  // Top5 키워드
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
        <CustomPaper style={{ position: 'relative' }}>
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
        </CustomPaper>
      </Grid>
    );
  };
 

  //갈등 원인
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
        <CustomPaper>
          <Typography variant="title_bold" gutterBottom>갈등 원인 비율</Typography>
          <div style={{ height: '100px' }}> 
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CustomPaper>
      </Grid>
    );
  };


  
  //갈등 해결조언

  
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderConflictResolutionAdvice = () => (
    <Grid item xs={12} mb={5}>
      <CustomPaper>
        <Typography variant="title_bold" gutterBottom>갈등 해결 조언</Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
          {Object.keys(data.conflict_resolution_advice || {}).map((personality, index) => (
            <Tab key={personality} label={personalityMap[personality]} />
          ))}
        </Tabs>
        {Object.entries(data.conflict_resolution_advice || {}).map(([personality, advice], index) => (
          <Box key={personality} mb={1} mt={3} hidden={selectedTab !== index}>
            <Typography variant="sub_bold">{personalityMap[personality]}가 알려드립니다! <br /><br /></Typography>
            <Typography sx={{ marginBottom: '16px' }}>{advice}</Typography>
          </Box>
        ))}
      </CustomPaper>
    </Grid>
  );


  //전체 리턴
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid container spacing={3} mt={5}>
              {data.wrong_percentage && <TitleSection titleText={titleText()} imgSrc="/otoo_react/images/갈등AI.png" imgAlt="결과 이미지" />}
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
