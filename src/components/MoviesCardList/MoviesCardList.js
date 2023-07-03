import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  isChecked,
  isMoviesFound,
  handleLike,
  savedMovies,
  isSavedMovies,
  deleteSaveMovie
}) {
  // Переменные констант
  const initialCountMoviesOnBigScreen = 7; // количество фильмов, отображаемое при поиске на большом экране ()
  const initialCountMoviesOnSmallScreen = 5; // количество фильмов, отображаемое при поиске на маленьком экране ()
  const addedCountMoviesOnBigScreen = 7;// количество фильмов, добавляемое при нажатии кнопки "Еще" на большом экране ()
  const addedCountMoviesOnSmallScreen = 5;// количество фильмов, добавляемое при нажатии кнопки "Еще" на маленьком экране ()
  const pointOfChangeCountMovies = 550// точка перестроения экрана

  const [isHidden, setIsHidden] = useState(false); // состояние кнопки "Ещё"
  const [countVisibleItems, setCountVisibleItems] = useState(initialCountMoviesOnBigScreen); // первоначальное количество отображаемых элементов
  const visibleItems = movies.slice(0, countVisibleItems); // массив элементов с учётом ограничения

  // Функция клика по кнопке "Ещё"
  const handleClick = () => {
    window.innerWidth <= pointOfChangeCountMovies ?
      setCountVisibleItems(countVisibleItems + addedCountMoviesOnSmallScreen) :
      setCountVisibleItems(countVisibleItems + addedCountMoviesOnBigScreen);
  }

  // Функция учёта размера экрана устройства
  const windowSizeControl = () => {
    window.innerWidth <= pointOfChangeCountMovies ? setCountVisibleItems(initialCountMoviesOnSmallScreen) : setCountVisibleItems(initialCountMoviesOnBigScreen);
  }

  // Подписка на изменение размера экрана
  window.onresize = windowSizeControl;

  // Эффект при изменении чекбокса - устанавливать первоначальное количество отображаемых записей
  useEffect(() => {
    windowSizeControl();
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
              savedMovies={savedMovies}
              isSavedMovies={isSavedMovies}
              deleteSaveMovie={deleteSaveMovie} />
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