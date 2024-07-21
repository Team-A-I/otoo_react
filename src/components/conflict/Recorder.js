import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      try {
        const response = await axios.post('https://gnat-suited-weekly.ngrok-free.app/api/transcribe/file', formData);
        console.log('Response data:', response.data);
        navigate('/stt-result', { state: { jsonData: response.data } }); // 결과 페이지로 이동
      } catch (error) {
        console.error('Error uploading audio file:', error);
      }
      audioChunksRef.current = [];
    };
    setRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>말하기 시작</button>
      <button onClick={stopRecording} disabled={!recording}>말하기 종료</button>
    </div>
  );
};

export default Recorder;
