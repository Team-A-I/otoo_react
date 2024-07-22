import React from 'react';
import Recorder from '../../components/conflict/Recorder';
import theme1 from '../../theme';
import {ThemeProvider} from '@mui/material';

const AnotherComponent = () => {
  return (
    <ThemeProvider theme={theme1}>
    <div style={{ fontFamily: theme1.typography.fontFamily }}>
      <Recorder />
    </div>
    </ThemeProvider>
  );
};

export default AnotherComponent;
