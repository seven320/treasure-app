export default class {
    setUser(user) {
        this.user = user;
    }

    async getToken() {
        if (this.user === null) {
            return Promise.reject(new Error(`'user' object is not set. Login required.`));
        }
        return this.user.getToken();
    }
}