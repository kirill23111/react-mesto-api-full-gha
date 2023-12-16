import api from './api';

export const BASE_URL = api._baseUrl;

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({ password, email }),
  }).then(getResponse);
};

export const authorize = async (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: api.headers,
    credentials: api.credentials,
    body: JSON.stringify({ email, password }),
  })
  .then(getResponse)
  .then(response => {
    if (api.keyJwtLocalStorage in response) {
      api.setJwtToken(response[api.keyJwtLocalStorage]);
    }
    return response;
  })
};

export const checkToken = async (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: api.headers,
    Authorization: `Bearer ${token}`,
    credentials: api.credentials
  })
  .then(getResponse)
  .then(response => {
    api.setCurrentUser(response);
    return response;
  });
};

