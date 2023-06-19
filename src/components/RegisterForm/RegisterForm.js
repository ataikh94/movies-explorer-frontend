import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import logo from '../../images/logo.svg';

export default function RegisterForm({ formTitle, btnName, formDescription, btnRout, btnPath, handleSubmit, children }) {
  return (
    <div className='form'>
      <div className='form__container'>
        <Link to='/' className='form__logo_link'>
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
              className='register-form__input register-form__input_type_email'
              name='email'
              id='emailRegisterForm'
              placeholder='Email'
              autoComplete='off'
              required />
            <span className='register-form__input-error emailRegisterForm-error'></span>
            <label className='register-form__input-title' htmlFor='passwordRegisterForm'>Пароль</label>
            <input type='password'
              className='register-form__input register-form__input_type_password'
              name='password'
              id='passwordRegisterForm'
              placeholder='Пароль'
              autoComplete='off'
              required />
            <span className='register-form__input-error passwordRegisterForm-error'></span>
          </div>
          <div className='register-form__element-group'>
            <button className='register-form__submit-button' type='submit'>{btnName}</button>
            <span className='register-form__span'>{`${formDescription} `}
              <Link to={btnPath} className='register-form__span_link'>{btnRout}</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
