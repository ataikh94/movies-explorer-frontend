import React from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/search-button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ handleChecked, filterMovies, filterMoviesSubmite }) {
    return (
        <form className='search-form' onSubmit={filterMoviesSubmite}>
            <div className='search-form__group'>
                <img src={searchIcon} alt='Иконка поиска' className='search-icon' />
                <input className='search-form__input' placeholder='Фильм' onChange={filterMovies}/>
                <button className='search-button' type='submite'><img src={searchButton} alt='Кнопка поиска' className='search-button__img' /></button>
            </div>
            <FilterCheckbox handleChecked={handleChecked}/>
        </form>
    )
}
