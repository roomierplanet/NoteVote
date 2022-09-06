import {useEffect} from 'react'
import '../../styles.scss'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../../Auth0/Login'
import getHost from '../../api/getHost';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Host() {
    const {isLoading, isAuthenticated, user} = useAuth0();
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(false);
    useEffect(() => {
        const getResponse = async () => {
            const response = await getHost.getHostByAuth0Id(user.sub);
            if (response._id === 'none') {
                navigate("/host/signup");
            }
            else {
                localStorage.setItem('host_id', response._id);
                setNavigating(true);
                setTimeout(() => {
                    setNavigating(false);
                    navigate("/host/dashboard")
                }, 2000);
            }
        }
        if (isAuthenticated && !isLoading) {
            getResponse();
        }
    }, [isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="landing-bg">
            {!isAuthenticated &&
            <div className="landing-text">
                <h1>Let the people decide!</h1>
                <p>Start hosting your location on NoteVote today</p>
                <div style={{'marginTop': '1rem'}}><LoginButton>Get started</LoginButton></div>
            </div>
            }
            {navigating && 
            <CircularProgress 
                style= {{
                    'color': '#489ba6',
                    'alignSelf': 'center'
                }}
            />
            }
            <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
            </div>
        </div>
    )
}

export default Host