import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, ThemeProvider, Paper, Grid ,Button} from '@mui/material';
import { Chart, registerables } from 'chart.js';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import FeedbackModal from '../../components/modal/FeedbackModal';
import theme from "../../theme";
import { motion } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import html2canvas from 'html2canvas';


Chart.register(...registerables);



const ResultPage = () => {
  const location = useLocation();
  const { jsonData } = location.state || {};

  const data = jsonData ? JSON.parse(jsonData.response.replace(/```json\n|```/g, '')) : {};

  const faultsPaperRef = useRef(null);
  const timelinePaperRef = useRef(null);
  
  const type = 'orctxt';
  const errormesage = "분석 결과를 불러오는 중 오류가 발생했습니다.";
  

  useEffect(() => {
    // Set equal height for both papers
    if (faultsPaperRef.current && timelinePaperRef.current) {
      const faultsPaperHeight = faultsPaperRef.current.offsetHeight;
      const timelinePaperHeight = timelinePaperRef.current.offsetHeight;
      const maxHeight = Math.max(faultsPaperHeight, timelinePaperHeight);
      faultsPaperRef.current.style.height = `${maxHeight}px`;
      timelinePaperRef.current.style.height = `${maxHeight}px`;
    }// eslint-disable-next-line
  }, [jsonData]);

  const handleCaptureClick = async () => {
    if (faultsPaperRef.current) {
      const canvas = await html2canvas(faultsPaperRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'result.png';
      link.click();
    }
  };

  if (!jsonData) {
    return (
      <Container maxWidth="xl">
        <ThemeProvider theme={theme}>
          <div style={{ fontFamily: theme.typography.fontFamily }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '12vh' }}>
              <Typography variant="h4" gutterBottom>
                {errormesage}
              </Typography>
            </Box>
          </div>
        </ThemeProvider>
      </Container>
    );
  }

  const result = data;


  const incidentData = result.Incident || {
    development: { a_behavior: "", a_emotion: "", b_behavior: "", b_emotion: "" },
    deployment: { a_behavior: "", a_emotion: "", b_behavior: "", b_emotion: "" },
    crisis: { a_behavior: "", a_emotion: "", b_behavior: "", b_emotion: "" },
    climax: { a_behavior: "", a_emotion: "", b_behavior: "", b_emotion: "" },
    ending: { a_behavior: "", a_emotion: "", b_behavior: "", b_emotion: "" },
  };

  const colors = ["#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336"];

  const createTimelineElement = (stage, aBehavior, aEmotion, bBehavior, bEmotion, color) => (
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography variant="body1" color="textSecondary"><strong>A 행동:</strong> {aBehavior}</Typography>
        <Typography variant="body2" color="textSecondary"><strong>A 감정:</strong> {aEmotion}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot style={{ backgroundColor: color }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body1" color="textSecondary"><strong>B 행동:</strong> {bBehavior}</Typography>
        <Typography variant="body2" color="textSecondary"><strong>B 감정:</strong> {bEmotion}</Typography>
      </TimelineContent>
    </TimelineItem>
  );

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
            </motion.div>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={3}>
                
              <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Paper elevation={3} sx={{ padding: 2, flex: 1 }} ref={faultsPaperRef}>
                      <Typography variant="h6" sx={{ mb: 6 }} gutterBottom>잘못 비율:</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="verybig_bold" sx={{ color: '#0D413A' }}>{result.faults.speaker_a.percentage}<br /></Typography>
                        </Box>
                        <Typography variant="hbig_bold" sx={{ mx: 2, flex: 1, textAlign: 'center' }}>대</Typography>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="verybig_bold" sx={{ color: '#F2BEC5' }}>{result.faults.speaker_b.percentage}<br /></Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="hc_bold">A<br />({result.nickname.nickname_a})</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} /> {/* 이 빈 Box를 추가하여 두 요소 사이를 떨어뜨립니다 */}
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="hc_bold">B<br />({result.nickname.nickname_b})</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Paper elevation={3} sx={{ padding: 2, flex: 1 }} ref={timelinePaperRef}>
                      <Typography variant="h6" gutterBottom>감정 타임라인:</Typography>
                      <Timeline>
                        {createTimelineElement("Development", incidentData.development.a_behavior, incidentData.development.a_emotion, incidentData.development.b_behavior, incidentData.development.b_emotion, colors[0])}
                        {createTimelineElement("Deployment", incidentData.deployment.a_behavior, incidentData.deployment.a_emotion, incidentData.deployment.b_behavior, incidentData.deployment.b_emotion, colors[1])}
                        {createTimelineElement("Crisis", incidentData.crisis.a_behavior, incidentData.crisis.a_emotion, incidentData.crisis.b_behavior, incidentData.crisis.b_emotion, colors[2])}
                        {createTimelineElement("Climax", incidentData.climax.a_behavior, incidentData.climax.a_emotion, incidentData.climax.b_behavior, incidentData.climax.b_emotion, colors[3])}
                        {createTimelineElement("Ending", incidentData.ending.a_behavior, incidentData.ending.a_emotion, incidentData.ending.b_behavior, incidentData.ending.b_emotion, colors[4])}
                      </Timeline>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>상황 분석:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEmotionsIcon />
                        <Typography variant="body1"><strong>A:</strong> {result.situation_analysis.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InsertEmoticonIcon />
                        <Typography variant="body1"><strong>B:</strong> {result.situation_analysis.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>감정 분석:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEmotionsIcon />
                        <Typography variant="body1"><strong>A:</strong> {result.emotion_analysis.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InsertEmoticonIcon />
                        <Typography variant="body1"><strong>B:</strong> {result.emotion_analysis.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6" gutterBottom>결론:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <motion.div
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography variant="body1">{result.conclusion.text}</Typography>
                    </motion.div>
                    </Paper>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>설명:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>A:</strong> {result.explanation.speaker_a}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>B:</strong> {result.explanation.speaker_b}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>해결책:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>A:</strong> {result.solutions.solutionsA}</Typography>
                      </Paper>
                      <Paper elevation={1} sx={{ padding: 1, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1"><strong>B:</strong> {result.solutions.solutionsB}</Typography>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#04613E',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#03472D',
                      },
                    }}
                    onClick={handleCaptureClick}
                  >
                    결과 이미지로 저장
                  </Button>
                </Grid>

              </Grid>
            </Box>
          </Box>
          <FeedbackModal feedbackType={type}/>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default ResultPage;
