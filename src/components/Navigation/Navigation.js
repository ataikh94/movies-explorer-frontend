import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import navigation from '../../images/navigation.svg';
import Menu from '../Menu/Menu';
import AccountButon from '../AccountButon/AccountButon';


export default function Navigation({ isAuthorized, isMenuOpened, handleClick, closeMenu }) {
  return (
    <>
      <div className={`navigation__buttons-unauthorized ${isAuthorized ? '' : 'buttons-unauthorized_opened'}`}>
        <Link to='/signup' className='navigation__button navigation__buttons-signup'>Регистрация</Link>
        <Link to='/signin' className='navigation__button navigation__buttons-signin'>Войти</Link>
      </div>
      <div className={`navigation__buttons-authorized ${isAuthorized ? 'buttons-authorized_opened' : ''}`}>
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
