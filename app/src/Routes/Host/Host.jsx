import {useEffect} from 'react'
import '../../styles.scss'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../../Auth0/Login'
import getHost from '../../api/getHost';
import { useNavigate } from 'react-router-dom';

function Host() {
    const {isLoading, isAuthenticated, user} = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        const getResponse = async () => {
            const response = await getHost.getHostByAuth0Id(user.sub);
            if (response._id === 'none') {
                navigate("/host/signup");
            }
            else {
                localStorage.setItem('host_id', response._id);
                navigate("/host/dashboard");
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
            <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
            </div>
        </div>
    )
}

export default Host