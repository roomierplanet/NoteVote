import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import getHost from '../../api/getHost';
import {Button, TextField, IconButton, Alert, Snackbar} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import getUser from '../../api/getUser';
import {useMediaQuery} from 'react-responsive';

function HostView() {
    const isMobile = useMediaQuery({
        'query': '(max-width: 700px)'
    })
    const params = useParams();
    // id of host whose info we wish to retrieve
    const hostId = params.id;
    // host information object from MongoDB server
    const [hostInfo, setHostInfo] = useState();
    // Playlist object returned by spotify API
    const [playlist, setPlaylist] = useState();
    // Client Credentials Grant Access Token to get songs and search for them
    const [atoken, setAtoken] = useState();
    // state to toggle voting UI
    const [toggleVote, setToggleVote] = useState(false);
    // name of song to be searched for
    const [searchedSong, setSearchedSong] = useState('');
    // array of search results returned by Spotify API
    const [searchResults, setSearchResults] = useState([]);
    // toggle if vote fails
    const [voteFail, setVoteFail] = useState(false);
    // toggle if vote successful
    const [voteSuccess, setVoteSuccess] = useState(false);
    const getAccessToken = async () => {
        const body = "grant_type=client_credentials&client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID + "&client_secret=" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        const jsonResponse = await response.json();
        setAtoken(jsonResponse.access_token);
    }
    const getHostInfo = async () => {
        const host_info = await getHost.getHostById(hostId);
        setHostInfo(host_info);
        return host_info;
    }
    useEffect(() => {
        getAccessToken();
    }, []);
    useEffect(() => {
        const getPlaylist = async () => {
            if (!hostInfo) await getHostInfo();
            if (!atoken) await getAccessToken();
            const entries = Object.entries(hostInfo.playlist).sort((a, b) => b[1] - a[1]);
            let id_arr = [];
            entries.forEach((entry) => id_arr.push(entry[0]));
            const id_str = id_arr.join(",");
            const response = await fetch('https://api.spotify.com/v1/tracks?ids=' + id_str, {
                headers:
                {
                    'Authorization': `Bearer ${atoken}`,
                    'Content-Type': 'application/json'
                }
            });
            const jsonResponse = await response.json();
            if (jsonResponse.error) await getAccessToken();
            const tracks_array = jsonResponse.tracks;
            tracks_array.forEach((track, i) => {
                track.votes = entries[i][1]});
            setPlaylist(tracks_array);
        }
        getPlaylist();
    }, [atoken]);
    useEffect(() => {
        // console.log("Called");
        const search = async () => {
            if (searchedSong === '') {
                setSearchResults([]);
                return;
            }
            const fetchURL = 'https://api.spotify.com/v1/search?type=track&q=' + searchedSong;
            const response = await fetch(fetchURL, { headers: 
                    {Authorization : `Bearer ${atoken}`}
            });
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) setSearchResults([]);
            else setSearchResults(jsonResponse.tracks.items);   
        }
        search();
    }, [searchedSong, atoken]);
    const handleVote = async (track) => {
        // console.log(track.uri);
        const user_info = getUser.getUserInfo();
        if (!getUser.canVote(hostId)) {
            setVoteFail(true);
            return;
        }
        await fetch(`/api/v1/groups/${hostId}/vote/`, {
            method: 'POST',
            body: JSON.stringify({
                song_id: track.id
            })
        });
        setVoteSuccess(true);
        const d = (new Date());
        user_info.votes[hostId] = d;
        getUser.saveUserInfo(user_info);
    }
    return (
        <>
        <div className="dashboard-bg">
            {!toggleVote ? <>
            {hostInfo &&
            <div className="dashboard-component" id="left">
                <h2>Here's the current playlist at {hostInfo.name}</h2>
                <p>Vote for the songs you'd like to be played!</p>
                <Button 
                    variant="outlined"
                    style={{
                        'width': '30%',
                        'borderRadius': '0.3rem',
                        'borderWidth': '2px',
                        'borderColor': '#489ba6',
                        'color': '#489ba6',
                        'marginTop': '1rem'
                    }}
                    onClick={e => setToggleVote(true)}
                    >Vote</Button>
            </div>
            }
            <div className="line"></div>
            <div className="dashboard-component" id="right">
                <div className="playlist-box">
                    <div className="headings">
                    <div id="heading">
                        <h3 style={{textAlign: 'center'}}>Votes</h3> 
                    </div>
                    <div id="heading">
                        <h3 style={{textAlign: 'center'}}>Track</h3>
                    </div>
                    
                    
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
                                        <div className="track-name">
                                            <b><p>
                                                {track.name.length < 15 ? track.name : track.name.substring(0, 10) + '...'} 
                                            </p></b>
                                        </div>
                                        <div className="artist-info">
                                        {!isMobile && track.artists.length > 1 ? track.artists.map((artist, i, {length}) => {
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
        
        </> : 
        <>
        <div className="vote-container">
            <h2>Click the plus (+) to vote for your song</h2>
            <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{
                        shrink: false,
                    }}
                    label={searchedSong === '' ? 'Song Name' : ''}
                    value={searchedSong}
                    onChange = {(e) => setSearchedSong(e.target.value)}
                    style = {{
                        borderColor: 'white',
                        borderWidth: '2px',
                        width: '40%'
                    }}
            >
            </TextField>
            {searchResults.length > 1 && 
            <div className="results-container">
                {searchResults.map((track) => {
                    return (
                        <div className="result-container">
                            <div className="add-button">
                            <IconButton aria-label="add" size="medium" onClick={(e) => {
                                handleVote(track)
                            }}>
                                <AddIcon style={{color: '#489ba6'}} fontSize="inherit" />
                            </IconButton>  
                            </div>
                            
                            <div className="track-details">
                                
                                <div className="img-container">
                                    <img src={track.album.images ? track.album.images[0].url : ''} alt="track-art"/>
                                </div>
                                <div className="name-and-artist">
                                <div className="track-name"><b><p>{track.name}</p></b></div>
                                <div className="artist-info">
                                {!isMobile && track.artists.length > 1 ? track.artists.map((artist, i, {length}) => {
                                                return (<p key={artist.name}>{artist.name}{i !== length - 1 ? <span>,&nbsp;</span> : ''}</p>)
                                            }) : <p>{track.artists[0].name}</p>}
                                </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}

            </div>
}
        </div>
        </>
        }
        </div>
        <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        </div>
        <Snackbar open={voteFail} autoHideDuration={3000} onClose={(e) => setVoteFail(false)}>
            <Alert severity="error" sx={{ width: '100%' }} onClose={(e) => setVoteFail(false)}>
                    You have run out of votes!
            </Alert>
        </Snackbar>
        <Snackbar open={voteSuccess} autoHideDuration={3000} onClose={(e) => setVoteSuccess(false)}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={(e) => setVoteSuccess(false)}>
                    Voted successfully!
            </Alert>
        </Snackbar>
        </>
    )
}

export default HostView