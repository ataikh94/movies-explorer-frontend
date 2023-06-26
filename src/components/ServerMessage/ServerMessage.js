import React from 'react';
import './ServerMessage.css';

export default function ServerMessage({ text, errorDisplay, updateUserSuccess, isServerCrash }) {
    return (
        <>
            <div className={`server-message ${errorDisplay ? `server-message_active ${isServerCrash ? 'server-message__text_server-crashed' : ''}` : ''}`}>
                <p className={`server-message__text ${updateUserSuccess ? 'server-message__text_success' : ''}`}>{text}</p>
            </div >
        </>
    )
}
