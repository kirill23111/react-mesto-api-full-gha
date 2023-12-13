class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
    this._initJwtToken();
  }

  setJwtToken(token, localStorageBool = true) {
    if (localStorageBool === true) {
      localStorage.setItem('token', JSON.stringify(token));
    }
    this._headers.authorization = token;
  }

  getJwtToken() {
    return this._headers.authorization;
  }

  _initJwtToken() {
    const jwtTokenInLocalStorage = this._getJwtTokenInLocalStorage();

    if (jwtTokenInLocalStorage !== null) {
      this.setJwtToken(jwtTokenInLocalStorage, false);
    }
  }

  _getJwtTokenInLocalStorage() {
    const jwtTokenNotParsed = localStorage.getItem('token');

    if (jwtTokenNotParsed === null) return null;

    return JSON.parse(jwtTokenNotParsed);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });

    return await this._checkResponse(res);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  createCard({ link, name }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link,
        name,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserAvatar({ avatar }) {
    console.log({ avatar });
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const api = new Api({
  url: "http://api.mestoproject.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
