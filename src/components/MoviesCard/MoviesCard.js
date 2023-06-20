import React from 'react';
import './MoviesCard.css';
import movie1 from '../../images/movie-1.png';

export default function MoviesCard({ removeButton }) {
    return (
        <div className='movies-list'>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>33 слова о дизайне</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>33 слова о дизайне</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>В погоне за Бенкси</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like button__dislike ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>В погоне за Бенкси</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like button__dislike ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>Бег это свобода</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>Книготорговцы</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like button__dislike ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
            <div className='movie'>
                <div className='movie__info'>
                    <h3 className='movie__title'>Когда я думаю о Германии ночью</h3>
                    <span className='movie__duration'>1ч 42м</span>
                    <button className={`button__like button__dislike ${removeButton ? 'button__delete' : ''}`} />
                </div>
                <img src={movie1} alt='Изображение к фильму' className='movie__image' />
            </div>
        </div>
    )
}
