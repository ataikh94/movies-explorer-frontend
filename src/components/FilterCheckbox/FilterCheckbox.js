import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
    return (
        <label className="checkbox__label" htmlFor="checkbox">
            <input type="checkbox" className="checkbox__input" id="checkbox" />
            <span className="checkbox__text">Короткометражки</span>
        </label>
    )
}
