import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login.js';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as mainApi from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { userContext } from '../../context/userContext';


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: ''
  });
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setIsMenuOpened(true);
  }

  const closeMenu = () => {
    setIsMenuOpened(false);
  }

  function handleCloseErrorMessage() {
    setErrorDisplay(false);
    setErrorMessage('');
  }

  const displayErrorMessage = (err) => {
    const message = JSON.stringify(err.message).replace(/["']+/g, '')
    setErrorMessage(message);
    setErrorDisplay(true);
    setTimeout(() => {
      setErrorDisplay(false);
      setErrorMessage(false);
      setUpdateUserSuccess(false);
    }, 2000);
  }

  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then(res => {
        handleLogin(email, password);
      })
      .catch(err => {
        displayErrorMessage(err);
      });
  }

  const handleLogin = (email, password) => {
    mainApi.authorize(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLogged(true);
          const { name, email, _id } = res.userObj;
          setUserData({ name, email, _id });
          navigate('/movies', true);
        }
      })
      .catch(err => {
        displayErrorMessage(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) return;
      mainApi.checkToken(jwt)
        .then(res => {
          if (res) {
            setIsLogged(true);
            const { name, email, _id } = res;
            setUserData({ name, email, _id });
            const url = location.pathname || '/movies';
            navigate(url, true);
          }
        })
    }
  }, []);

  const updateUser = (name, email) => {
    mainApi.updateUser(name, email)
      .then(res => {
        setErrorMessage('Данные изменены');
        setErrorDisplay(true);
        setUpdateUserSuccess(true);
        setTimeout(() => {
          setErrorDisplay(false);
          setErrorMessage(false);
          setUpdateUserSuccess(false);
        }, 2000);
      })
      .catch(err => {
        displayErrorMessage(err);
      });
  }

  return (
    <div className='app'>
      <div className='app__container'>
        <userContext.Provider value={userData}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<Login handleLogin={handleLogin} text={errorMessage} errorDisplay={errorDisplay} closeError={handleCloseErrorMessage} />} />
            <Route path='/signup' element={<Register handleRegister={handleRegister} text={errorMessage} errorDisplay={errorDisplay} closeError={handleCloseErrorMessage} />} />
            <Route path='/movies' element={
              <ProtectedRouteElement
                element={Movies}
                isLogged={isLogged}
                isAuthorized={true}
                isMenuOpened={isMenuOpened}
                handleClick={handleClick}
                closeMenu={closeMenu}
              />
            } />
            <Route path='/saved-movies' element={
              <ProtectedRouteElement
                element={SavedMovies}
                isMenuOpened={isMenuOpened}
                handleClick={handleClick}
                closeMenu={closeMenu}
                isLogged={isLogged}
              />
            } />
            <Route path='/profile' element={
              <ProtectedRouteElement
                element={Profile}
                isMenuOpened={isMenuOpened}
                handleClick={handleClick}
                closeMenu={closeMenu}
                isLogged={isLogged}
                updateUser={updateUser}
                text={errorMessage}
                errorDisplay={errorDisplay}
                closeError={handleCloseErrorMessage}
                updateUserSuccess={updateUserSuccess}
              />
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
