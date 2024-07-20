import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, ThemeProvider } from '@mui/material';
import theme from "../../theme";

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

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
            <Typography variant="h4" gutterBottom>
              STT 분석 결과
            </Typography>
            <Box sx={{ whiteSpace: 'pre-wrap', textAlign: 'left', width: '100%' }}>
              <Typography variant="h6" gutterBottom>상황 분석:</Typography>
              <Typography variant="body1"><strong>화자 A:</strong> {result.situation_analysis.speaker_a}</Typography>
              <Typography variant="body1"><strong>화자 B:</strong> {result.situation_analysis.speaker_b}</Typography>

              <Typography variant="h6" gutterBottom>잘못:</Typography>
              <Typography variant="body1"><strong>화자 A:</strong> {result.faults.speaker_a.fault} ({result.faults.speaker_a.percentage}%)</Typography>
              <Typography variant="body1"><strong>화자 B:</strong> {result.faults.speaker_b.fault} ({result.faults.speaker_b.percentage}%)</Typography>

              <Typography variant="h6" gutterBottom>감정 분석:</Typography>
              <Typography variant="body1"><strong>화자 A:</strong> {result.emotion_analysis.speaker_a}</Typography>
              <Typography variant="body1"><strong>화자 B:</strong> {result.emotion_analysis.speaker_b}</Typography>

              <Typography variant="h6" gutterBottom>결론:</Typography>
              <Typography variant="body1">{result.conclusion.text}</Typography>

              <Typography variant="h6" gutterBottom>설명:</Typography>
              <Typography variant="body1"><strong>화자 A:</strong> {result.explanation.speaker_a}</Typography>
              <Typography variant="body1"><strong>화자 B:</strong> {result.explanation.speaker_b}</Typography>

              <Typography variant="h6" gutterBottom>해결책:</Typography>
              <Typography variant="body1"><strong>해결책 A:</strong> {result.solutions.solutionsA}</Typography>
              <Typography variant="body1"><strong>해결책 B:</strong> {result.solutions.solutionsB}</Typography>

            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultPage;
