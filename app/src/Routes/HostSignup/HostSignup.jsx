import '../../styles.scss'
import {TextField} from '@mui/material'
import { useState } from 'react'

function HostSignup() {
    const [details, setDetails] = useState({
        name:"",
        playlist_length: 0,
        song_limit: 1,
        email: "",
        playlist_id: ""
    })
    return (
        <div className="singup-bg">
            <div className="signup-container">
            <h2>Tell us more about yourself.</h2>
            <hr />
            <div className="form">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            
            </div>
        </div>
    )
}

export default HostSignup