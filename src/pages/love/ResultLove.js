import React from 'react';
import { Box, Typography, Grid, Paper, Container, Card, CardContent, Tooltip, Button, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery, useTheme, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import theme from '../../theme';
import FeedbackModal from '../../components/modal/FeedbackModal';

const getLoveMessage = (total_score) => {
    const keys = Object.keys(total_score);
    if (keys.length !== 2) {
        return '';
    }
    const [firstKey, secondKey] = keys;
    const firstScore = total_score[firstKey];
    const secondScore = total_score[secondKey];
    if (firstScore > secondScore) {
        return (
            <>
                {firstKey}님이<br />
                {secondKey}님을 더<br />
                좋아합니다.
            </>
        );
    } else if (firstScore < secondScore) {
        return (
            <>
                {secondKey}님이<br />
                {firstKey}님을 더<br />
                좋아합니다.
            </>
        );
    } else {
        return (
            <>
                {firstKey}님과<br />
                {secondKey}님은 서로<br />
                좋아합니다.
            </>
        );
    }
};

const InfoCard = ({ title, imageSrc, percentage, tooltipTitle }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <Paper
                elevation={3}
                style={{
                    padding: '16px',
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3_bold" gutterBottom>
                    {title}
                </Typography>
                <img
                    src={imageSrc}
                    alt={`${title} 이미지`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '150px',
                        objectFit: 'cover',
                        marginBottom: '16px',
                        flexGrow: 1,
                    }}
                />
                <Typography variant="h2_bold">{percentage}%</Typography>
                <Tooltip title={tooltipTitle} arrow>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginTop: '8px',
                            borderColor: '0495D2',
                            color: '0495D2',
                            '&:hover': {
                                borderColor: '0350B7',
                                color: '0350B7',
                            },
                            fontSize: isSmallScreen ? '8px' : '16px',
                            padding: isSmallScreen ? '5px' : '10px',
                        }}
                    >
                        설명보기
                    </Button>
                </Tooltip>
            </Paper>
        </Grid>
    );
};

const createUserData = (user, data) => {
    return [
        {
            title: "너만을 생각해",
            percentage: data.support[user].score,
            tooltipTitle: data.support[user].reason,
        },
        {
            title: "바람기",
            percentage: data.cheat[user].score,
            tooltipTitle: data.cheat[user].reason,
        },
        {
            title: "19금력",
            percentage: data.sexual[user].score,
            tooltipTitle: data.sexual[user].reason,
        },
    ];
};

const getImageByPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 10) {
        return '/images/낙뢰.png';
    } else if (percentage >= 11 && percentage <= 20) {
        return '/images/비.png';
    } else if (percentage >= 21 && percentage <= 30) {
        return '/images/구름.png';
    } else if (percentage >= 31 && percentage <= 45) {
        return '/images/약간흐림.png';
    } else if (percentage >= 46 && percentage <= 59) {
        return '/images/맑음.png';
    } else if (percentage >= 60 && percentage <= 80) {
        return '/images/무지개.png';
    } else {
        return '';
    }
};

const getStyleByTotalscore = (percentage) => {
    if (percentage >= 0 && percentage <= 10) {
        return {
            imageUrl: '/images/낙뢰하늘사진.jpg',
            color: theme.palette.gray200
        };
    } else if (percentage >= 11 && percentage <= 20) {
        return {
            imageUrl: '/images/비하늘사진.jpg',
            color: theme.palette.gray900
        };
    } else if (percentage >= 21 && percentage <= 45) {
        return {
            imageUrl: '/images/흐린하늘사진.png',
            color: theme.palette.gray900
        };
    } else if (percentage >= 46 && percentage <= 100) {
        return {
            imageUrl: '/images/맑은하늘사진.jpg',
            color: theme.palette.gray200
        };
    } else {
        return {
            imageUrl: '',
            color: '#000000' // 기본 색상 (검정색)
        };
    }
};

const renderTable = (name, keywords, color) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="center" colSpan={2}>
                    <Typography variant='h3_mid'>{name}</Typography></TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">
                    <Typography variant='body1'>
                        순위
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography variant='body1'>
                        키워드
                    </Typography>
                </TableCell>
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
    { src: "/images/yumi2.png", width: '90px', height: 'auto' }, // 첫 번째 이미지 크기
    { src: "/images/yumi.png", width: '90px', height: 'auto' }  // 두 번째 이미지 크기
];

