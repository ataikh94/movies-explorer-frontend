import React from 'react';
import './Portfolio.css';
import PortfolioElement from '../PortfolioElement/PortfolioElement';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <p className='portfolio__title'>Портфолио</p>
      <PortfolioElement text='Статичный сайт' url='https://github.com/ataikh94/how-to-learn' />
      <PortfolioElement text='Адаптивный сайт' url='https://github.com/ataikh94/russian-travel' />
      <PortfolioElement text='Одностраничное приложение' url='https://github.com/ataikh94/react-mesto-api-full-gha' />
    </section>
  )
}
