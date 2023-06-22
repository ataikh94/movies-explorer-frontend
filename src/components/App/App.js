import React, { useState } from 'react';
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
    }, 3000);
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
          navigate('/movies', true)
          setIsLogged(true);
          const { name, email, _id } = res.userObj;
          setUserData({ name, email, id: _id })
        }
      })
      .catch(err => {
        displayErrorMessage(err);
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          setUserData(res);
          setIsLogged(true);
          const url = location.pathname || '/movies'
          navigate(url)
        }
      })
        .catch(err => console.log(err));
    }
  }, [])

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
                name={userData.name}
                email={userData.email}
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
