import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, ThemeProvider } from '@mui/material';
import theme from "../../theme";

const ResultPage = () => {
  const location = useLocation();
  const { result } = location.state || {};

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
            <Typography variant="h4" gutterBottom>
              STT 분석 결과
            </Typography>
            {result ? (
              <Box sx={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                <Typography variant="body1">{JSON.stringify(result, null, 2)}</Typography>
              </Box>
            ) : (
              <Typography variant="body1">분석 결과를 불러오는 중 오류가 발생했습니다.</Typography>
            )}
          </Box>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultPage;
