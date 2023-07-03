import React from 'react';
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../images/photo.jpg';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <SectionTitle text='Студент' />
      <div className='student'>
        <h3 className='student__name'>Анна Тайх</h3>
        <p className='student__position'>Фронтенд-разработчик, 29 лет</p>
        <p className='student__description'>Я родилась и живу в Пензе, закончила факультет управления качеством ПГУ(магистратура). Я люблю слушать музыку и смотреть сериалы. В разработке совсем недавно. С 2017 года работаю в IT компании «Смарт-Тим Сервис». После того, как пройду курс по веб-разработке, планирую начать заниматься фриланс-заказами.</p>
        <img src={photo} alt='Фото студента' className='student__photo' />
        <a className='student__contact' href='https://github.com/ataikh94' target='_blank' rel='noreferrer'>Github</a>
      </div>
    </section>
  )
}
