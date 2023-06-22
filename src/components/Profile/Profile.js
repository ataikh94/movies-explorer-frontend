import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

export default function Profile({ name, email, isMenuOpened, handleClick, closeMenu, isLogged }) {

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Данные отредактированы');
  }

  const singOut = () => {
    localStorage.removeItem('jwt');
    navigate('/signin', true);
  }

  return (
    <>
      <Header>
        <Navigation isAuthorized={isLogged} isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu} />
      </Header>
      <main className='profile'>
        <h1 className='profile__title'>Привет, {name}!</h1>
        <form name='profile-form'
          className='profile-form'
          onSubmit={handleSubmit}>
          <div className='profile-form__element-group'>
            <div className='profile-form__element'>
              <label htmlFor='nameProfileForm' className='profile-form__input-title'>Имя</label>
              <input type='text'
                className='profile-form__input profile-form__input-type_text'
                name='name'
                id='nameProfileForm'
                autoComplete='off'
                minLength={2}
                maxLength={30}
                defaultValue={name}
                required />
            </div>
            <span className='profile-form__input-error nameProfileForm-error'></span>
            <div className='profile-form__element'>
              <label htmlFor='nameProfileForm' className='profile-form__input-title'>E-mail</label>
              <input type='email'
                className='profile-form__input profile-form__input-type_email'
                name='email'
                id='emailProfileForm'
                autoComplete='off'
                defaultValue={email}
                required />
            </div>
            <span className='profile-form__input-error emailProfileForm-error'></span>
          </div>
          <button className='profile-form__submit-button' type='submit'>Редактировать</button>
          <button className='profile-form__signout' onClick={singOut}>
            <Link to='/signin' className='profile-form__signout-link'>Выйти из аккаунта</Link>
          </button>
        </form>
      </main>
    </>
  )
}
