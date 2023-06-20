import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login.js';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const handleClick = () => {
    setIsMenuOpened(true);
  }

  const closeMenu = () => {
    setIsMenuOpened(false);
  }

  return (
    <div className='app'>
      <div className='app__container'>
        <Routes>
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/movies' element={<Movies isAuthorized={true} isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu}/>} />
          <Route path='/saved-movies' element={<SavedMovies isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu}/>} />
          <Route path='/profile' element={<Profile isMenuOpened={isMenuOpened} handleClick={handleClick} closeMenu={closeMenu}/>} />
          <Route path='/' element={<Main />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
