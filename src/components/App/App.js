import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login.js';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { userContext } from '../../context/userContext';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { movieApi } from '../../utils/constants';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

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
  const [isRequestInProgress, setIsRequestInProgress] = useState(false); // состояние запроса к API

  //Переменные для страницы movies
  const [movies, setMovies] = useLocalStorage('allMovies', []); // состояние массива фильмов, полученных из API
  const [allFindMovies, setAllFindMovies] = useLocalStorage('movies', []); // состояние массива фильмов, найденных с учетом всех фильтров
  const [moviesByKey, setMoviesByKey] = useLocalStorage('movies-by-key', allFindMovies); //состояние массива фильмов, найденных с учетом ключевого слова
  const [isChecked, setIsChecked] = useLocalStorage('checked', false); // состояние фильтра-чекбокса
  const [keyWord, setKeyWord] = useLocalStorage('keyword', ''); // состояние ключевого слова
  const [isLoaderOpened, setIsLoaderOpened] = useState(false); // состояние лоадера
  const [isEmpty, setIsEmpty] = useState(false); // состояние строки поиска
  const [isMoviesFound, setIsMoviesFound] = useLocalStorage('movies-found', true); // состояние результата поиска фильмов
  const [isServerCrash, setIsServerCrash] = useState(false); // состояние для ошибки сервера

  //Переменные для страницы saved-movies
  const [saveMovies, setSaveMovies] = useLocalStorage('allMovies-save', []); // состояние массива сохраненных фильмов
  const [isMoviesFoundSave, setIsMoviesFoundSave] = useState(true); // состояние результата поиска сохраненных фильмов
  const [allFindMoviesSave, setAllFindMoviesSave] = useState([]); // состояние массива сохраненных фильмов, найденных с учетом всех фильтров
  const [keyWordSave, setKeyWordSave] = useState(''); // состояние ключевого слова для сохраненных фильмов
  const [moviesByKeySave, setMoviesByKeySave] = useState(allFindMoviesSave); //состояние массива сохраненных фильмов, найденных с учетом ключевого слова
  const [saveSearch, setSaveSearch] = useState(false); // состояние поиска сохраненных фильмов
  const [isCheckedSave, setIsCheckedSave] = useState(false); // состояние чекбокса на странице сохраненных фильмов

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
    setIsRequestInProgress(true);
    mainApi.register(name, email, password)
      .then(res => {
        handleLogin(email, password);
        setIsRequestInProgress(false);
      })
      .catch(err => {
        setIsRequestInProgress(false);
        displayErrorMessage(err);
      });
  }

  // Функция авторизации
  const handleLogin = (email, password) => {
    setIsRequestInProgress(true);
    mainApi.authorize(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLogged(true);
          const { name, email, _id } = res.userObj;
          setUserData({ name, email, _id });
          navigate('/movies', true);
          setIsRequestInProgress(false);
        }
      })
      .catch(err => {
        setIsRequestInProgress(false);
        displayErrorMessage(err);
      });
  }

  // Функция обновления данных пользователя через профиль
  const updateUser = (name, email) => {
    setIsRequestInProgress(true);
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
        setIsRequestInProgress(false);
      })
      .catch(err => {
        setIsRequestInProgress(false);
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

  // Функция получения сохраненных фильмов пользователей
  const getSaveMovies = () => {
    mainApi.getMovies()
      .then(res => {
        setSaveMovies(res);
      })
      .catch(err => console.log(err));
  }

  // Функция добавления и удаления фильма
  const toggleLike = (isLiked, movie) => {
    if (isLiked) {
      const movieToDelete = saveMovies.find(e => e.movieId === movie.movieId);
      deleteSaveMovie(movieToDelete._id);
    }
    else {
      saveMovie(movie)
    };
  }

  // Функция сохранения фильма
  const saveMovie = (movie) => {
    mainApi.likeMovie(movie)
      .then(res => setSaveMovies([...saveMovies, res]))
      .catch(err => console.log(err));
  }

  // Функция удаления фильма
  const deleteSaveMovie = (id) => {
    mainApi.deleteMovie(id)
      .then(res => setSaveMovies((array) => array.filter((m) => m._id !== id)))
      .catch(err => console.log(err))
  }

  // Функция получения фильмов из стороннего API и обработка записей
  const getMovies = (e) => {
    setIsRequestInProgress(true);
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
        setIsRequestInProgress(false);
      })
      .catch(err => {
        setIsLoaderOpened(false);
        setIsMoviesFound(false);
        setIsServerCrash(true);
        setIsRequestInProgress(false);
        displayErrorMessage(err, 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
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
        .catch(err => console.log(err));
    }
  }, []);

  // Эффект при авторизации - получение сохраненных фильмов пользователя
  useEffect(() => {
    if (isLogged && location.pathname === '/movies') getSaveMovies();
  }, [isLogged])

  return (
    <div className='app'>
      <div className='app__container'>
        <userContext.Provider value={userData}>
          <Header
            isLogged={isLogged}
            isMenuOpened={isMenuOpened}
            handleClick={handleClick}
            closeMenu={closeMenu} />
          <Routes>
            <Route path='/signin'
              element={isLogged ?
                <Navigate to='/' /> :
                <Login
                  handleLogin={handleLogin}
                  text={errorMessage}
                  errorDisplay={errorDisplay}
                  isRequestInProgress={isRequestInProgress} />} />
            <Route path='/signup'
              element={isLogged ?
                <Navigate to='/' /> :
                <Register
                  handleRegister={handleRegister}
                  text={errorMessage}
                  errorDisplay={errorDisplay}
                  isRequestInProgress={isRequestInProgress} />} />
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={
              <ProtectedRouteElement
                element={Movies}
                isLogged={isLogged}
                movies={movies}
                isChecked={isChecked}
                isMoviesFound={isMoviesFound}
                isLoaderOpened={isLoaderOpened}
                keyWord={keyWord}
                isEmpty={isEmpty}
                handleLike={toggleLike}
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
                moviesByKey={moviesByKey}
                allFindMovies={allFindMovies}
                setIsMoviesFound={setIsMoviesFound}
                savedMovies={saveMovies}
                getMovies={getMovies}
                isRequestInProgress={isRequestInProgress}
              />
            } />
            <Route path='/saved-movies' element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLogged={isLogged}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleLike={deleteSaveMovie}
                isMoviesFoundSave={isMoviesFoundSave}
                setIsMoviesFoundSave={setIsMoviesFoundSave}
                allFindMoviesSave={allFindMoviesSave}
                setAllFindMoviesSave={setAllFindMoviesSave}
                keyWordSave={keyWordSave}
                setKeyWordSave={setKeyWordSave}
                setMoviesByKeySave={setMoviesByKeySave}
                saveSearch={saveSearch}
                setSaveSearch={setSaveSearch}
                isCheckedSave={isCheckedSave}
                setIsCheckedSave={setIsCheckedSave}
                isSavedMovies={true}
                getSaveMovies={getSaveMovies}
                isRequestInProgress={isRequestInProgress}
              />
            } />
            <Route path='/profile' element={
              <ProtectedRouteElement
                element={Profile}
                isLogged={isLogged}
                updateUser={updateUser}
                text={errorMessage}
                errorDisplay={errorDisplay}
                updateUserSuccess={updateUserSuccess}
                setIsLogged={setIsLogged}
                cleanCash={cleanCash}
                isRequestInProgress={isRequestInProgress}
              />
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </userContext.Provider>
      </div>
    </div >
  );
}

export default App;