import { Card, CardContent, Box, Container, Grid, Paper, Typography, ThemeProvider} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import theme from '../../theme';

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

const ResultLove = ({data}) => {
    const location = useLocation();
    const result = location.state?.result;
    console.log("result", result);

    if (!result) {
        return <div>No result data</div>;
    }

    const loveMessage = getLoveMessage(result.total_score);

    return (
        <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
            <Grid container spacing={2} direction="column" mt={3} xs={12}>
                <Box p={5}>
                    <Box>
                        <Paper elevation={4} style={{ borderRadius: '35px' }}>
                            <Grid container spacing={2} alignItems="flex-start">
                                <Grid item xs={12} sm={7}>
                                    <Box p={5}>
                                        <Grid 
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                        style={{ minHeight:"300px" }}>
                                            <Grid item>
                                                {loveMessage && (
                                                    <Typography variant="hb_bold">{loveMessage}</Typography>
                                                )}
                                            </Grid>
                                            <Grid item> 
                                                <img src='/otoo_react/images/loveline.png'
                                                alt="Loveline"
                                                style={{ width: '50%', height: 'auto', opacity: 0.2 }}/>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item sm={5}>
                                    <Box p={3}>
                                        <img src='/otoo_react/images/main_love.png'
                                        alt="Love"
                                        style={{ width: '100%', height: 'auto' }}
                                        /> 
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                    <Box mt={5}>
                        <Paper elevation={5} 
                            style={{ borderRadius: '35px',
                                backgroundImage: 'url(/otoo_react/images/lovecloud.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                             }}>
                            <Grid container spacing={2} alignItems="flex-start">
                                <Grid item xs={5} mt={2}>
                                    <Box p={5}>
                                        <Grid 
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                        style={{ minHeight:"300px" }}>
                                            <Grid item>
                                            <Typography variant="hb_bold"
                                            color="dyellow">
                                                우리들의<br/>애정<br/>전선은<br/>이러해요
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Box p={3}>
                                        <Paper elevation={5} style={{ borderRadius: '35px', minHeight:"320px"}}>
                                            <img src='/otoo_react/images/main_love.png'
                                            alt="Love"
                                            style={{ width: '100%', height: 'auto' }}
                                            /> 
                                        </Paper>
                                    </Box>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Box p={3}>
                                        <Paper elevation={5} style={{ borderRadius: '35px', minHeight:"320px"}}>
                                            <img src='/otoo_react/images/main_love.png'
                                            alt="Love"
                                            style={{ width: '100%', height: 'auto' }}
                                            /> 
                                        </Paper>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <Box p={3}>
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

    {/* <Box sx={{ padding: 2 }}>
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
    </Box> */}

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
            </div>
            </ThemeProvider>
        </Container>
    );
};

export default ResultLove;
