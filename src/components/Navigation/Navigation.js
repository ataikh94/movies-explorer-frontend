import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import navigation from '../../images/navigation.svg';
import Menu from '../Menu/Menu';
import AccountButon from '../AccountButon/AccountButon';


export default function Navigation({ isMenuOpened, handleClick, closeMenu }) {
  return (
    <>
      <nav className='navigation__buttons-group'>
        <Link to='/movies' className='navigation__link'>Фильмы</Link>
        <Link to='/saved-movies' className='navigation__link'>Сохраненные фильмы</Link>
      </nav>
      <AccountButon />
      <button className='navigation__burger' onClick={handleClick}>
        <img src={navigation} alt='Кнопка скрытого меню' className='navigation__burger-button' />
      </button>
      <Menu isOpened={isMenuOpened} closeMenu={closeMenu} />
    </>
  )
}
