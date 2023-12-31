import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({ isLogged, isMenuOpened, handleClick, closeMenu }) {
  const location = useLocation();

  const HeaderBlock = () => {
    if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') {
      return (
        <header className={`header ${location.pathname === '' || location.pathname === '/' ? 'header-main' : ''}`}>
          <Link to='/' className='header__logo-link'>
            <img src={logo} alt='Логотип' className='header__logo' />
          </Link>
          <Navigation isLogged={isLogged} isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu} />
        </header >
      )
    }
  }
  return <HeaderBlock />
}