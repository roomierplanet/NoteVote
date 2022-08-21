import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Routes/LandingPage/LandingPage'
import Host from './Routes/Host/Host'
import HostSignup from './Routes/HostSignup/HostSignup';
import HostDashboard from './Routes/HostDashboard/HostDashboard';
import User from './Routes/User/User';
import HostView from './Routes/HostView/HostView';
import HostVote from './Routes/HostVote/HostVote';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/host" element={<Host />} />
          <Route exact path="/host/signup" element={<HostSignup />} />
          <Route exact path="/host/dashboard" element={<HostDashboard />} />
          <Route exact path='/user' element={<User />} />
          <Route exact path='/user/viewhost/:id' element={<HostView />} />
          <Route exact path='/user/votehost/:id' element={<HostVote />} />
      </Routes>
    </Router> 
  );
}

export default App;
