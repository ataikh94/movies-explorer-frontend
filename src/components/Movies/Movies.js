import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RegisterError from '../RegisterError/RegisterError';
import { filterCheckBox, filterKeyWord } from '../../utils/filterMovies';


export default function Movies({
  keyWord,
  isEmpty,
  isLoaderOpened,
  movies,
  text,
  errorDisplay,
  isServerCrash,
  isChecked,
  isMoviesFound,
  setIsMoviesFound,
  handleLike,
  setIsChecked,
  setKeyWord,
  setIsEmpty,
  setMovies,
  setAllFindMovies,
  setMoviesByKey,
  setIsLoaderOpened,
  setIsServerCrash,
  displayErrorMessage,
  moviesByKey,
  allFindMovies,
  savedMovies,
  getMovies
}) {

  // Функция изменения чекбокса
  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  // Функция изменения поля поиска фильмов
  const filterMoviesChange = (e) => {
    setKeyWord(e.target.value.toLowerCase());
    if (e.target.value === '') {
      setIsEmpty(true);
    }
    setIsMoviesFound(false);
  }

  // Функция сабмита поля поиска фильмов
  const filterMoviesSubmite = (e) => {
    e.preventDefault();
    if (keyWord === '') {
      setIsEmpty(true);
      setMovies([]);
      setAllFindMovies([]);
      setMoviesByKey([]);
      return;
    }
    setIsLoaderOpened(true);
    getMovies();
  }

  // Эффект при изменении ключевого слова
  useEffect(() => {
    if (keyWord === '') {
      setMovies([]);
      setAllFindMovies([]);
      setMoviesByKey([]);
      setIsMoviesFound(false);
      return;
    }
    setIsEmpty(false);

  }, [keyWord])

  // Эффект - фильтрация данных при получении списка фильмов
  useEffect(() => {
    const movieKeyWordArray = filterKeyWord(movies, keyWord);
    if (movieKeyWordArray.length === 0) {
      setAllFindMovies([]);
      return setIsMoviesFound(false);
    }
    setIsMoviesFound(true);
    setAllFindMovies(movieKeyWordArray);
    setMoviesByKey(movieKeyWordArray);
    const movieCheckboxArray = filterCheckBox(movieKeyWordArray, isChecked);
    if (movieCheckboxArray.length > 0) {
      setAllFindMovies(movieCheckboxArray);
      setIsMoviesFound(true);
    }
    else {
      setAllFindMovies([]);
      setIsMoviesFound(false);
    }
  }, [movies, isChecked, keyWord])

  useEffect(() => {
    const movieCheckboxArray = filterCheckBox(moviesByKey, isChecked);
    if (movieCheckboxArray.length > 0) {
      setAllFindMovies(movieCheckboxArray);
    }
  }, [])

  return (
    <>
      <main className='movies'>
        <SearchForm
          keyWord={keyWord}
          isEmpty={isEmpty}
          handleChecked={handleChecked}
          isChecked={isChecked}
          filterMovies={filterMoviesChange}
          filterMoviesSubmite={filterMoviesSubmite} />
        {isLoaderOpened ?
          <Preloader isLoaderOpened={isLoaderOpened} /> :
          errorDisplay ?
            <RegisterError
              text={text}
              errorDisplay={errorDisplay}
              isServerCrash={isServerCrash} /> :
            <MoviesCardList
              movies={allFindMovies}
              handleLike={handleLike}
              isChecked={isChecked}
              isMoviesFound={isMoviesFound}
              setIsMoviesFound={setIsMoviesFound}
              savedMovies={savedMovies} />
        }
      </main>
      <Footer />
    </>
  )
}