import React, { useEffect, useRef, useState } from 'react';

const AudioStream = () => {
  const webSocketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // WebSocket 설정
    webSocketRef.current = new WebSocket('ws://localhost:8080/ws/audio');

    webSocketRef.current.onopen = () => {
      console.log('WebSocket connected');
      startRecording();
    };

    webSocketRef.current.onmessage = (event) => {
      console.log('Received message:', event.data);
      try {
        const result = JSON.parse(event.data);
        if (result.alternatives && result.alternatives.length > 0) {
          const text = result.alternatives[0].text;
          setTranscript(prevTranscript => prevTranscript + '\n' + text);
        }
      } catch (e) {
        console.error("Error parsing message:", e);
      }
    };

    webSocketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      stopRecording();
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(event.data);
        }
      };

      mediaRecorderRef.current.start(250); // 250ms 간격으로 데이터를 전송
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div>
      <h1>Real-time Audio Streaming</h1>
      <p>Start speaking into your microphone to stream audio.</p>
      <pre>{transcript}</pre>
    </div>
  );
};

export default AudioStream;
