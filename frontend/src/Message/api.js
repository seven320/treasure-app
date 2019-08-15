import BaseClient from '../lib/BaseClient';

const API_ENDPOINT = process.env.BACKEND_API_BASE;

class MessageClient extends BaseClient {
    async getPublicMessage() {
        return fetch(`${API_ENDPOINT}/public`).then(v => v.json());
    }

    async getPrivateMessage() {
        const token = await this.getToken();
        return fetch(`${API_ENDPOINT}/private`, {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`
            }),
            credentials: "same-origin"
          }).then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw Error(`Request rejected with status ${res.status}`);
            }
          });
    }
}

export default new MessageClient();
