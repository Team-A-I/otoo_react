import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import ChatBot from './pages/ChatBot';
import './css/App.css';

const App = () => {
  return (
      <Router basename="/otoo_react">
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
      </Router>
  );
};

export default App;
