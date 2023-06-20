import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Регистрация');
        navigate('/signin')
    }

    return (
        <RegisterForm
            formTitle='Добро пожаловать!'
            btnName='Зарегистрироваться'
            formDescription='Уже зарегистрированы?'
            btnRout='Войти'
            btnPath='/signin'
            handleSubmit={handleSubmit}>
            <label className='register-form__input-title' htmlFor='nameRegisterForm'>Имя</label>
            <input type='text'
                className='register-form__input register-form__input-type_text'
                name='name'
                id='nameRegisterForm'
                placeholder='Имя'
                autoComplete='off'
                minLength={2}
                maxLength={30}
                required />
            <span className='register-form__input-error nameRegisterForm-error'></span>
        </RegisterForm>
    )
}
