import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import Menu from '../Menu/Menu';
import AccountButon from '../AccountButon/AccountButon';
import navigation from '../../images/navigation.svg';

export default function Navigation({ isLogged, isMenuOpened, handleClick, closeMenu }) {
  return (
    <>
      <div className={`navigation buttons-unauthorized ${isLogged ? '' : 'buttons-unauthorized_opened'}`}>
        <Link to='/signup' className='navigation__button navigation__buttons-signup'>Регистрация</Link>
        <Link to='/signin' className='navigation__button navigation__buttons-signin'>Войти</Link>
      </div>
      <div className={`navigation buttons-authorized ${isLogged ? 'buttons-authorized_opened' : ''}`}>
        <nav className='navigation__buttons-group'>
          <Link to='/movies' className='navigation__link'>Фильмы</Link>
          <Link to='/saved-movies' className='navigation__link'>Сохраненные фильмы</Link>
        </nav>
        <AccountButon />
        <button className='navigation__burger' onClick={handleClick}>
          <img src={navigation} alt='Кнопка скрытого меню' className='navigation__burger-button' />
        </button>
        <Menu isOpened={isMenuOpened} closeMenu={closeMenu} />
      </div>
    </>
  )
}
