import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className='not-found-page'>
            <h1 className='not-found-page__title'>404</h1>
            <p className='not-found-page__description'>Страница не найдена</p>
            <p className='not-found-page__button'>
                <Link to='/' className='not-found-page__link'>Назад</Link>
            </p>
        </div>
    )
}
