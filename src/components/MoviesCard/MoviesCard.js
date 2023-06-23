import React from 'react';
import './MoviesCard.css';
import { Link } from 'react-router-dom';
import { movieApi } from '../../utils/constants';

export default function MoviesCard({ movie, removeButton }) {
    const durationHours =  Math.floor(movie.duration / 60) > 0 ? (Math.floor(movie.duration / 60) + 'ч ') : '';
    const durationMinuts =  (movie.duration % 60) > 0 ? (movie.duration % 60 + 'м') : '';
    const duratuinString = durationHours + durationMinuts;
    return (
        <div className='movie'>
            <div className='movie__info'>
                <h3 className='movie__title'>{movie.nameRU}</h3>
                <span className='movie__duration'>{duratuinString}</span>
                <button className={`button__dislike ${removeButton ? 'button__delete' : ''}`} />
            </div>
            <Link to={movie.trailerLink} target='_blank'>
                <img src={`${movieApi}/${movie.image.url}`} alt={movie.nameRU} className='movie__image' />
            </Link>
        </div>
    )
}
