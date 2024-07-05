import React from 'react';
import AnalysisMain from '../components/AnalysisMain';
import { Container, Box } from '@mui/material';

const Analysis = () => {
    return (
        <Box 
            sx={{ 
                backgroundColor: '#F1F0EB90', 
                minHeight: '100vh', 
                width: '100vw', 
                display: 'flex', 
                justifyContent: 'center', 
            }}
        >
            <Container 
                maxWidth="xl">
                <AnalysisMain />
            </Container>
        </Box>
    );
};

export default Analysis;
