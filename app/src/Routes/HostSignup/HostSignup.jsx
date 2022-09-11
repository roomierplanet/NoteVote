import '../../styles.scss'
import {TextField, Button} from '@mui/material'
import { useState } from 'react'
import { useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import getHost from '../../api/getHost';
import {useNavigate} from 'react-router-dom';

function HostSignup() {
    const {isLoading, user} = useAuth0();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        name:"",
        playlist_length: 20,
        song_limit: 1,
        email: "",
        auth0_id: ""
    })
    useEffect(() => {
        if (!isLoading) {
            setDetails(details => {return {...details, email: user.email, auth0_id: user.sub}});
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const submitHandler = async () => {
        const response = await getHost.createHost(details);
        localStorage.setItem('host_id', response._id);
        navigate("/host/dashboard");
    }
    return (
        <div className="singup-bg">
            <div className="signup-container">
            <h2>Tell us more about yourself.</h2>
            <hr />
            <div className="form">
                <TextField id="outlined-basic" 
                        label="Host Name" 
                        variant="outlined" 
                        value={details.name}
                        style = {{
                            width: '22rem',
                            marginTop: '1rem'
                        }}
                        autoComplete='new-password'
                        helperText="Use your official name so users can recognize you!"
                        onChange={(e) => setDetails(details => {return {...details, name:e.target.value}})}
                />
                <TextField id="outlined-basic" 
                        label="Playlist Length" 
                        variant="outlined" 
                        value={details.playlist_length}
                        error = {isNaN(details.playlist_length) || details.playlist_length < 20 || details.playlist_length > 40}
                        helperText = 'Playlists can be between 20 and 40 songs in length'
                        style={{
                            marginTop: '2.5rem',
                            width: '22rem'
                        }}
                        onChange={(e) => {
                            setDetails(details => {return {...details, playlist_length:e.target.value}})}}
                />
                <TextField id="outlined-basic" 
                        label="Number of votes per user" 
                        variant="outlined" 
                        value={details.song_limit}
                        error = {isNaN(details.song_limit) || details.song_limit < 1 || details.song_limit > 5}
                        helperText = 'Each user can vote for between 1 and 5 songs per day'
                        style={{
                            marginTop: '2.5rem',
                            width: '22rem'
                        }}
                        onChange={(e) => {
                            setDetails(details => {return {...details, song_limit:e.target.value}})}}
                />
                <Button 
                    onClick = {e => {submitHandler()}}
                    variant = "contained"
                    style={{
                        marginTop: '2rem'
                    }}
                >    
                    Submit
                </Button>
            </div>
            </div>
        </div>
    )
}

export default HostSignup