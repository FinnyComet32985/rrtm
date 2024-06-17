import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PatternPage from './pages/PatternPage/PatternPage';
import StrategiaPage from './pages/StrategiaPage/StrategiaPage';
import VulnerabilitaPage from './pages/VulnerabilitaPage/VulnerabilitaPage';
import ArticoloPage from './pages/ArticoloPage/ArticoloPage';
import PbDPage from "./pages/PbDPage/PbDPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/patternPage/:patternId' element={<PatternPage />} />
        <Route path='/StrategiaPage/:strategiaId' element={<StrategiaPage/>}/>
        <Route path='/VulnerabilitaPage/:vulnerabilitaId' element={<VulnerabilitaPage/>}/>
        <Route path='/ArticoloPage/:articoloId' element={<ArticoloPage/>}/>
        <Route path='/PbDPage/:PbDId' element={<PbDPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
