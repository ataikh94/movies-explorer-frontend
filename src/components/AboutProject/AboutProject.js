import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutProject() {
    return (
        <>
            <section className='about-project' id='about'>
                <SectionTitle text='О проекте' />
                <div className='about-project__description'>
                    <div className='description'>
                        <h3 className='description__title'>Дипломный проект включал 5 этапов</h3>
                        <p className='description__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='description'>
                        <h3 className='description__title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='description__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__grid'>
                    <span className='grid__label grid__label-green'>1 неделя</span>
                    <span className='grid__label grid__label-gray'>4 недели</span>
                    <span className='grid__sign'>Back-end</span>
                    <span className='grid__sign'>Front-end</span>
                </div>
            </section>
        </>
    )
}
