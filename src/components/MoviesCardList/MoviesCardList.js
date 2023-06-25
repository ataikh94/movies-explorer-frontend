import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movieApi } from '../../utils/constants';

export default function MoviesCardList({
  movies,
  isChecked,
  isMoviesFound,
  isLiked,
  handleLike
}) {
  const [isHidden, setIsHidden] = useState(false); // состояние кнопки "Ещё"
  const [countVisibleItems, setCountVisibleItems] = useState(7); // первоначальное количество отображаемых элементов
  const visibleItems = movies.slice(0, countVisibleItems); // массив элементов с учётом ограничения

  // Функция клика по кнопке "Ещё"
  const handleClick = () => {
    window.innerWidth <= 550 ?
      setCountVisibleItems(countVisibleItems + 5) :
      setCountVisibleItems(countVisibleItems + 7);
  }

  const windowSizeControl = () => {
    window.innerWidth <= 550 ? setCountVisibleItems(5) : setCountVisibleItems(7);
  }

  window.onresize = windowSizeControl;

  // Эффект при изменении чекбокса - устанавливать первоначальное количество отображаемых записей
  useEffect(() => {
    setCountVisibleItems(7);
  }, [isChecked])

  // Эффект при изменении количества отображаемых записей - скрыть кнопку "Ещё"
  useEffect(() => {
    if (countVisibleItems >= movies.length) {
      return setIsHidden(true)
    }
    return setIsHidden(false)
  }, [countVisibleItems, movies])

  return (
    <div className='movies-card-list'>
      {!isMoviesFound ?
        <span className='movies-card-list__no-data'>Ничего не найдено</span> :
        <>
          {visibleItems.map(elem => {
            return <MoviesCard
              movie={elem}
              key={elem.movieId}
              handleLike={handleLike}
              isLiked={isLiked} />
          })}
          < button type='button'
            onClick={handleClick}
            className={`movies-card-list__button-else ${isHidden ? 'movies-card-list__button-else_hidden' : ''}`}>
            Ещё
          </button>
        </>
      }
    </div >
  )
}