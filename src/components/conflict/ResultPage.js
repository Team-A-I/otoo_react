import React from 'react';
import { Box, Typography, Grid, Paper, Container, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};
  
  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};

  const renderWrongPercentage = () => {
    const names = Object.keys(data.wrong_percentage || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>잘못한 비율</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                {names.map(name => (
                  <Grid item xs={6} key={name}>
                    <Card style={{ height: '100%' }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body1" gutterBottom>{name}</Typography>
                        <img src="/otoo_react/images/매우흐림.png" alt={name} style={{ width: '150px', height: '150px', marginBottom: '16px' }} />
                        <Typography variant="h6">{data.wrong_percentage[name]}%</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
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

  const renderMBTITendencyPercentage = () => {
    const names = Object.keys(data.mbti_tendency_percentage || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px' }}>
          <Typography variant="h6" gutterBottom>MBTI 경향 비율</Typography>
          {names.map(name => (
            <Typography key={name}>{name}: {data.mbti_tendency_percentage[name]}%</Typography>
          ))}
        </Paper>
      </Grid>
    );
  };

  const renderOffendedPercentage = () => {
    const names = Object.keys(data.offended_percentage || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px' }}>
          <Typography variant="h6" gutterBottom>기분 상한 비율</Typography>
          {names.map(name => (
            <Typography key={name}>{name}: {data.offended_percentage[name]}%</Typography>
          ))}
        </Paper>
      </Grid>
    );
  };

  const renderTactlessPercentage = () => {
    const names = Object.keys(data.tactless_percentage || {});
    return (
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '24px' }}>
          <Typography variant="h6" gutterBottom>눈치 없는 비율</Typography>
          {names.map(name => (
            <Typography key={name}>{name}: {data.tactless_percentage[name]}%</Typography>
          ))}
        </Paper>
      </Grid>
    );
  };

  const renderPriorityKeywords = () => (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Typography variant="h6" gutterBottom>우선 순위 키워드</Typography>
        {Object.entries(data.priority_keywords || {}).map(([name, keywords]) => (
          <Typography key={name}>{name}: {keywords.join(', ')}</Typography>
        ))}
      </Paper>
    </Grid>
  );

  const renderConflictResolutionAdvice = () => (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Typography variant="h6" gutterBottom>갈등 해결 조언</Typography>
        {Object.entries(data.conflict_resolution_advice || {}).map(([personality, advice]) => (
          <Box key={personality} mb={2}>
            <Typography variant="subtitle1">{personality.replace(/_/g, ' ')}</Typography>
            <Typography>{advice}</Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" mb={4}>분석 결과</Typography>
        <Grid container spacing={3}>
          {data.wrong_percentage && renderWrongPercentage()}
          {data.conflict_cause_percentage && renderConflictCausePercentage()}
          {data.mbti_tendency_percentage && renderMBTITendencyPercentage()}
          {data.offended_percentage && renderOffendedPercentage()}
          {data.tactless_percentage && renderTactlessPercentage()}
          {data.priority_keywords && renderPriorityKeywords()}
          {data.conflict_resolution_advice && renderConflictResolutionAdvice()}
        </Grid>
      </Box>
    </Container>
  );
};

export default ResultPage;
