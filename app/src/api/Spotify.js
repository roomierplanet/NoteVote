const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = 'http://localhost:3000';

const Spotify = {
    getAccessToken(redir) {
        let token = this.findToken();
        if (!token) {
            this.authorize(redir);
            this.setToken();
            token = this.findToken();
        }
        return token;
    },
    setToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            let accessToken = accessTokenMatch[1];
            localStorage.setItem('a_token', accessToken);
            localStorage.setItem('a_token_expires', (new Date()));
        }
    },
    findToken() {
        let accessToken = localStorage.getItem('a_token', '');
        const expires = new Date(localStorage.getItem('a_token_expires', ''));
        const time_now = new Date();
        const minutes = 1000 * 60;
        if ((time_now - expires) / minutes >= 60) return;
        return accessToken;
    },
    authorize(redir) {
        const scopes = [
            'user-read-private',
            'playlist-read-private',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'user-library-modify',
            'user-follow-read',
            'user-follow-modify'
        ]
        const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}${redir}&scope=` + encodeURIComponent(scopes.join(' '));;
        window.location = url;
    },
    async getTracks(playlist, redir) {
        const entries = Object.entries(playlist).sort((a, b) => b[1] - a[1]);
        let id_arr = [];
        entries.forEach((entry) => id_arr.push(entry[0]));
        const id_str = id_arr.join(",");
        let token = this.getAccessToken(redir);
        const response = await fetch('https://api.spotify.com/v1/tracks?ids=' + id_str, {
            headers:
            {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        const tracks_array = jsonResponse.tracks;
        tracks_array.forEach((track, i) => {
            track.votes = entries[i][1]});
        return tracks_array;
    },
    async savePlaylist(playlist, playlistId) {
        let token = this.getAccessToken('host/dashboard');
        const userDataResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).catch((err) => console.log(err.message));
        let userId = await userDataResponse.json();
        userId = userId.id;
        if (playlistId === '') playlistId = 'something';
        const getPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).catch(err => {});
        const checkExists = await getPlaylist.json();
        if (checkExists.error) {
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'NoteVote',
                    description: 'Dynamically generated playlist based on user votes on NoteVote!'
                })
            }).catch(err => console.log(err));
            const playlistResponseJson = await playlistResponse.json();
            console.log(playlistResponseJson);
            const id = playlistResponseJson.id;
            playlistId = id;
        }
        const uris = playlist.map((track) => track.uri);
        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: uris
            })
        });
        return playlistId;
    }
}


export default Spotify;