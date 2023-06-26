import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RegisterError from '../RegisterError/RegisterError';
import { movieApi } from '../../utils/constants';
import { filterCheckBox, filterKeyWord } from '../../utils/filterMovies';
import * as moviesApi from '../../utils/MoviesApi';

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
  isLiked,
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
    moviesApi.arrayMovies()
      .then(data => {
        const updatedArray = data.map(object => {
          const movieObject = Object.assign({}, object, { image: `${movieApi}${object.image.url}` },
            { thumbnail: `${movieApi}${object.image.formats.thumbnail.url}` },
            { movieId: object.id });
          delete movieObject.created_at
          delete movieObject.id;
          delete movieObject.updated_at;
          return movieObject;
        })
        return updatedArray;
      })
      .then(data => {
        setMovies(data);
        setIsLoaderOpened(false);
      })
      .catch(err => {
        setIsLoaderOpened(false);
        setIsMoviesFound(false);
        setIsServerCrash(true);
        displayErrorMessage(err, 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      });
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
              isLiked={isLiked}
              handleLike={handleLike}
              isChecked={isChecked}
              isMoviesFound={isMoviesFound}
              setIsMoviesFound={setIsMoviesFound} />
        }
      </main>
      <Footer />
    </>
  )
}