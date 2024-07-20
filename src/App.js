import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import './css/App.css';
import { Box } from '@mui/material';

import ChatBot from './pages/chatbot/ChatbotPage';
import EmotionReportPage from './pages/chatbot/EmotionReportPage';
import EmotionReportLoadingPage from './pages/chatbot/EmotionReprtLoadingPage';

import ConflictUpload from './pages/conflict/UploadConflict';
import LoadingPage from './components/conflict/LoadingPage';
import ResultPage from './components/conflict/ResultPage';

import LoadingLove from './pages/love/LoadingLove';
import ResultLove from './pages/love/ResultLove';
import UploadLove from './pages/love/UploadLove';

import UploadFriendship from './pages/friendship/UploadFriendship';
import LoadingFriendship from './components/friendship/LoadingFriendship';
import ResultFriendship from './components/friendship/ResultFriendship';
import ResultFriendshipToLove from './components/friendship/ResultFriendshiptolove';

import UserLoginPage from './pages/users/UserLoginPage';
import SignUpPage from './pages/users/SignUpPage';
import GoogleLogin from './pages/users/GoogleLogin';
import NaverLogin from './pages/users/NaverLogin';
import ForgetPassword from './pages/users/ForgetPassword';
import ResetPassword from './pages/users/ResetPassword';

import SttResult from './components/conflict/SttResult';
import Recorder from './components/conflict/Recorder';


const MainApp = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/chatbot" element={<ChatBot />} />

          <Route path="/upload-conflict" element={<ConflictUpload />} />
          <Route path="/loading-conflict" element={<LoadingPage />} />
          <Route path="/result-conflict" element={<ResultPage />} />

          <Route path="/loading-love" element={<LoadingLove />} />
          <Route path="/result-love" element={<ResultLove />} />
          <Route path="/upload-love" element={<UploadLove />} />

          <Route path="/loading-friendship" element={<LoadingFriendship />} />
          <Route path="/result-friendship" element={<ResultFriendship />} />
          <Route path="/result-friendship-to-love" element={<ResultFriendshipToLove />} />
          <Route path="/upload-friendship" element={<UploadFriendship />} />

          <Route path="/emotionReportPage" element={<EmotionReportPage />} />
          <Route path="/emotionReportLoadingPage" element={<EmotionReportLoadingPage />} />

          <Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/user-signup" element={<SignUpPage />} />
          <Route path="/googleLogin" element={<GoogleLogin />} />
          <Route path="/naverLogin" element={<NaverLogin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          <Route path='/stt-result' element={<SttResult />} />
          <Route path='/recorder' element={<Recorder />} />

        </Routes>
      </Box>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

export default App;
