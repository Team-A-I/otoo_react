import { Card, CardContent, Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const weatherData = [
  {
    name: '김현석',
    temperature: '40°',
    details: [
      { icon: <CloudIcon />, score: '50점', text: '어느정도는 너를 먼저 생각할 수 있어' },
      { icon: <ThunderstormIcon />, score: '10점', text: '마라탕은 안돼!' },
      { icon: <WbSunnyIcon />, score: '70점', text: '우쭐할까? 너를 볼때?' },
    ],
  },
  {
    name: '배정현',
    temperature: '60°',
    details: [
      { icon: <CloudIcon />, score: '50점', text: '어느정도는 너를 먼저 생각할 수 있어' },
      { icon: <WbSunnyIcon />, score: '10점', text: '마라탕은 안돼!' },
      { icon: <ThunderstormIcon />, score: '70점', text: '우쭐할까? 너를 볼때?' },
    ],
  },
];

const ResultLove = ({data}) => {
    const location = useLocation();
    const result = location.state?.result;
    console.log("result", result);

    if (!result) {
        return <div>No result data</div>;
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom>Result Page</Typography>
            <Grid container spacing={2} direction="column">
            <Box p={3}>
      <Typography variant="h4" gutterBottom>철수님과 영희님의 판결 결과입니다.</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Box p={2}>
              <Typography variant="h6" gutterBottom>우리들의 애정 전선은 이래해요</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper variant="outlined">
                    <Box p={2}>
                      <Typography variant="h6">김현석</Typography>
                      <Typography variant="body2">애정: 40%</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper variant="outlined">
                    <Box p={2}>
                      <Typography variant="h6">김현석</Typography>
                      <Typography variant="body2">애정: 60%</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined">
            <Box p={2}>
              <Typography variant="h2" gutterBottom>Total Score</Typography>
              {Object.keys(result.total_score).map((key, index) => (
                <div key={index}>
                  <strong>{key}: </strong> {result.total_score[key]}
                </div>
              ))}
            </Box>
          </Paper>
        </Grid>
        
      </Grid>
    </Box>

    <Box sx={{ padding: 2 }}>
      {weatherData.map((data, index) => (
        <Card variant="outlined" sx={{ marginBottom: 2 }} key={index}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h4">{data.name}</Typography>
                <Typography variant="h2" sx={{ marginTop: 1 }}>
                  {data.temperature}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                {data.details.map((detail, detailIndex) => (
                  <Box key={detailIndex} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    {detail.icon}
                    <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
                      {detail.score}
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      {detail.text}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>

                <Grid item>
                    <Paper variant="outlined">
                        <Box p={2}>
                            <Typography variant="h2" gutterBottom>Support</Typography>
                            {Object.keys(result.support).map((key, index) => (
                                <div key={index}>
                                    <Typography variant="h3">{key}</Typography>
                                    <div>Score: {result.support[key].score}</div>
                                    <div>Reason: {result.support[key].reason}</div>
                                </div>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper variant="outlined">
                        <Box p={2}>
                            <Typography variant="h2" gutterBottom>Cheat</Typography>
                            {Object.keys(result.cheat).map((key, index) => (
                                <div key={index}>
                                    <Typography variant="h3">{key}</Typography>
                                    <div>Score: {result.cheat[key].score}</div>
                                    <div>Reason: {result.cheat[key].reason}</div>
                                </div>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper variant="outlined">
                        <Box p={2}>
                            <Typography variant="h2" gutterBottom>Sexual</Typography>
                            {Object.keys(result.sexual).map((key, index) => (
                                <div key={index}>
                                    <Typography variant="h3">{key}</Typography>
                                    <div>Score: {result.sexual[key].score}</div>
                                    <div>Reason: {result.sexual[key].reason}</div>
                                </div>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper variant="outlined">
                        <Box p={2}>
                            <Typography variant="h2" gutterBottom>Interest</Typography>
                            {Object.keys(result.interest).map((key, index) => (
                                <div key={index}>
                                    <Typography variant="h3">{key}</Typography>
                                    {Object.keys(result.interest[key]).map((subKey, subIndex) => (
                                        <div key={subIndex}>
                                            <strong>{subKey}: </strong> {result.interest[key][subKey]}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResultLove;
