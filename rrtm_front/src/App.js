import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/InterfacciaUtenteNonLoggato/HomePage/HomePage';
import PatternPage from './pages/InterfacciaUtenteNonLoggato/PatternPage/PatternPage';
import StrategiaPage from './pages/InterfacciaUtenteNonLoggato/StrategiaPage/StrategiaPage';
import VulnerabilitaPage from './pages/InterfacciaUtenteNonLoggato/VulnerabilitaPage/VulnerabilitaPage';
import ArticoloPage from './pages/InterfacciaUtenteNonLoggato/ArticoloPage/ArticoloPage';
import PbDPage from "./pages/InterfacciaUtenteNonLoggato/PbDPage/PbDPage";
import MVCPage from './pages/InterfacciaUtenteNonLoggato/MVCPage/MVCPage';
import ISOPage from './pages/InterfacciaUtenteNonLoggato/ISOPage/ISOPage';
import OWASPPage from "./pages/InterfacciaUtenteNonLoggato/OWASPPage/OWASPPage";
import InserimentoFeedbackPage from "./pages/InterfacciaUtenteLoggato/InserimentoFeedbackPage";

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
        <Route path='/inserimentoFeedbackUt' element={<InserimentoFeedbackPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
