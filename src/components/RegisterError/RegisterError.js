import React from 'react';
import './RegisterError.css';

export default function RegisterError({ text, errorDisplay, updateUserSuccess, isServerCrash }) {
    return (
        <>
            <div className={`error-register ${errorDisplay ? `error-register_active ${isServerCrash ? 'error-register__message_server-crashed' : ''}` : ''}`}>
                <p className={`error-register__message ${updateUserSuccess ? 'error-register__message_success' : ''}`}>{text}</p>
            </div >
        </>
    )
}
