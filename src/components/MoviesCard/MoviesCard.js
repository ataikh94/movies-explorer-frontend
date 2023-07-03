import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ movie, handleLike, savedMovies, isSavedMovies }) {

    // Преобразование количества минут в строку, содержащую часы и минуты
    const duratuinString = (Math.floor(movie.duration / 60) > 0 ? (Math.floor(movie.duration / 60) + 'ч ') : '') + ((movie.duration % 60) > 0 ? (movie.duration % 60 + 'м') : '');
    const [isLiked, setIsLiked] = useState(false); // Состояние лайка карточки

    // Фнкция клика по кнопке лайка/удаления лайка
    const handlelikeClick = () => {
        if (isSavedMovies) handleLike(movie._id);
        else {
            setIsLiked(!isLiked);
            handleLike(isLiked, movie);
        };
    }

    // Эффект при изменении списка сохраненных фильмов - установка / снятие лайка
    useEffect(() => {
        if (!isSavedMovies) {
          setIsLiked(savedMovies.some(element => element.movieId === movie.movieId));
        }
    }, [savedMovies])

    return (
        <div className='movie'>
            <div className='movie__info'>
                <h3 className='movie__title'>{movie.nameRU}</h3>
                <span className='movie__duration'>{duratuinString}</span>
                <button
                    onClick={handlelikeClick}
                    className={`${isSavedMovies ? 'button__delete' : `button__dislike ${isLiked ? 'button__like' : ''}`}`} />
            </div>
            <Link to={movie.trailerLink} target='_blank'>
                <img src={movie.image} alt={movie.nameRU} className='movie__image' />
            </Link>
        </div>
    )
}
