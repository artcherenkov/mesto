export default class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(newUserInfo),
    }).then(this._getResponseData);
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  setLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "put",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  deleteLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "delete",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  postCard(card) {
    return fetch(`${this._options.baseUrl}/cards/`, {
      method: "post",
      headers: this._options.headers,
      body: JSON.stringify(card),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "delete",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
