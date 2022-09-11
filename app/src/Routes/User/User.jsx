import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles.scss';
import {TextField, IconButton, Alert, Snackbar, Autocomplete} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import getHost from '../../api/getHost'

function User() {
    const [hostInfo, setHostInfo] = useState();
    const [searchField, setSearchField] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    useEffect(() => {   
        const getHosts = async () => {
            const response = await getHost.getAllHosts();
            setHostInfo(response);
        }
        getHosts();
    }, [])
    useEffect(() => {
        if (hostInfo) {
            setSearchResults(hostInfo.filter(res => {
                return res.name.includes(searchField)
            }));
        }
    }, [searchField, hostInfo])
    const handleSearch = async () => {
        const response = await getHost.getHostById(selected._id);
        if (response.error) setError(true);
        else navigate('/user/viewhost/' + response._id);
    }
    return (
        <>
        <div className="user-bg">
            <h2>Control the narrative.</h2>
            <p>Vote for the music you'd like to be played!</p>
            
            <div className="search-field">
                <Autocomplete
                    // freeSolo
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    onChange={(event, value) => {
                        setSelected(value);
                        setSearchField(value ? value.name : '');
                    }}
                    options={searchResults}
                    getOptionLabel={(option) => option.name}
                    renderInput = {
                        (params) => 
                        <TextField {...params} 
                            // InputLabelProps={{
                            //     shrink: false,
                            // }}
                            label={searchField === '' ? 'Host Name' : ''}
                            value={searchField}
                            style = {{
                                borderColor: 'white',
                                borderWidth: '2px',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    }
                />
                {/* <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{
                        shrink: false,
                    }}
                    label={searchField === '' ? 'Host Name or ID' : ''}
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    style = {{
                        borderColor: 'white',
                        borderWidth: '2px',
                        width: '25rem'
                    }}
                ></TextField> */}
                <IconButton aria-label="search" size="medium" onClick = {e => {handleSearch()}}>
                    <SearchIcon style={{color: '#489ba6'}} fontSize="medium" />
                </IconButton>   
            </div>
           
        </div>
        <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <Snackbar open={error} autoHideDuration={3000} onClose={(e) => setError(false)}>
            <Alert severity="error" sx={{ width: '100%' }} onClose={(e) => setError(false)}>
                    Could not find host
            </Alert>
        </Snackbar>
        </div>
        </>
    )
}

export default User