const ResultLove = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData || null;
  const result = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};
  const theme1 = useTheme();
  const isSmallScreen = useMediaQuery(theme1.breakpoints.down('sm'));
  const type = 'love';
  if (!result) {
    return <div>No result data</div>;
  }

  const loveMessage = getLoveMessage(result.total_score);
  const names = Object.keys(result.total_score || {});

    return (
        <Container maxWidth="lg">
            <ThemeProvider theme={theme}>
                <div style={{ fontFamily: theme.typography.fontFamily }}>

                    {/* total_score */}
                    <Grid item xs={12}>
                        <Paper elevation={4} style={{ marginBottom: '24px', borderRadius: '35px' }}>
                            <Box mt={8}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={12} sm={4}>
                                        <Box ml={5}>
                                            <Grid container
                                                alignItems="center"
                                                style={{ height: '100%', minHeight: '220px' }}>
                                                {loveMessage && (
                                                    <Typography variant="h1_bold">{loveMessage}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                                            <img src='/images/main_love.png'
                                                alt="Love"
                                                style={{ maxWidth: '100%', maxHeight: '220px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* weather_total_score */}
                    <Grid item xs={12}>
                        <Paper elevation={4} style={{ marginBottom: '24px', backgroundImage: 'url(/images/맑은배경.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '320px', position: 'relative', borderRadius: '35px' }}>
                            <Box p={5}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={12} sm={4}>
                                        <Grid container
                                            alignItems="center"
                                            style={{ height: '100%', minHeight: '220px' }}>
                                            <Typography variant="h1_bold" color="dyellow" gutterBottom >
                                                우리들의 <br /> 애정 전선 입니다. <br />누가 더 좋아하는지 <br /> 알아 보겠습니다.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Grid container spacing={2} justifyContent={isSmallScreen ? 'center' : 'flex-end'}>
                                            {names.map(name => (
                                                <Grid item xs={12} sm={5} key={name} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Card style={{ height: '100%', width: '100%', borderRadius: '15px', minHeight: '320px' }}>
                                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <Typography variant="title_bold" gutterBottom mt={3}>{name}</Typography>
                                                            <img src={getImageByPercentage(result.total_score[name])} alt="" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px' }} />
                                                            <Typography variant="title_bold" color="gray600" >{result.total_score[name]}%</Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <img src="/images/weathercaster.png" alt="기상캐스터" style={{ position: 'absolute', bottom: '-17px', left: '-115px', width: '250px', height: 'auto' }} />
                        </Paper>
                    </Grid>

                    {/* compare_score */}
                    <Grid item xs={12} mt={2}>
                        {names.map((name) => {
                            const { imageUrl, color } = getStyleByTotalscore(result.total_score[name]);

                            return (
                                <Paper elevation={3} style={{ marginBottom: '24px', borderRadius: '35px', minHeight: '320px' }} key={name}>
                                    <Box p={5}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={12} sm={4} textAlign="center">
                                                <Paper
                                                    elevation={3}
                                                    style={{
                                                        padding: '16px',
                                                        backgroundImage: `url(${imageUrl})`,
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
                                                    <Typography variant="h1_bold" style={{ color }} mb={5} gutterBottom>
                                                        {name}님의 <br /> 애정도
                                                    </Typography>
                                                    <Typography variant="h1_bold" style={{ color }} gutterBottom>
                                                        {result.total_score[name]}%
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Grid container spacing={2}>
                                                    {createUserData(name, result).map((item, index) => (
                                                        <InfoCard
                                                            key={index}
                                                            title={item.title}
                                                            imageSrc={getImageByPercentage(item.percentage)}
                                                            percentage={item.percentage}
                                                            tooltipTitle={item.tooltipTitle}
                                                        />
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Grid>

                    {/* interest_score */}
                    <Grid item xs={12}>
                        <Paper elevation={4} style={{ position: 'relative', borderRadius: '35px' }}>
                            <Box p={5}>
                                <Typography variant="title_bold" gutterBottom>
                                    우선 순위 키워드
                                </Typography>
                                <Grid container spacing={3}>
                                    {names.map((name, index) => (
                                        <Grid item xs={12} sm={6} key={name} style={{ position: 'relative' }}>
                                            {renderTable(name, result.interest[name], index === 0 ? '#ECD3D8' : '#0495D290')}
                                            <img
                                                src={images[index].src}
                                                alt="일러스트"
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: index === 1 ? '10px' : 'auto',
                                                    right: index === 0 ? '10px' : 'auto',
                                                    width: isSmallScreen ? '50px' : images[index].width,
                                                    height: images[index].height,
                                                    zIndex: 1
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <FeedbackModal feedbackType={type}/>
                    <br></br>
                </div>
            </ThemeProvider>
        </Container>
    );
};

export default ResultLove;
