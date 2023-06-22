import React from 'react';
import './Login.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useFormValidation } from '../../utils/useFormValidation';
import RegisterError from '../RegisterError/RegisterError';

export default function Login({ handleLogin, text, errorDisplay, closeError }) {

    const { values, errors, isValid, handleChange, setValue } = useFormValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        handleLogin(email, password)
    }

    const errorClassName = (name) => `register-form__input-error ${errors[name] ? 'register-form__input-error_active' : ''}`

    return (
        <div className='login'>
            <RegisterForm
                formTitle='Рады видеть!'
                btnName='Войти'
                formDescription='Ещё не зарегистрированы?'
                btnRout='Регистрация'
                btnPath='/signup'
                errorClassName={errorClassName}
                handleSubmit={handleSubmit}
                isValid={isValid}
                handleChange={handleChange}
                setValue={setValue}
                values={values}
                errors={errors}
            />
            <RegisterError text={text} errorDisplay={errorDisplay} closeError={closeError} />
        </div>
    )
}
