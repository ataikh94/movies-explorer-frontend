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
import Header from '../Header/Header';
import { useLocalStorage } from '../../utils/useLocalStorage';

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

  //Переменные для страницы movies
  const [movies, setMovies] = useLocalStorage('allMovies', []); // состояние массива фильмов, полученных из API
  const [allFindMovies, setAllFindMovies] = useLocalStorage('movies', []); // состояние массива фильмов, найденных с учетом всех фильтров
  const [moviesByKey, setMoviesByKey] = useLocalStorage('movies-by-key', allFindMovies); //состояние массива фильмов, найденных с учетом ключевого слова
  const [isChecked, setIsChecked] = useLocalStorage('checked', false); // состояние фильтра-чекбокса
  const [keyWord, setKeyWord] = useLocalStorage('keyword', ''); // состояние ключевого слова
  const [isLoaderOpened, setIsLoaderOpened] = useState(false); // состояние лоадера
  const [isEmpty, setIsEmpty] = useState(false); // состояние строки поиска
  const [isLiked, setIsLiked] = useState(false); // состояние лайка
  const [isMoviesFound, setIsMoviesFound] = useLocalStorage('movies-found', true); // состояние результата поиска фильмов
  const [isServerCrash, setIsServerCrash] = useState(false); // состояние для ошибки сервера

  //Переменные для страницы saved-movies
  const [saveMovies, setSaveMovies] = useLocalStorage('allMovies-save', []); // состояние массива сохраненных фильмов
  const [isMoviesFoundSave, setIsMoviesFoundSave] = useLocalStorage('movies-found-save', true); // состояние результата поиска сохраненных фильмов
  const [allFindMoviesSave, setAllFindMoviesSave] = useLocalStorage('save-movies', []); // состояние массива сохраненных фильмов, найденных с учетом всех фильтров
  const [keyWordSave, setKeyWordSave] = useLocalStorage('keyword-save', ''); // состояние ключевого слова для сохраненных фильмов
  const [moviesByKeySave, setMoviesByKeySave] = useLocalStorage('movies-by-key-save', allFindMoviesSave); //состояние массива сохраненных фильмов, найденных с учетом ключевого слова
  const [saveSearch, setSaveSearch] = useState(false); // состояние поиска сохраненных фильмов
  const [isCheckedSave, setIsCheckedSave] = useLocalStorage('checked-save', false); // состояние чекбокса на странице сохраненных фильмов

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

  // Функция постановки лайка
  const handleLike = (movie) => {
    setIsLiked(!isLiked);
    mainApi.likeMovie(movie)
      .then(res => console.log(res))
  }

  // Функция отображения сообщения об ошибке, полученной при запросе к API
  const displayErrorMessage = (err, msg) => {
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

  // Функция сброса данных в локальном хранилище
  const cleanCash = () => {
    setMovies([]);
    setAllFindMovies([]);
    setMoviesByKey([]);
    setIsChecked(false);
    setIsCheckedSave(false);
    setKeyWord('');
    setSaveMovies([]);
    setIsMoviesFound(true);
    setIsMoviesFoundSave(true);
    setAllFindMoviesSave([]);
    setKeyWordSave('');
    setMoviesByKeySave([]);
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
                  movies={movies}
                  isChecked={isChecked}
                  isMoviesFound={isMoviesFound}
                  isLoaderOpened={isLoaderOpened}
                  keyWord={keyWord}
                  isEmpty={isEmpty}
                  handleLike={handleLike}
                  isLiked={isLiked}
                  text={errorMessage}
                  errorDisplay={errorDisplay}
                  isServerCrash={isServerCrash}
                  setIsChecked={setIsChecked}
                  setKeyWord={setKeyWord}
                  setIsEmpty={setIsEmpty}
                  setMovies={setMovies}
                  setAllFindMovies={setAllFindMovies}
                  setMoviesByKey={setMoviesByKey}
                  setIsLoaderOpened={setIsLoaderOpened}
                  setIsServerCrash={setIsServerCrash}
                  displayErrorMessage={displayErrorMessage}
                  moviesByKey={moviesByKey}
                  allFindMovies={allFindMovies}
                  setIsMoviesFound={setIsMoviesFound}
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
                  isLogged={isLogged}
                  //   movies={allFindMoviesSave}
                  saveMovies={saveMovies}
                  setSaveMovies={setSaveMovies}
                  isLiked={isLiked}
                  handleLike={handleLike}
                  isMoviesFoundSave={isMoviesFoundSave}
                  setIsMoviesFoundSave={setIsMoviesFoundSave}
                  allFindMoviesSave={allFindMoviesSave}
                  setAllFindMoviesSave={setAllFindMoviesSave}
                  keyWordSave={keyWordSave}
                  setKeyWordSave={setKeyWordSave}
                  moviesByKeySave={moviesByKeySave}
                  setMoviesByKeySave={setMoviesByKeySave}
                  saveSearch={saveSearch}
                  setSaveSearch={setSaveSearch}
                  isCheckedSave={isCheckedSave}
                  setIsCheckedSave={setIsCheckedSave}
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
                  cleanCash={cleanCash}
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
