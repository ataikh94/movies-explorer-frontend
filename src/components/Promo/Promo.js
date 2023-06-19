import React from 'react';
import './Promo.css';
import planet from '../../images/planet.svg';

export default function Promo() {
    return (
        <section className='promo'>
            <div className='promo__group'>
                <div className='promo__text'>
                    <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <p className='promo__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <img src={planet} alt='Изображение планеты' className='promo__img' />
            </div>
            <button className='promo__button' type='button'><a className='promo__button_link' href='#about-project'>Узнать больше</a></button>
        </section>
    )
}
