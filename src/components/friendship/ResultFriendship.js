import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Container, Table, TableHead, TableRow, TableCell, TableBody, ThemeProvider, useMediaQuery, useTheme , Card , CardContent} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from "../../theme";
import 'chart.js/auto'; 
import { CustomPaper, AttributeCard, TitleSection } from '../conflict/CommonComponentsConflict';
import FeedbackModal from '../FeedbackModal';

const ResultFriendship = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jsonData } = location.state || {};
  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};
  const theme1 = useTheme();
  const isSmallScreen = useMediaQuery(theme1.breakpoints.down('sm'));

  useEffect(() => {
    const movePage = async () => {
      navigate('/result-friendship-to-love', { state: { data } });
    }

    const test = Object.keys(data.friendship_likeability || {});
    if(data.friendship_likeability[test[0]].score>=80 || data.friendship_likeability[test[1]].score>=80)
    {
         movePage();
    }
  });

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
    const names = Object.keys(data.total_score || {});
    
    return names.length === 2 
      ? `${names[0]}님과<br />${names[1]}님의<br />친구 관계입니다` 
      : '친구 관계입니다';
  };

  // 전체 통계 
  const renderTotalScorePercentage = () => {
    const names = Object.keys(data.total_score || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/otoo_react/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius:'35px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Typography variant="hc_bold" color="dyellow" gutterBottom >
                우리의 친밀도를<br />알려드립니다.<br />누가 더 친한지<br />알아 보겠습니다.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2} justifyContent={isSmallScreen ? 'center' : 'flex-end'}>
                {names.map(name => (
                  <Grid item xs={12} sm={5} key={name} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Card style={{ height: '100%', width: '100%', borderRadius: '15px', minHeight: '320px' }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h3_bold" color="gray900" gutterBottom mt={3}>{name}</Typography>
                        <img src={getImageByPercentage(data.total_score[name])} alt={name} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
                        <Typography variant="h3_bold" color="gray600">{data.total_score[name]}%</Typography>
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
    const sacrificeScore = data.friendship_sacrifice[name].score;
    const sacrificeReason = data.friendship_sacrifice[name].reason;
    const comfortableScore = data.friendship_comfortable[name].score;
    const comfortableReason = data.friendship_comfortable[name].reason;
    const betrayerScore = data.friendship_betrayer[name].score;
    const betrayerReason = data.friendship_betrayer[name].reason;
    const totalScore = data.total_score[name];
    const style = getStyleByTotalscore(totalScore);

  
    const attributes = [
      {
        title: '배려심',
        percentage: sacrificeScore,
        tooltip: sacrificeReason,
      },
      {
        title: '편한 느낌',
        percentage: comfortableScore,
        tooltip: comfortableReason,
      },
      {
        title: '배신 가능성',
        percentage: betrayerScore,
        tooltip: betrayerReason,
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
                  {name}님의 <br /> 우정도
                </Typography>
                <Typography variant="h1_bold" color={style.color} gutterBottom>
                  {totalScore}%
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
  const renderBiggestSentimental = () => {
    const names = Object.keys(data.friendship_Biggest_Sentimental || {});
    const renderTable = (name, keywords, color) => (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">감정</TableCell>
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
      { src: "/otoo_react/images/yumi2.png", width: '70px', height: 'auto' }, // 첫 번째 이미지 크기
      { src: "/otoo_react/images/yumi.png", width: '70px', height: 'auto' }  // 두 번째 이미지 크기
    ];
  
    return (
      <Grid item xs={12}>
        <CustomPaper style={{ position: 'relative' }}>
          <Typography variant="title_bold" gutterBottom>감정 순위 키워드</Typography>
          <Grid container spacing={3}>
            {names.map((name, index) => (
              <Grid item xs={12} sm={6} key={name} style={{ position: 'relative' }}>
                {renderTable(name, data.friendship_Biggest_Sentimental[name], index === 0 ? '#ECD3D8' : '#0495D2')}
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


  //전체 리턴
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid container spacing={3} mt={5}>
              {data.total_score && <TitleSection titleText={titleText()} imgSrc="/otoo_react/images/friendship-2.png" imgAlt="결과 이미지" />}
              {data.total_score && renderTotalScorePercentage()}
              {Object.keys(data.total_score || {}).map((name) => renderPersonData(name))}
              {data.friendship_Biggest_Sentimental && renderBiggestSentimental()}
            </Grid>
          </Box>
          <FeedbackModal/>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultFriendship;
