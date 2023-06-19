import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <section className='movies-card-list'>
      <span className='movies-card-list__no-data'>Ничего не найдено</span>
      <MoviesCard />
      <button type='button' className='movies-card-list__button_else'>Ещё</button>
    </section>
  )
}
