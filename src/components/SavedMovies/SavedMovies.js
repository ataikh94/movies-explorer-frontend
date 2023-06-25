import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import * as mainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ movies, isChecked, handleChecked, isLiked, isMoviesFound, handleLike,
  filterMovies,
  filterMoviesSubmite,
  keyWord,
  setSaveMovies,
  saveMovies
}) {
  // Эффект при монтировании - запрос на получение всех сохраненных фильмов пользователем
  useEffect(() => {
    mainApi.getMovies()
      .then(res => {
        setSaveMovies(res);
      })
  }, [])

  return (
    <>
      <main className='saved-movies'>
        <SearchForm
          isChecked={isChecked}
          handleChecked={handleChecked}
          filterMovies={filterMovies}
          filterMoviesSubmite={filterMoviesSubmite}
          keyWord={keyWord} />
        <MoviesCardList movies={movies} isChecked={isChecked} isLiked={isLiked} isMoviesFound={isMoviesFound}
          handleLike={handleLike} />
        {/*  <MoviesCard removeButton={true} /> */}
      </main>
      <Footer />
    </>
  )
}
