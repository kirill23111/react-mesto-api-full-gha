import { Cookie } from "./cookie";

class Api {
  keyJwtLocalStorage = 'authorization';
  _sentHeaderJwt = true;
  _sentCookieJwt = false;
  _user = null;
  _cookies = {};

  get headers() {
    const headers = { ...this._headers };

    if (this._sentCookieJwt === false) delete headers['Cookie'];
    if (this._sentHeaderJwt === false) delete headers[this.keyJwtLocalStorage];

    return headers;
  }
  
  get credentials() {
    return this._sentCookieJwt ? 'include' : 'same-origin';
  }

  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
    this._initJwtToken();
  }

  setJwtToken(token, localStorageBool = true) {
    if (localStorageBool === true) {
      localStorage.setItem(this.keyJwtLocalStorage, JSON.stringify(token));
    }
    this._headers[this.keyJwtLocalStorage] = token;
    this._headers['Cookie'] = Cookie.stringify({ [this.keyJwtLocalStorage]: token });
    this._cookies[this.keyJwtLocalStorage] = token;
  }

  setCurrentUser(user) {
    this._user = user;
  }

  getCurrentUser() {
    return this._user;
  }

  deleteJwtToken() {
    localStorage.removeItem(this.keyJwtLocalStorage);
    delete this._headers[this.keyJwtLocalStorage];
    delete this._headers['Cookie'];
    delete this._cookies[this.keyJwtLocalStorage];
  }

  getJwtToken() {
    return this._headers[this.keyJwtLocalStorage];
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials
    }).then(this._checkResponse);
  }

  async getCards(token) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
    });

    return await this._checkResponse(res);
  }

  updateUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._checkResponse)
    .then((response) => {
      const { name, about } = response;
      this._setNameAndAboutToUser(name, about);
      return response;
    })
    ;
  }

  createCard({ link, name }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
      body: JSON.stringify({
        link,
        name,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
    }).then(this._checkResponse);
  }

  updateUserAvatar({ avatar }, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
      body: JSON.stringify({ avatar }),
    })
    .then(this._checkResponse)
    .then(response => {
      const { avatar } = response;
      this._setAvatarToUser(avatar);
      return response;
    })
    ;
  }

  likeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
      Authorization: `Bearer ${token}`,
      credentials: this.credentials,
    }).then(this._checkResponse);
  }

  _setNameAndAboutToUser(name, about) {
    this._user = {
      ...this._user,
      name: name,
      about: about
    };
  }

  _setAvatarToUser(avatar) {
    this._user = {
      ...this._user,
      avatar: avatar
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _initJwtToken() {
    const jwtTokenInLocalStorage = this._getJwtTokenInLocalStorage();

    if (jwtTokenInLocalStorage !== null) {
      this.setJwtToken(jwtTokenInLocalStorage, false);
    }
  }

  _getJwtTokenInLocalStorage() {
    const jwtTokenNotParsed = localStorage.getItem(this.keyJwtLocalStorage);

    if (jwtTokenNotParsed === null) return null;

    return JSON.parse(jwtTokenNotParsed);
  }
}

const api = new Api({
  url: "https://api.mestoproject.nomoredomainsmonster.ru",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default api;