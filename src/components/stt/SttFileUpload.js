import React, { useState } from 'react';
import axios from 'axios';

const SttFileUpload = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8080/api/tutorial/transcribe/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

      // Assuming the response contains the transcription text
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div>
      <h1>File Upload and Transcription</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Transcribe</button>
      </form>
      {transcription && (
        <div>
          <h2>Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default SttFileUpload;
