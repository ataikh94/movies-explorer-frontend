import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isChecked, handleChecked }) {

    return (
        <label className="checkbox__label" htmlFor="checkbox">
            <input type="checkbox" className="checkbox__input" id="checkbox" onChange={handleChecked} checked={isChecked}/>
            <span className="checkbox__text">Короткометражки</span>
        </label>
    )
}
