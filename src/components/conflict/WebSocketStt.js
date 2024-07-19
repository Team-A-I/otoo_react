import React, { useState, useEffect } from 'react';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');

  useEffect(() => {
    let mediaRecorder;
    let chunks = [];

    if (recording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioURL(url);

            // 백엔드로 오디오 데이터 전송
            const formData = new FormData();
            formData.append('file', blob, 'recording.wav');
            fetch('/api/speech-to-text', {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                console.log('Transcription:', data.transcription);
              });
          };

          mediaRecorder.start();
        });
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, [recording]);

  return (
    <div>
      <button onClick={() => setRecording(!recording)}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <audio src={audioURL} controls />
    </div>
  );
};

export default App;
