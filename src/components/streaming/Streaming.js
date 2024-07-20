import React, { useState, useRef } from 'react';

function Streaming() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const webSocketRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
        webSocketRef.current.send(event.data);
      }
    };

    webSocketRef.current = new WebSocket('ws://localhost:8080/audio-stream');
    webSocketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
      mediaRecorderRef.current.start(250); // Send audio data every 250ms
      setIsRecording(true);
    };

    webSocketRef.current.onmessage = (message) => {
      console.log('Received:', message.data);
      // 여기에 텍스트를 화면에 출력하는 로직을 추가합니다.
    };

    webSocketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsRecording(false);
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
  };

  return (
    <div className="App">
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
    </div>
  );
}

export default Streaming;
