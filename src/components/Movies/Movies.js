import React, { useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ServerMessage from '../ServerMessage/ServerMessage';
import { filterCheckBox, filterKeyWord } from '../../utils/filterMovies';

export default function Movies({
  movies,
  isChecked,
  isMoviesFound,
  isLoaderOpened,
  keyWord,
  isEmpty,
  handleLike,
  text,
  errorDisplay,
  isServerCrash,
  setIsChecked,
  setKeyWord,
  setIsEmpty,
  setMovies,
  setAllFindMovies,
  setMoviesByKey,
  setIsLoaderOpened,
  moviesByKey,
  allFindMovies,
  setIsMoviesFound,
  savedMovies,
  getMovies,
  isRequestInProgress
}) {

  // Функция изменения чекбокса
  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  // Функция изменения поля поиска фильмов
  const filterMoviesChange = (e) => {
    if (e.target.value === '') {
      setIsEmpty(true);
    }
    setKeyWord(e.target.value);
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
    getMovies(e);
  }

  // Эффект при изменении ключевого слова
  useEffect(() => {
    if (keyWord === '') {
      setMovies([]);
      setAllFindMovies([]);
      setMoviesByKey([]);
      return;
    }
    setIsEmpty(false);
  }, [keyWord])

  // Эффект - фильтрация данных при получении списка фильмов
  useEffect(() => {
    if (keyWord === '') {
      return setIsMoviesFound(true);
    } else {
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
    }
  }, [movies, isChecked])

  // Эффект при монтировании - отрисовка фильмов с учётом чекбокса
  useEffect(() => {
    setIsMoviesFound(true);
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
          filterMoviesSubmite={filterMoviesSubmite}
          isRequestInProgress={isRequestInProgress} />
        {isLoaderOpened ?
          <Preloader isLoaderOpened={isLoaderOpened} /> :
          errorDisplay ?
            <ServerMessage
              text={text}
              errorDisplay={errorDisplay}
              isServerCrash={isServerCrash} /> :
            <MoviesCardList
              movies={allFindMovies}
              handleLike={handleLike}
              isChecked={isChecked}
              isMoviesFound={isMoviesFound}
              setIsMoviesFound={setIsMoviesFound}
              savedMovies={savedMovies} />}
      </main>
      <Footer />
    </>
  )
}