import {useEffect, useState} from 'react'
import '../../styles.scss'
import Spotify from '../../api/Spotify';
import getHost from '../../api/getHost';
import {Button, Alert, Snackbar} from '@mui/material'
import {useLocation} from 'react-router-dom';

function HostDashboard() {
    const location = useLocation();
    const [playlist, setPlaylist] = useState();
    const [host, setHost] = useState();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        const getPlaylist = async () => {
            // const host_id = localStorage.getItem('host_id', '');
            console.log(location);
            const response = await getHost.getHostById(location.state._id);
            setHost(response);
            return response;
        }
        const getTracks = async () => {
            const h_host = await getPlaylist();
            const response = await Spotify.getTracks(h_host.playlist, "/host/dashboard");
            setPlaylist(response);
        }
        getTracks();
    }, []);
    const submitHandler = async () => {
        const playlist_id = await Spotify.savePlaylist(playlist, host.playlist_id);
        setHost(host => {return {...host, playlist_id: playlist_id}});
        await getHost.changeHost(host._id, 'playlist_id', playlist_id);
        setSuccess(true);
    }
    return (
        <>
        <div className="dashboard-bg">
            <div className="dashboard-component">
                <h2>See what your users have been upto.</h2>
                <p>In this dashboard, you can view the dynamic playlist generated by your users.</p>
                <Button 
                    onClick={(e) => {submitHandler()}}
                    variant="outlined"
                    style={{
                        'width': '15rem',
                        'borderRadius': '0.3rem',
                        'borderWidth': '2px',
                        'borderColor': '#489ba6',
                        'color': '#489ba6',
                        'marginTop': '2rem'
                    }}
                    >Sync with my playlist</Button>
            </div>
            <div className="line"></div>
            <div className="dashboard-component">
                <div className="playlist-box">
                    <div className="headings">
                    <h3 style={{textAlign: 'center'}}>Votes</h3>    
                    <h3 style={{textAlign: 'center'}}>Track</h3>
                    
                    </div>
                    <div className="tracks-grid">
                        {playlist && playlist.map((track) => {
                            return (
                                <div key={track.id} className='track-container'>
                                <div className="vote-details">
                                    <p style={{textAlign:'center'}}>{track.votes}</p>
                                </div>
                                    <div className="track-details">
                                        <div className="img-container">
                                            <img src={track.album.images ? track.album.images[0].url : ''} alt="track-art"/>
                                        </div>
                                        <div className="track-name"><b><p>{track.name} </p></b></div>
                                        <div className="artist-info">
                                        {track.artists.length > 1 ? track.artists.map((artist, i, {length}) => {
                                            return (<p key={artist.name}>{artist.name}{i !== length - 1 ? <span>,&nbsp;</span> : ''}</p>)
                                        }) : <p>{track.artists[0].name}</p>}
                                        </div>
                                        
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <Snackbar open={success} autoHideDuration={3000} onClose={(e) => setSuccess(false)}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={(e) => setSuccess(false)}>
                    Playlist set successfully!
            </Alert>
        </Snackbar>
        </div>
        </>
  )
}

export default HostDashboard