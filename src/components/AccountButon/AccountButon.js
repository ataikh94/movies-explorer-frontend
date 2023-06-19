import React from 'react';
import { Link } from 'react-router-dom';
import './AccountButon.css';
import account from '../../images/account.svg';

export default function AccountButon({ classStyle }) {

  return (
    <Link to='/profile'><img src={account} alt='Кнопка перехода в аккаунт' className={`account__button ${classStyle}`} /></Link>
  )
}
