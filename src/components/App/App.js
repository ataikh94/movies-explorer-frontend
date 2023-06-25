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
import * as moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { filterCheckBox, filterKeyWord } from '../../utils/filterMovies';

function App() {
  const [isLogged, setIsLogged] = useState(false); // состояние авторизации пользователя
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: ''
  }); // состояние данных текущего пользователя
  const [isMenuOpened, setIsMenuOpened] = useState(false); // состояние бургер-меню
  const [errorMessage, setErrorMessage] = useState(''); // текст сообщения об ошибке при получении данных из API
  const [errorDisplay, setErrorDisplay] = useState(false); // состояние отображения ошибки при получении данных из API
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false); // состояние успешного обновления данных пользователя для дополнительного класса
  const [movies, setMovies] = useLocalStorage('allMovies', []); // состояние массива фильмов, полученных из API
  const [allFindMovies, setAllFindMovies] = useLocalStorage('movies', []); // состояние массива фильмов, найденных с учетом фильтров
  const [moviesByKey, setMoviesByKey] = useLocalStorage('movies-by-key', allFindMovies); //состояние массива фильмов, найденных с учетом ключевого слова
  const [isChecked, setIsChecked] = useLocalStorage('checked', false); // состояние фильтра-чекбокса
  const [keyWord, setKeyWord] = useLocalStorage('keyword', ''); // состояние ключевого слова
  const [isLoaderOpened, setIsLoaderOpened] = useState(false); // состояние лоадера
  const [isEmpty, setIsEmpty] = useState(false); // состояние пустоты строки поиска
  const [isLiked, setIsLiked] = useState(false); // состояние лайка

  const [isMoviesFound, setIsMoviesFound] = useLocalStorage('movies-found', true); // состояние найденности фильмов
  const [isServerCrash, setIsServerCrash] = useState(false); // состояние для ошибки сервера
  
  const navigate = useNavigate();
  const location = useLocation();

  // Функция открытия бургер-меню
  const handleClick = () => {
    setIsMenuOpened(true);
  }

  // Функция закрытия бургер-меню
  const closeMenu = () => {
    setIsMenuOpened(false);
  }

  // Функция изменения чекбокса
  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  // Функция постановки лайка
  const handleLike = () => {
      setIsLiked(!isLiked);
/*     mainApi.likeMovie(movie)
      .then(res => console.log(res)) */
  }

  // Функция изменения поля поиска фильмов
  const filterMoviesChange = (e) => {
    setKeyWord(e.target.value.toLowerCase());
    if (e.target.value === '') {
      setIsEmpty(true);
      setIsMoviesFound(false);
    }
    setIsEmpty(false);
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
  }, [movies, isChecked])

  useEffect(() => {
    const movieCheckboxArray = filterCheckBox(moviesByKey, isChecked);
    if (movieCheckboxArray.length > 0) {
      setAllFindMovies(movieCheckboxArray);
    }
  }, [])

  // Функция отображения сообщения об ошибке, полученной при запросе к API
  const displayErrorMessage = (err, msg) => {
    console.log(msg);
    if (!msg) {
      const message = JSON.stringify(err.message).replace(/["']+/g, '')
      setErrorMessage(message);
    } else {
      setErrorMessage(msg);
    }
    setErrorDisplay(true);
    setTimeout(() => {
      setErrorDisplay(false);
      setErrorMessage(false);
      setUpdateUserSuccess(false);
    }, 2000);
  }

  // Функция регистрации
  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then(res => {
        handleLogin(email, password);
      })
      .catch(err => {
        displayErrorMessage(err);
      });
  }

  // Функция авторизации
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

  // Эффект при монтировании - проверка JWT-токена
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

  // Функция обновления данных пользователя через профиль
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
            <Route path='/signin'
              element={<Login
                handleLogin={handleLogin}
                text={errorMessage}
                errorDisplay={errorDisplay} />} />
            <Route path='/signup'
              element={<Register
                handleRegister={handleRegister}
                text={errorMessage}
                errorDisplay={errorDisplay} />} />
            <Route path='/' element={
              <>
                <Header
                  isLogged={isLogged}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu} />
                <Main />
              </>} />
            <Route path='/movies' element={
              <>
                <Header
                  isLogged={isLogged}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu} />
                <ProtectedRouteElement
                  element={Movies}
                  isLogged={isLogged}
                  movies={allFindMovies}
                  handleChecked={handleChecked}
                  isChecked={isChecked}
                  filterMovies={filterMoviesChange}
                  filterMoviesSubmite={filterMoviesSubmite}
                  isMoviesFound={isMoviesFound}
                  isLoaderOpened={isLoaderOpened}
                  keyWord={keyWord}
                  isEmpty={isEmpty}
                  handleLike={handleLike}
                  isLiked={isLiked}
                  text={errorMessage}
                  errorDisplay={errorDisplay}
                  isServerCrash={isServerCrash}
                />
              </>
            } />
            <Route path='/saved-movies' element={
              <>
                <Header
                  isLogged={isLogged}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu} />
                <ProtectedRouteElement
                  element={SavedMovies}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu}
                  isLogged={isLogged}
                  isLiked={isLiked}
                  isChecked={isChecked}
                  setIsMoviesFound={setIsMoviesFound}
                />
              </>
            } />
            <Route path='/profile' element={
              <>
                <Header
                  isLogged={isLogged}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu} />
                <ProtectedRouteElement
                  element={Profile}
                  isMenuOpened={isMenuOpened}
                  handleClick={handleClick}
                  closeMenu={closeMenu}
                  isLogged={isLogged}
                  updateUser={updateUser}
                  text={errorMessage}
                  errorDisplay={errorDisplay}
                  updateUserSuccess={updateUserSuccess}
                  setIsLogged={setIsLogged}
                />
              </>
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
