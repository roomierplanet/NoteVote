const clientID = '06fad2935ab74509b6e7470fe1689369';
const redirectURI = 'http://localhost:3000';

const Spotify = {
    getAccessToken(redir) {
        let token = this.findToken();
        if (token) return token;
        else {
            this.setToken(redir);
            return this.findToken();
        } 
    },
    findToken() {
        const expires = 0 + localStorage.getItem('a_token_expires', '0');
        if ((new Date()).getTime() <= expires) {
            return localStorage.getItem('a_token', '');
        }
    },
    setToken(redir) {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            const expiresIn = Number(expiresInMatch[1]);
            let accessToken = accessTokenMatch[1];
            localStorage.setItem('a_token', accessToken);
            localStorage.setItem('a_token_expires', (new Date()).getTime() + expiresIn)
        } else {
            this.authorize(redir);
        }
    },
    authorize(redir) {
        const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}${redir}`;
        window.location = url;
    },
    async getTracks(playlist, redir) {
        const entries = Object.entries(playlist).sort((a, b) => b[1] - a[1]);
        let id_arr = [];
        entries.forEach((entry) => id_arr.push(entry[0]));
        console.log(id_arr);
        const id_str = id_arr.join(",");
        const token = this.getAccessToken(redir);
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
    }
}

export default Spotify;