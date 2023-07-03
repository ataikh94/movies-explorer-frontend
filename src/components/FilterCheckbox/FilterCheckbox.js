import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isChecked, handleChecked, isRequestInProgress }) {

    return (
        <label className="checkbox__label" htmlFor="checkbox">
            <input type="checkbox"
                className="checkbox__input"
                id="checkbox"
                onChange={handleChecked}
                checked={isChecked}
                disabled={isRequestInProgress} />
            <span className="checkbox__text">Короткометражки</span>
        </label>
    )
}
