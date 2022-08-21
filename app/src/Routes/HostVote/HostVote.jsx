import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import getHost from '../../api/getHost';
import getUser from '../../api/getUser';
import {TextField, IconButton, Alert, Snackbar} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function HostVote() {
    const params = useParams();
    const hostId = params.id;
    const [hostInfo, setHostInfo] = useState();
    // const [songLimit, setSongLimit] = useState();
    const [searchSong, setSearchSong] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [atoken, setAtoken] = useState();
    const getAccessToken = async () => {
        const body = "grant_type=client_credentials&client_id=06fad2935ab74509b6e7470fe1689369&client_secret=fc4fab333d7b49a682d7a0a5b3fd826b"
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
    useEffect(() => {
        const getHostInfo = async () => {
            const host_info = await getHost.getHostById(hostId);
            setHostInfo(host_info);
        }
        getHostInfo();
        getAccessToken();
    }, []);
    useEffect(() => {
        const search = async () => {
            if (searchSong === '') {
                setSearchResults([]);
                return;
            }
            const fetchURL = 'https://api.spotify.com/v1/search?type=track&q=' + searchSong;
            const response = await fetch(fetchURL, { headers: 
                    {Authorization : `Bearer ${atoken}`}
            });
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) setSearchResults([]);
            else setSearchResults(jsonResponse.tracks.items);
        }
        search();
    }, [searchSong, atoken]);
    return (
        <>
        <div className="vote-bg">
            {hostInfo &&
            <>
            <div className="search-container">
                <h2>Find a song to play at {hostInfo.name}</h2>
                <div className="search-field">
                    <TextField 
                        id="outlined-basic" 
                        InputLabelProps={{
                            shrink: false,
                        }}
                        label={searchSong === '' ? 'Name of song' : ''}
                        value={searchSong}
                        onChange={(e) => setSearchSong(e.target.value)}
                        style = {{
                            borderColor: '#489ba6',
                            borderWidth: '2px',
                            width: '25rem'
                        }}
                    ></TextField>
                </div>
            </div>
            
            </>
            }
        </div>
        </>
    )
}

export default HostVote