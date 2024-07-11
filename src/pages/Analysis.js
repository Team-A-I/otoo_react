import React from 'react';
import AnalysisMain from '../components/AnalysisMain';
import { Container, Box } from '@mui/material';

const Analysis = () => {
    return (
        <Box sx={{backgroundColor:"#F1F0EB90",
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <AnalysisMain />
        </Box>
    );
};

export default Analysis;
