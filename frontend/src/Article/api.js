import BaseClient from "../lib/BaseClient";

const API_ENDPOINT = process.env.BACKEND_API_BASE;

class ArticleClient extends BaseClient {
  async fetchArticle(articleId) {
    return fetch(`${API_ENDPOINT}/articles/${articleId}`).then(v => v.json());
  }

  async createArticle(title, body) {
    const token = await super.getToken();
    return fetch(`${API_ENDPOINT}/articles`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      }),
      credentials: "same-origin",
      body: JSON.stringify({ title, body })
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`Failed to create article with status ${res.status}`);
      }
    });
  }

  async deleteArticle(articleId) {
    const token = await super.getToken();
    return fetch(`${API_ENDPOINT}/articles/${articleId}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      }),
      credentials: "same-origin",
    }).then(res => {
      if (res.ok) {
        return;
      } else {
        // 権限周りのエラーはハンドリングする必要ありそう
        throw Error(`Failed to delete article with status ${res.status}`);
      }
    });
  }

  async updateArticle(articleId, title, body) {
    const token = await super.getToken();
    return fetch(`${API_ENDPOINT}/articles/${articleId}`, {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      }),
      credentials: "same-origin",
      body: JSON.stringify({ title, body })
    }).then(res => {
      if (res.ok) {
        return;
      } else {
        // 自分のじゃないと編集できないよ的なResponseハンドリングしたい
        throw Error(`Failed to create article with status ${res.status}`);
      }
    });
  }
}

export default new ArticleClient();
