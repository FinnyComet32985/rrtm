import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PatternPage from './pages/PatternPage/PatternPage';
import StrategiaPage from './pages/StrategiaPage/StrategiaPage';
import VulnerabilitaPage from './pages/VulnerabilitaPage/VulnerabilitaPage';
import ArticoloPage from './pages/ArticoloPage/ArticoloPage';
import PbDPage from "./pages/PbDPage/PbDPage";
import MVCPage from './pages/MVCPage/MVCPage';
import ISOPage from './pages/ISOPage/ISOPage';
import OWASPPage from "./pages/OWASPPage/OWASPPage";

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
        <Route path='/MVCPage/:MVCId' element={<MVCPage/>}/>
        <Route path='/ISOPage/:ISOId' element={<ISOPage/>}/>
        <Route path='/OWASPPage/:OWASPId' element={<OWASPPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
