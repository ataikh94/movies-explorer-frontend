import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';


export default function Main() {
  return (
    <div className='main'>
      <Header>
        <div className='header__buttons'>
          <Link to='/signup' className='header__button header__buttons_signup'>Регистрация</Link>
          <Link to='/signin' className='header__button header__buttons_signin'>Войти</Link>
        </div>
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  )
}
