import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, IconButton,ThemeProvider} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import theme from '../../theme';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);// eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationIdRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    analyserRef.current.fftSize = 2048;
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#04613E';

      canvasCtx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArrayRef.current[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const stopRecording = async () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationIdRef.current);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      setLoading(true);  // 로딩 상태 시작
      navigate('/recorder-loading'); // 로딩 페이지로 이동
      try {
        const response = await axios.post('http://localhost:8080/api/transcribe/file', formData);
        console.log('Response data:', response.data);
        navigate('/stt-result', { state: { jsonData: response.data } }); // 결과 페이지로 이동
      } catch (error) {
        console.error('Error uploading audio file:', error);
      } finally {
        setLoading(false);  // 로딩 상태 종료
      }
      audioChunksRef.current = [];
    };
    setRecording(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    if (recording && elapsedTime >= 60) {
      stopRecording();
    }// eslint-disable-next-line
  }, [elapsedTime, recording]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <>
        <Typography variant="h2_bold" gutterBottom>
          무슨 일이 있었나요?
        </Typography>
        <Typography variant="sub_bold" color="textSecondary" gutterBottom>
          "··· 누가 잘못한거야?"라고 말해보세요.
        </Typography>
        <IconButton 
          onClick={recording ? stopRecording : startRecording}
          sx={{
            width: 100,
            height: 100,
            bgcolor: recording ? '#ff5252' : '#01A762',
            color: '#fff',
            '&:hover': {
              bgcolor: recording ? '#ff1744' : '#04613E'
            }
          }}
        >
          {recording ? <MicOffIcon sx={{ fontSize: 60 }} /> : <MicIcon sx={{ fontSize: 60 }} />}
        </IconButton>
        {recording && (
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            녹음 시간: {formatTime(elapsedTime)} / 1:00
          </Typography>
        )}
        <Box sx={{ width: '100%', maxWidth: '600px', aspectRatio: '3 / 1', marginTop: '20px', marginBottom: '20px' }}>
          <canvas ref={canvasRef} width="600" height="200" style={{ width: '100%', height: '100%' }} />
        </Box>
      </>
    </Box>
    </div>
    </ThemeProvider>
  );
};

export default Recorder;
