// The user information is set on localStorage. This is better since user authentication adds a useless step and takes up more 
// cloud infrastructure. Will consider adding Auth0 as application scales.
const getUser = {
    getUserInfo() {
        let user_info = localStorage.getItem('user_info', '');
        if (!user_info) {
            const body = {
                'joined on': (new Date()),
                'votes': {},
            }
            localStorage.setItem('user_info', JSON.stringify(body));
        }
        return JSON.parse(localStorage.getItem('user_info', ''));
    },
    saveUserInfo(user_info) {
        localStorage.setItem('user_info', JSON.stringify(user_info));
    },
    canVote(hostId) {
        const user_info = this.getUserInfo();
        const last_vote = user_info.votes[hostId];
        if (last_vote) {
            const time_now = new Date();
            const hours = 1000 * 60 * 60;
            const last_vote_time = new Date(last_vote);
            const hours_passed = (time_now - last_vote_time) / hours;
            console.log(hours_passed);
            return hours_passed >= 24;
        }
        return true;
    }
}

export default getUser;