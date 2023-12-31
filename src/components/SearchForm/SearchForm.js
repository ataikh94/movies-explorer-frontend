import React, { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../utils/useFormValidation';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/search-button.svg';

export default function SearchForm({
    isChecked,
    isEmpty,
    keyWord,
    handleChecked,
    filterMovies,
    filterMoviesSubmite,
    isRequestInProgress }) {

    const { isValid, errors, handleChange, setIsValid } = useFormValidation();

    // Функция изменения ключевого слова
    const changeKeyWord = (e) => {
        filterMovies(e);
        handleChange(e);
    }

    // Эффект при монтировании - поле поиска является валидным
    useEffect(() => {
        setIsValid(true);
    }, []);

    return (
        <form className='search-form' onSubmit={filterMoviesSubmite} noValidate>
            <div className='search-form__group'>
                <img src={searchIcon} alt='Иконка поиска' className='search-icon' />
                <input className='search-form__input' name='keyWord' placeholder='Фильм' onChange={changeKeyWord} defaultValue={keyWord} required disabled={isRequestInProgress} />
                <button className='search-button' type='submit' disabled={!isValid || isRequestInProgress}><img src={searchButton} alt='Кнопка поиска' className='search-button__img' /></button>
            </div>
            <span className={`search-form__input-error ${(errors['keyWord'] || isEmpty) && 'search-form__input-error_active'}`}>Нужно ввести ключевое слово</span>
            <FilterCheckbox handleChecked={handleChecked} isChecked={isChecked} isRequestInProgress={isRequestInProgress}/>
        </form>
    )
}
