import React from 'react';
import { Link } from 'react-router-dom';
import './AccountButon.css';
import account from '../../images/account.svg';

export default function AccountButon({ classStyle, closeMenu }) {

  return (
    <Link to='/profile'><img src={account} alt='Кнопка перехода в аккаунт' onClick={closeMenu} className={`account__button ${classStyle}`} /></Link>
  )
}
