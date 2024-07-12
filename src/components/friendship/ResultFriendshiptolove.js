import React from 'react';
import { Box, Typography, Grid, Paper, Container, Table, TableHead, TableRow, TableCell, TableBody, ThemeProvider, useMediaQuery, useTheme , Card , CardContent} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import theme from "../../theme";
import 'chart.js/auto'; 
import FriendshipButton from './FriendshipButton';
import { CustomPaper, TitleSection } from '../conflict/CommonComponentsConflict';

const btnloveLabel = "사랑테스트 하러 가기";

const ResultFriendshiptolove = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const theme1 = useTheme();
  const isSmallScreen = useMediaQuery(theme1.breakpoints.down('sm'));
  const navigate = useNavigate();

  const moveToLove = () => {
    navigate('/upload-love')
  };

  //비율별 날씨아이콘
  const getImageByPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 20) return '/otoo_react/images/낙뢰.png';
    if (percentage >= 21 && percentage <= 40) return '/otoo_react/images/비.png';
    if (percentage >= 41 && percentage <= 50) return '/otoo_react/images/구름.png';
    if (percentage >= 51 && percentage <= 60) return '/otoo_react/images/약간흐림.png';
    if (percentage >= 61 && percentage <= 80) return '/otoo_react/images/맑음.png';
    if (percentage >= 81 && percentage <= 100) return '/otoo_react/images/무지개.png';
    return '';
  };

  // 결과페이지 타이틀
  const titleText = () => {
    const names = Object.keys(data.friendship_likeability || {});
    return names.length === 2
      ? `${names[0]}님과<br />${names[1]}님의<br />판결 결과입니다` 
      : '판결 결과입니다';
  };

  // 전체 통계 
  const renderLikeability = () => {
    const names = Object.keys(data.friendship_likeability || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px', backgroundImage: 'url(/otoo_react/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius:'35px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Typography variant="hc_bold" color="dyellow" gutterBottom >
                  오늘의 <br /> 사랑 일기예보 입니다. <br />누가 더 사랑하는지 <br /> 알아 보겠습니다.
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
                        <img src={getImageByPercentage(data.friendship_likeability[name].score)} alt={name} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
                        <Typography variant="h1_bold" color="gray600" style={{ fontSize: '2vw' }}>{data.friendship_likeability[name].score}점</Typography>
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

  // 사랑이라는 감정이 가장 크게 드러나는 문장 Top5
  const renderLikeabilityScript = () => {
    const names = Object.keys(data.friendship_likeability_script || {});
    const renderTable = (name, keywords, color) => (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">문장</TableCell>
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
          <Typography variant="title_bold" gutterBottom>사랑이 가득 담긴 문장 순위</Typography>
          <Grid container spacing={3}>
            {names.map((name, index) => (
              <Grid item xs={12} sm={6} key={name} style={{ position: 'relative' }}>
                {renderTable(name, data.friendship_likeability_script[name], index === 0 ? '#ECD3D8' : '#0495D2')}
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
              {data.friendship_likeability && <TitleSection titleText={titleText()} imgSrc="/otoo_react/images/main_love.png" imgAlt="결과 이미지" />}
              {data.friendship_likeability && renderLikeability()}
              {data.friendship_likeability_script && renderLikeabilityScript()}
            </Grid>
          </Box>
          <br /> <br />
          <div htmlFor="raised-button-file" align = 'center'>
              <FriendshipButton
                style={{align : 'center', position : 'center'}}
                label={btnloveLabel}
                onClick={moveToLove}
                disabled={false} // 파일 선택 여부와 관계없이 기본 색상을 유지하도록
                className="conflict-btn-upload"
              />
          </div>
        </div>
        <br /> <br />
      </ThemeProvider>
    </Container>
  );
};

export default ResultFriendshiptolove;
