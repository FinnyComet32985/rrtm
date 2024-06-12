import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PatternPage from './pages/PatternPage/PatternPage';
import StrategiaPage from './pages/StrategiaPage/StrategiaPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/patternPage/:patternId' element={<PatternPage />} />
        <Route path='/StrategiaPage/:strategiaId' element={<StrategiaPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
