import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function Techs() {
    return (
        <section className='techs'>
            <SectionTitle text='Технологии' />
            <h3 className='techs__label'>7 технологий</h3>
            <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__list'>
                <li className='techs__list-elem'>HTML</li>
                <li className='techs__list-elem'>CSS</li>
                <li className='techs__list-elem'>JS</li>
                <li className='techs__list-elem'>React</li>
                <li className='techs__list-elem'>Git</li>
                <li className='techs__list-elem'>Express.js</li>
                <li className='techs__list-elem'>mongoDB</li>
            </ul>
        </section>
    )
}
