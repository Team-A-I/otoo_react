import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
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
import PrivateRoute from './components/PrivateRoute';
import QnaChatbot from './components/modal/QnaChatbot';

import SttResult from './pages/conflict/SttResult';
import Recorder from './components/conflict/Recorder';
import SttLoadingPage from './components/conflict/SttLoadingPage';
import SttUpload from './pages/conflict/SttUpload';
import Streaming from './components/streaming/Streaming';
import RecorderLoading from './components/conflict/RecorderLoading';

import Board from './pages/Board';

import AdminUser from './pages/admin/AdminUser';
import AdminHeader from './pages/admin/AdminHeader';
import AdminQnA from './pages/admin/AdminQnA';
import AdminBoard from './pages/admin/AdminBoard';
import ReactGA from 'react-ga';

ReactGA.initialize('G-YR4ZVKD6TS');

const adminRoutes = [
  { path: '/admin-user', element: <AdminUser />, roles: ['ROLE_ADMIN'] },
  { path: '/admin-board', element: <AdminBoard />, roles: ['ROLE_ADMIN'] },
];

const generalRoutes = [
  { path: '/', element: <Home /> },
  { path: '/chatbot', element: <ChatBot /> },
  { path: '/qna-chatbot', element: <QnaChatbot /> },
  { path: '/upload-conflict', element: <ConflictUpload /> },
  { path: '/loading-conflict', element: <LoadingPage /> },
  { path: '/result-conflict', element: <ResultPage /> },
  { path: '/loading-love', element: <LoadingLove /> },
  { path: '/result-love', element: <ResultLove /> },
  { path: '/upload-love', element: <UploadLove /> },
  { path: '/loading-friendship', element: <LoadingFriendship /> },
  { path: '/result-friendship', element: <ResultFriendship /> },
  { path: '/result-friendship-to-love', element: <ResultFriendshipToLove /> },
  { path: '/upload-friendship', element: <UploadFriendship /> },
  { path: '/emotionReportPage', element: <EmotionReportPage /> },
  { path: '/emotionReportLoadingPage', element: <EmotionReportLoadingPage /> },
  { path: '/user-login', element: <UserLoginPage /> },
  { path: '/user-signup', element: <SignUpPage /> },
  { path: '/googlelogin', element: <GoogleLogin /> },
  { path: '/naverLogin', element: <NaverLogin /> },
  { path: '/forgetPassword', element: <ForgetPassword /> },
  { path: '/resetPassword', element: <ResetPassword /> },
  { path: '/stt-result', element: <SttResult /> },
  { path: '/recorder', element: <Recorder /> },
  { path: '/stt-loading', element: <SttLoadingPage /> },
  { path: '/stt', element: <SttUpload /> },
  { path: '/streaming', element: <Streaming /> },
  { path: '/recorder-loading', element: <RecorderLoading /> },
  { path: '/board', element: <Board /> },
];

const MainApp = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
  const location = useLocation();

  const HeaderComponent = () => {
    if (location.pathname.startsWith('/admin')) {
      return <AdminHeader />;
    }
    return <Header />;
  };

  return (
    <>
      <HeaderComponent />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route 
            path="/admin-user" 
            element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <AdminUser />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin-qna" 
            element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <AdminQnA />
              </PrivateRoute>
            }
          />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/qna-chatbot" element={<QnaChatbot />} />
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
          <Route path="/googlelogin" element={<GoogleLogin />} />
          <Route path="/naverLogin" element={<NaverLogin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          <Route path='/stt-result' element={<SttResult />} />
          <Route path='/recorder' element={<Recorder />} />
          <Route path='/stt-loading' element={<SttLoadingPage />} />
          <Route path='/stt-upload' element={<SttUploadConflict />} />
          <Route path='/stt' element={<SttUpload />} />
          <Route path='/streaming' element={<Streaming />} />
          <Route path='/recorder-loading' element={<RecorderLoading />} />
          <Route path='/board' element={<Board />} />

          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute roles={route.roles}>
                  {route.element}
                </PrivateRoute>
              }
            />
          ))}
          {generalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
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
