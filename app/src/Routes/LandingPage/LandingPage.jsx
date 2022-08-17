import React from 'react'
import '../../styles.scss'
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

function LandingPage() {
  return (
    <div className="landing-bg">
        <div className="landing-text">
            <h1 className='tracking-in-expand'>Welcome to NoteVote.</h1>
            <div className="button-container">
              <div className='slide-in-blurred-bottom'>
                <Link to="/host" size="large" style={{'textDecoration':'none', 'color': 'white'}}><Button style={{'width': '10rem', 'borderRadius': '3rem', 'borderWidth': '2px'}}variant='outlined'>I am a host</Button></Link>
              </div>
              <div className="slide-in-blurred-bottom">
                <Link to="/" style={{'textDecoration':'none', 'color': 'white'}}><Button style={{'width': '10rem', 'borderRadius': '3rem', 'marginTop': '1.2rem'}} variant="contained">I am a user</Button></Link>
              </div>
            </div>
        </div>
        <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    </div>
  )
}

export default LandingPage