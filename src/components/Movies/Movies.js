import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RegisterError from '../RegisterError/RegisterError';
import { movieApi } from '../../utils/constants';

export default function Movies({
  movies,
  handleChecked,
  keyWord,
  isEmpty,
  isLoaderOpened,
  text,
  errorDisplay,
  isServerCrash,
  isChecked,
  filterMovies,
  filterMoviesSubmite,
  isMoviesFound,
  setIsMoviesFound,
  handleLike,
  isLiked,
}) {
/* 
  const updateMovieObject = (movies) => {
    const updatedArray = movies.map(object => {
      const movieObject = Object.assign({}, object, { image: `${movieApi}${object.image.url}` }, { thumbnail: `${movieApi}${object.image.formats.thumbnail.url}` });
      delete movieObject.created_at;
      delete movieObject.id;
      delete movieObject.updated_at;
      return movieObject;
    })
    console.log(updatedArray)
    return updatedArray;
  }
  useEffect(() => {
    updateMovieObject(movies);
  }, [movies]) */


  return (
    <>
      <main className='movies'>
        <SearchForm
          keyWord={keyWord}
          isEmpty={isEmpty}
          handleChecked={handleChecked}
          isChecked={isChecked}
          filterMovies={filterMovies}
          filterMoviesSubmite={filterMoviesSubmite} />
        {isLoaderOpened ?
          <Preloader isLoaderOpened={isLoaderOpened} /> :
          errorDisplay ?
            <RegisterError
              text={text}
              errorDisplay={errorDisplay}
              isServerCrash={isServerCrash} /> :
            <MoviesCardList
              movies={movies}
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