import React from 'react';
import './Register.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useFormValidation } from '../../utils/useFormValidation';
import ServerMessage from '../ServerMessage/ServerMessage';

export default function Register({ handleRegister, text, errorDisplay }) {

    const { values, errors, isValid, handleChange, setValue } = useFormValidation();
    const errorClassName = (name) => `register-form__input-error ${errors[name] ? 'register-form__input-error_active' : ''}`

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = values;
        handleRegister(name, email, password);
    }

    return (
        <div className='register'>
            <RegisterForm
                formTitle='Добро пожаловать!'
                btnName='Зарегистрироваться'
                formDescription='Уже зарегистрированы?'
                btnRoute='Войти'
                btnPath='/signin'
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                errors={errors}
                isValid={isValid}
                setValue={setValue}
                errorClassName={errorClassName}
                >
                <label className='register-form__input-title' htmlFor='nameRegisterForm'>Имя</label>
                <input type='text'
                    className='register-form__input register-form__input-type_text'
                    name='name'
                    id='nameRegisterForm'
                    placeholder='Имя'
                    autoComplete='off'
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    pattern='(^[А-Яа-яЁё\s\-]+$)|(^[A-Za-z\s\-]+$)'
                    title='Значение поля "Имя" может состоять из латинских или русских букв и содержать в себе пробел или символ "-"'
                    required />
                <span className={errorClassName('name')}>{errors['name']}</span>
            </RegisterForm>
            <ServerMessage text={text} errorDisplay={errorDisplay} />
        </div>
    )
}
