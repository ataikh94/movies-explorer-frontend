import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ isMenuOpened, handleClick, closeMenu }) {
  return (
    <>
      <Header>
        <Navigation isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu} />
      </Header>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <Footer />
    </>
  )
}
