import React from 'react';
import './PortfolioElement.css';
import link from '../../images/link.svg';

export default function PortfolioElement({ text, url }) {
    return (
        <div className='portfolio-element'>
            <h2 className='portfolio-element__title'>{text}</h2>
            <a className='portfolio-element_link' href={url} target='_blank' rel='noreferrer'>
                <img src={link} alt='Изображение стрелки' className='portfolio-element_img' />
            </a>
        </div>
    )
}
