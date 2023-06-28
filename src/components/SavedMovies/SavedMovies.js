import React, { useEffect } from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import * as mainApi from '../../utils/MainApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterCheckBox, filterKeyWord } from '../../utils/filterMovies';

export default function SavedMovies({
  saveMovies,
  setSaveMovies,
  handleLike,
  isMoviesFoundSave,
  setIsMoviesFoundSave,
  allFindMoviesSave,
  setAllFindMoviesSave,
  keyWordSave,
  setKeyWordSave,
  setMoviesByKeySave,
  saveSearch,
  setSaveSearch,
  isCheckedSave,
  setIsCheckedSave,
  isSavedMovies,
  getSaveMovies
}) {

  // Функция изменения состояния чекбокса
  const handleChecked = () => {
    setIsCheckedSave(!isCheckedSave);
  }

  // Функция изменения поля поиска фильмов
  const filterMoviesChange = (e) => {
    setKeyWordSave(e.target.value.toLowerCase());
  }

  // Функция сабмита формы
  const filterMoviesSubmite = (e) => {
    e.preventDefault();
    if (keyWordSave === '') {
      setAllFindMoviesSave(saveMovies);
      setMoviesByKeySave(saveMovies);
      return;
    }
    setSaveSearch(!saveSearch);
  }

  // Эффект - фильтрация данных при получении списка фильмов
  useEffect(() => {
    const movieKeyWordArray = filterKeyWord(saveMovies, keyWordSave);
    if (movieKeyWordArray.length === 0) {
      setAllFindMoviesSave([]);
      setIsMoviesFoundSave(false);
    }
    setIsMoviesFoundSave(true);
    setAllFindMoviesSave(movieKeyWordArray);
    setMoviesByKeySave(movieKeyWordArray);
    const movieCheckboxArray = filterCheckBox(movieKeyWordArray, isCheckedSave);
    if (movieCheckboxArray.length > 0) {
      setAllFindMoviesSave(movieCheckboxArray);
      setIsMoviesFoundSave(true);
    }
    else {
      setAllFindMoviesSave([]);
      setIsMoviesFoundSave(false);
    }
  }, [isCheckedSave, saveSearch, keyWordSave, saveMovies])

  // Эффект при монтировании - формирование данных для отображения
  useEffect(() => {
    if (!allFindMoviesSave) {
      setAllFindMoviesSave(saveMovies);
    }
    const movieKeyWordArray = filterKeyWord(allFindMoviesSave, keyWordSave);
      if (movieKeyWordArray.length === 0) {
        setAllFindMoviesSave([]);
        return setIsMoviesFoundSave(false);
      }
      setIsMoviesFoundSave(true);
      setAllFindMoviesSave(movieKeyWordArray);
      setMoviesByKeySave(movieKeyWordArray);
    const movieCheckboxArray = filterCheckBox(allFindMoviesSave, isCheckedSave);
    if (movieCheckboxArray.length > 0) {
      setAllFindMoviesSave(movieCheckboxArray);
    }
  }, [])

  return (
    <>
      <main className='saved-movies'>
        <SearchForm
          isChecked={isCheckedSave}
          handleChecked={handleChecked}
          filterMovies={filterMoviesChange}
          filterMoviesSubmite={filterMoviesSubmite}
          keyWord={keyWordSave} />
        <MoviesCardList movies={allFindMoviesSave} savedMovies={saveMovies} isChecked={isCheckedSave} isMoviesFound={isMoviesFoundSave}
          handleLike={handleLike} isSavedMovies={isSavedMovies}/>
      </main>
      <Footer />
    </>
  )
}
