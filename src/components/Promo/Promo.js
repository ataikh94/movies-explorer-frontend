import React from 'react';
import './Promo.css';
import planet from '../../images/planet.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
            <button className='promo__button' type='button'><AnchorLink className='promo__button-link' href='#about'>Узнать больше</AnchorLink></button>
        </section>
    )
}
