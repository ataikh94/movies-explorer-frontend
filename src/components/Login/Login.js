import React, { useEffect } from 'react';
import './Login.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import ServerMessage from '../ServerMessage/ServerMessage';
import { useFormValidation } from '../../utils/useFormValidation';

export default function Login({ handleLogin, text, errorDisplay }) {

    const { values, errors, isValid, handleChange, setValue } = useFormValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        handleLogin(email, password);
    }

    const errorClassName = (name) => `register-form__input-error ${errors[name] ? 'register-form__input-error_active' : ''}`;

    return (
        <div className='login'>
            <RegisterForm
                formTitle='Рады видеть!'
                btnName='Войти'
                formDescription='Ещё не зарегистрированы?'
                btnRoute='Регистрация'
                btnPath='/signup'
                errorClassName={errorClassName}
                handleSubmit={handleSubmit}
                isValid={isValid}
                handleChange={handleChange}
                setValue={setValue}
                values={values}
                errors={errors}
            />
            <ServerMessage text={text} errorDisplay={errorDisplay} />
        </div>
    )
}
