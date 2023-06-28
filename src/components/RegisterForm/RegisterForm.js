import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import logo from '../../images/logo.svg';

export default function RegisterForm({
  formTitle,
  btnName,
  formDescription,
  btnRoute,
  btnPath,
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid,
  errorClassName,
  isRequestInProgress,
  children
}) {

  return (
    <div className='form'>
      <div className='form__container'>
        <Link to='/' className='form__logo-link'>
          <img src={logo} alt='Логотип' className='form__logo' />
        </Link>
        <h1 className='form__title'>{formTitle}</h1>
        <form name='register-form'
          className='register-form'
          onSubmit={handleSubmit}
          noValidate>
          <div className='register-form__element-group'>
            {children}
            <label className='register-form__input-title' htmlFor='emailRegisterForm'>E-mail</label>
            <input type='email'
              className='register-form__input register-form__input-type_email'
              name='email'
              id='emailRegisterForm'
              placeholder='Email'
              autoComplete='off'
              onChange={handleChange}
              pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,3}$'
              title='Значение в поле "E-mail" должно состоять только из цифр или латинских букв, а также может содержать символы "-", "_", "+", "%", "@" и ".".'
              value={values['email'] ?? ''}
              disabled={isRequestInProgress}
              required />
            <span className={errorClassName('email')}>{errors['email']}</span>
            <label className='register-form__input-title' htmlFor='passwordRegisterForm'>Пароль</label>
            <input type='password'
              className='register-form__input register-form__input-type_password'
              name='password'
              id='passwordRegisterForm'
              placeholder='Пароль'
              autoComplete='off'
              onChange={handleChange}
              value={values['password'] ?? ''}
              disabled={isRequestInProgress}
              required />
            <span className={errorClassName('password')}>{errors['password']}</span>
          </div>
          <div className='register-form__element-group'>
            <button className={`register-form__submit-button ${(isValid || !isRequestInProgress) ? '' : 'register-form__submit-button_disabled'}`}
              type='submit'
              disabled={!isValid || isRequestInProgress}>{btnName}</button>
            <span className='register-form__span'>{`${formDescription} `}
              <Link to={btnPath} className='register-form__span-link'>{btnRoute}</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
