import React from 'react';
import './Menu.css';
import close from '../../images/close.svg';
import AccountButon from '../AccountButon/AccountButon';
import { Link } from 'react-router-dom';

export default function Menu({ isOpened, closeMenu }) {
    return (
        <div className={`menu ${isOpened ? 'menu_opened' : ''}`}>
            <div className='menu__container'>
                <button onClick={closeMenu} className='menu__button'>
                    <img src={close} alt='Кнопка Закрыть' className='menu__button-close' />
                </button>
                <nav className='menu__elements'>
                    <p className='menu__element'><Link to='/' className='menu__element_link' onClick={closeMenu}>Главная</Link></p>
                    <p className='menu__element'><Link to='/movies' className='menu__element_link' onClick={closeMenu}>Фильмы</Link></p>
                    <p className='menu__element'><Link to='/saved-movies' className='menu__element_link' onClick={closeMenu}>Сохранённые фильмы</Link></p>
                </nav>
                <AccountButon classStyle='account__button_opened' onClick={closeMenu} />
            </div>
        </div>
    )
}
