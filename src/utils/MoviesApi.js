import { movieApi } from "./constants";

export const arrayMovies = () => {
    return fetch(`${movieApi}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
}