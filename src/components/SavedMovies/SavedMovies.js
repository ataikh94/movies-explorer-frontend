import React from 'react';
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function SavedMovies({ isMenuOpened, handleClick, closeMenu }) {
  return (
    <>
      <Header>
        <Navigation isAuthorized={true} isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu} />
      </Header>
      <main>
        <SearchForm />
        <MoviesCard removeButton={true} />
      </main>
      <Footer />
    </>
  )
}
