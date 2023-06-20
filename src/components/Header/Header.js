import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

export default function Header({ classStyle, children }) {
  return (
    <header className={`header ${classStyle ? `${classStyle}` : ''}`}>
      <Link to='/' className='header__logo-link'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </Link>
      {children}
    </header>
  )
}
