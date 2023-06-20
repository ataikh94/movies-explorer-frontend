import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__group'>
        <p className='footer__group-year'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li className='footer__links-element'><a className='element-link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a></li>
          <li className='footer__links-element'><a className='element-link' href='https://github.com/ataikh94' target='_blank' rel='noreferrer'>Github</a></li>
        </ul>
      </div>
    </footer>
  )
}
