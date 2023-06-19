import React from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/search-button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
    return (
        <form className='search-form'>
            <div className='search-form__group'>
                <img src={searchIcon} alt='Иконка поиска' className='search-icon' />
                <input className='search-form__input' placeholder='Фильм' />
                <button className='search-button'><img src={searchButton} alt='Кнопка поиска' className='search-button_img' /></button>
            </div>
            <FilterCheckbox />
        </form>
    )
}
