import {useState} from 'react'
import '../../styles.scss'
import {TextField, IconButton, Alert, Snackbar} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import getHost from '../../api/getHost'

function User() {
    const [hostId, setHostId] = useState('');
    const [error, setError] = useState(false);
    const handleSearch = async () => {
        const response = await getHost.getHostById(hostId);
        if (response.error) setError(true);
    }
    return (
        <>
        <div className="user-bg">
            <h2>Control the narrative.</h2>
            <p>Vote for the music you'd like to be played!</p>
            
            <div className="search-field">
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{
                        shrink: false,
                    }}
                    label={hostId === '' ? 'Host ID' : ''}
                    value={hostId}
                    onChange={(e) => setHostId(e.target.value)}
                    style = {{
                        borderColor: '#489ba6',
                        borderWidth: '2px',
                        width: '25rem'
                    }}
                ></TextField>
                <IconButton aria-label="search" size="large" onClick = {e => {handleSearch()}}>
                    <SearchIcon style={{color: '#489ba6'}} fontSize="inherit" />
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