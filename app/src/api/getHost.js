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
    }
}

export default getHost;