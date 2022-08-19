const baseURL = "/groups/";

const getHost = {
    async getAllHosts() {
        const response = await fetch(baseURL);
        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(err) {
            console.log(err.message);
        }
        return jsonResponse
    },
    async getHostById(_id) {
        const response = await fetch(baseURL + _id + "/");
        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(err) {
            console.log(err.message);
        }
        return jsonResponse;
    },
    async getHostByAuth0Id(auth0_id) {
        const fetchURL = baseURL + 'auth0/' + auth0_id + '/'
        const response = await fetch(fetchURL);
        let jsonResponse;
        try {
            jsonResponse = await response.json();
        } catch(err) {
            console.log(err.message);
        }
        return jsonResponse;
    },
    async createHost(data) {
        data.playlist = {};
        data.restrictions = {};
        data.playlist_id = "";
        const body = JSON.stringify(data)
        const response = await fetch(baseURL, {
            method: "POST",
            body: body
        })
        return response;
    }
}

export default getHost;