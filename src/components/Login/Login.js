import React from 'react'
import RegisterForm from '../RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Авторизация');
        navigate('/');
    }

    return (
        <RegisterForm
            formTitle='Рады видеть!'
            btnName='Войти'
            formDescription='Ещё не зарегистрированы?'
            btnRout='Регистрация'
            btnPath='/signup'
            handleSubmit={handleSubmit}
        />
    )
}
