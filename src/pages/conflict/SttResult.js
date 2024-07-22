import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, ThemeProvider, Paper, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import theme from "../../theme";
import { motion } from 'framer-motion';

Chart.register(...registerables);

const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};

  useEffect(() => {
    console.log("Received jsonData:", jsonData);
  }, [jsonData]);

  if (!jsonData) {
    return (
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
          <div style={{ fontFamily: theme.typography.fontFamily }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
              <Typography variant="h4" gutterBottom>
                분석 결과를 불러오는 중 오류가 발생했습니다.
              </Typography>
            </Box>
          </div>
        </ThemeProvider>
      </Container>
    );
  }

  const result = jsonData;

  // 데이터 처리
  const faultsData = {
    labels: ['화자 A', '화자 B'],
    datasets: [
      {
        label: '잘못 비율',
        data: [result.faults.speaker_a.percentage, result.faults.speaker_b.percentage],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh', padding: '20px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h4" gutterBottom>
                STT 분석 결과
              </Typography>
            </motion.div>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>상황 분석:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEmotionsIcon />
                        <Typography variant="body1"><strong>화자 A:</strong> {result.situation_analysis.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InsertEmoticonIcon />
                        <Typography variant="body1"><strong>화자 B:</strong> {result.situation_analysis.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>잘못 비율:</Typography>
                    <Bar data={faultsData} options={{ responsive: true }} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>감정 분석:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEmotionsIcon />
                        <Typography variant="body1"><strong>화자 A:</strong> {result.emotion_analysis.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InsertEmoticonIcon />
                        <Typography variant="body1"><strong>화자 B:</strong> {result.emotion_analysis.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>결론:</Typography>
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="body1">{result.conclusion.text}</Typography>
                    </motion.div>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>설명:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>화자 A:</strong> {result.explanation.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>화자 B:</strong> {result.explanation.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>해결책:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>해결책 A:</strong> {result.solutions.solutionsA}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>해결책 B:</strong> {result.solutions.solutionsB}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultPage;
