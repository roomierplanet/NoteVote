import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Routes/LandingPage/LandingPage'
import Host from './Routes/Host/Host'
import HostSignup from './Routes/HostSignup/HostSignup';
import HostDashboard from './Routes/HostDashboard/HostDashboard';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/host" element={<Host />} />
          <Route exact path="/host/signup" element={<HostSignup />} />
          <Route exact path="/host/dashboard" element={<HostDashboard />} />
      </Routes>
    </Router> 
  );
}

export default App;
