import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesCard.css';

import { movieApi } from '../../utils/constants';

export default function MoviesCard({ movie, removeButton, handleLike, isLiked }) {
    // Преобразование количества минут в строку, содержащую часы и минуты
    const duratuinString = (Math.floor(movie.duration / 60) > 0 ? (Math.floor(movie.duration / 60) + 'ч ') : '') + ((movie.duration % 60) > 0 ? (movie.duration % 60 + 'м') : '');

    const handlelikeClick = () => {
        handleLike(movie.id);
    }

    return (
        <div className='movie'>
            <div className='movie__info'>
                <h3 className='movie__title'>{movie.nameRU}</h3>
                <span className='movie__duration'>{duratuinString}</span>
                <button
                    onClick={handlelikeClick}
                    className={`button__dislike ${isLiked ? 'button__like' : ''} ${removeButton ? 'button__delete' : ''}`} />
            </div>
            <Link to={movie.trailerLink} target='_blank'>
                <img src={`${movieApi}${movie.image.url}`} alt={movie.nameRU} className='movie__image' />
            </Link>
        </div>
    )
}
