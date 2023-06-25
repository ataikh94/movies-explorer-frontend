import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { userContext } from '../../context/userContext';
import { useFormValidation } from '../../utils/useFormValidation';
import RegisterError from '../RegisterError/RegisterError';

export default function Profile({ updateUser, text, errorDisplay, handleCloseErrorMessage, updateUserSuccess, setIsLogged }) {

  const { values, errors, isValid, handleChange, setValue, setIsValid } = useFormValidation();

  useEffect(() => {
    setIsValid(true);
  }, []);

  const errorClassName = (name) => `profile-form__input-error ${errors[name] ? 'profile-form__input-error_active' : ''}`

  const currentUser = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('email', currentUser.email);
    }
  }, [currentUser, setValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = values['name'];
    const email = values['email'];
    updateUser(name, email);
  }

  const singOut = () => {
    localStorage.removeItem('jwt');
    setIsLogged(false);
    navigate('/', true);
  }

  return (
    <>
      <main className='profile'>
        <h1 className='profile__title'>Привет, {values['name']}!</h1>
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
                pattern='(^[А-Яа-яЁё\s\-]+$)|(^[A-Za-z\s\-]+$)'
                title='Значение поля "Имя" может состоять из латинских или русских букв и содержать в себе пробел или символ "-"'
                value={values['name'] ?? ''}
                onChange={handleChange}
                required />
            </div>
            <span className={errorClassName('name')}>{errors['name']}</span>
            <div className='profile-form__element'>
              <label htmlFor='nameProfileForm' className='profile-form__input-title'>E-mail</label>
              <input type='email'
                className='profile-form__input profile-form__input-type_email'
                name='email'
                id='emailProfileForm'
                autoComplete='off'
                pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.[A-Za-z]{2,3}$'
                title='Значение в поле "E-mail" должно состоять только из цифр или латинских букв, а также может содержать символы "-", "_", "+", "%", "@" и ".".'
                value={values['email'] ?? ''}
                onChange={handleChange}
                required />
            </div>
            <span className={errorClassName('email')}>{errors['email']}</span>
          </div>
          <button className={`profile-form__submit-button ${isValid ? '' : 'profile-form__submit-button_disabled'}`} type='submit' disabled={!isValid}>Редактировать</button>
          <button className='profile-form__signout' onClick={singOut}>
            <Link to='/signin' className='profile-form__signout-link'>Выйти из аккаунта</Link>
          </button>
        </form>
      </main>
      <RegisterError text={text} errorDisplay={errorDisplay} updateUserSuccess={updateUserSuccess}/>
    </>
  )
}
