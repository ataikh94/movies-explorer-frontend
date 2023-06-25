import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as mainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({isChecked, isLiked, isMoviesFound, handleLike}) {
  const [saveMovies, setSaveMovies] = useState([]); // состояние массива сохраненных фильмов
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
        <SearchForm />
        <MoviesCardList movies={saveMovies} isChecked={isChecked} isLiked={isLiked} isMoviesFound={isMoviesFound} 
        handleLike={handleLike}/>
       {/*  <MoviesCard removeButton={true} /> */}
      </main>
      <Footer />
    </>
  )
}
