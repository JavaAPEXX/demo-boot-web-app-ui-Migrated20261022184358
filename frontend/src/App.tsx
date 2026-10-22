import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/modern-ui.css';
import './styles/original-jsp-styles.css';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import WelcomeComponent from './components/WelcomeComponent';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/registration" element={<RegistrationComponent />} />
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/welcome" element={<WelcomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
