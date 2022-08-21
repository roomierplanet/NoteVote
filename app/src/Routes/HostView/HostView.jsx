import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import Spotify from '../../api/Spotify';
import getHost from '../../api/getHost';
import {Button} from '@mui/material'


function HostView() {
    const params = useParams();
    const hostId = params.id;
    const [playlist, setPlaylist] = useState();
    const [hostInfo, setHostInfo] = useState();
    useEffect(() => {
        const getPlaylist = async () => {
            const host_info = await getHost.getHostById(hostId);
            setHostInfo(host_info);
            const response = await Spotify.getTracks(host_info.playlist);
            setPlaylist(response);
        }
        getPlaylist();
    }, []);
    return (
        <>
        <div className="dashboard-bg">
            {hostInfo &&
            <div className="dashboard-component">
                <h2>Here's the current playlist at {hostInfo.name}</h2>
                <p>Vote for the songs you'd like to be played!</p>
                <Link to={"/user/votehost/" + hostId} style={{
                    'textDecoration': 'none'
                }}><Button 
                    variant="outlined"
                    style={{
                        'width': '15rem',
                        'borderRadius': '0.3rem',
                        'borderWidth': '2px',
                        'borderColor': '#489ba6',
                        'color': '#489ba6',
                        'marginTop': '1rem'
                    }}
                    >Vote</Button></Link>
            </div>
            }
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
        </div>
        </>
    )
}

export default HostView