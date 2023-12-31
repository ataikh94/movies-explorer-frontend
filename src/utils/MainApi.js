import { baseUrl } from './constants';

// Запрос на регистрацию
export const register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)));
};

// Запрос на авторизацию
export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
};

// Запрос на проверку токена
export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
      });
}

// Запрос на обновление данных пользователя
export const updateUser = (name, email) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
};

// Запрос на список сохраненных фильмов
export const getMovies = () => {
    return fetch(`${baseUrl}/movies`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
};

// Запрос на добавление фильма
export const likeMovie = (movie) => {
    return fetch(`${baseUrl}/movies`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
};

export const deleteMovie = (id) => {
    return fetch(`${baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
};