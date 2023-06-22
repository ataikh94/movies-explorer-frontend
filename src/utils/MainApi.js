import { baseUrl } from './constants';

/* AUTH */

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
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(res)
        });
};

// Запрос на обновлениеданных пользователя
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