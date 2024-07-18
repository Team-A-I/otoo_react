// src/App.js
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  let mediaRecorder;
  let stompClient;

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('WebSocket is connected.');
      stompClient.subscribe('/topic/messages', (message) => {
        setTranscript((prevTranscript) => prevTranscript + message.body + ' ');
      });
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && stompClient.connected) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result.split(',')[1];
          stompClient.send('/app/message', {}, base64data);
        };
        reader.readAsDataURL(event.data);
      }
    };

    mediaRecorder.start(250);  // Send audio data every 250ms
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stompClient) {
      stompClient.send('/app/eos', {}, 'EOS');
      stompClient.disconnect();
    }
  };

  return (
    <div>
      <h1>실시간 STT</h1>
      <button onClick={() => setIsRecording(true)}>녹음 시작</button>
      <button onClick={() => setIsRecording(false)}>녹음 중지</button>
      <div>
        <h2>텍스트 출력:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default App;
