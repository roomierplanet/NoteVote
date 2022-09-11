import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Routes/LandingPage/LandingPage'
import Host from './Routes/Host/Host'
import HostSignup from './Routes/HostSignup/HostSignup';
import HostDashboard from './Routes/HostDashboard/HostDashboard';
import User from './Routes/User/User';
import HostView from './Routes/HostView/HostView';

function App() {
  return (
    <>
      <img src="/favicon.ico" alt="logo-notevote" height="50px" style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        marginTop: '2rem'
      }}/>
      <Router>
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/host" element={<Host />} />
            <Route exact path="/host/signup" element={<HostSignup />} />
            <Route exact path="/host/dashboard" element={<HostDashboard />} />
            <Route exact path='/user' element={<User />} />
            <Route exact path='/user/viewhost/:id' element={<HostView />} />
        </Routes>
      </Router>
    </> 
  );
}

export default App;
