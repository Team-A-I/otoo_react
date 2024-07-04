import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import ChatBot from './pages/ChatBot';
import ConflictUpload from './pages/conflict/UploadConflict';
import LoadingPage from './components/conflict/LoadingPage';
import ResultPage from './components/conflict/ResultPage';
import './css/App.css';
import { Box } from '@mui/material';
import LoadingLove from './pages/love/LoadingLove';
import ResultLove from './pages/love/ResultLove';
import UploadLove from './pages/love/UploadLove';


const App = () => {
  return (
    <Router basename="/otoo_react">
      <Header />
      <Box mt={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/upload-conflict" element={<ConflictUpload />} />
          <Route path="/loading-conflict" element={<LoadingPage />} />
          <Route path="/result-conflict" element={<ResultPage />} />
          <Route path="/upload-love" element={<UploadLove />} />
          <Route path="/loading-love" element={<LoadingLove />} />
          <Route path="/result-love" element={<ResultLove />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
