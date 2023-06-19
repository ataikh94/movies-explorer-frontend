import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

export default function Header({ children }) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo_link'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </Link>
      {children}
    </header>
  )
}
