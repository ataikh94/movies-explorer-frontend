import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, isChecked, isMoviesFound }) {
  const [isHidden, setIsHidden] = useState(false);
  const [countVisibleItems, setCountVisibleItems] = useState(7);
  const [moviesArray, setMoviesArray] = useState(movies);

  const visibleItems = moviesArray.slice(0, countVisibleItems);

  useEffect(() => {
    if (countVisibleItems >= moviesArray.length) {
      setIsHidden(true)
    }
  }, [countVisibleItems])

  const handleClick = () => {
    setCountVisibleItems(countVisibleItems + 7);
  }

  useEffect(() => {
    setMoviesArray(movies);
    setCountVisibleItems(7);
  }, [movies])

  useEffect(() => {
    if (moviesArray.length <= 7) {
      setIsHidden(true)
    }
    else {
      setIsHidden(false)
    }
  }, [moviesArray])

  useEffect(() => {
    setCountVisibleItems(7);
    if (isChecked) {
      setMoviesArray(movies.filter(elem => elem.duration <= 40));
    } else {
      setMoviesArray(movies);
    }
  }, [isChecked])

  return (
    <div className='movies-card-list'>
      {!isMoviesFound ?
        <span className='movies-card-list__no-data'>Ничего не найдено</span>
        :
        <>
          {visibleItems.map(elem => {
            return <MoviesCard movie={elem} key={elem.id} />
          })}
          <button type='button' onClick={handleClick} className={`movies-card-list__button-else ${isHidden ? 'movies-card-list__button-else_hidden' : ''}`}>Ещё</button>
        </>
      }
    </div>
  )
}
