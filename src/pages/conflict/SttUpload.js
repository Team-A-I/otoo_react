import React from 'react';
import Recorder from '../../components/conflict/Recorder';
import SttUploadConflict from '../../components/conflict/SttUploadConflict';

const AnotherComponent = () => {
  return (
    <div>
      <h1>Another Component</h1>
      <Recorder />
      <div> 
      <SttUploadConflict/>
      </div>
    </div>
  );
};

export default AnotherComponent;
