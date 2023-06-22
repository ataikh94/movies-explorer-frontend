import React from 'react';
import './RegisterError.css';
import closeButton from '../../images/close.svg';

export default function RegisterError({ text, errorDisplay, closeError }) {
    return (
        <>
            <div className={`error-register ${errorDisplay ? 'error-register_active' : ''}`}>
                <button className='error-register__button' onClick={closeError}>
                    <img src={closeButton} alt='Кнопка Закрыть' className='error-register__button-close' />
                </button>
                <p className='error-register__message'>{text}</p>
            </div >
        </>
    )
}
