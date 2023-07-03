import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
const navigate = useNavigate();

const goBack = () => {
    navigate(-2);
}

    return (
        <div className='not-found-page'>
            <h1 className='not-found-page__title'>404</h1>
            <p className='not-found-page__description'>Страница не найдена</p>
            <p className='not-found-page__button'>
                <button onClick={goBack} className='not-found-page__link'>Назад</button>
            </p>
        </div>
    )
}
