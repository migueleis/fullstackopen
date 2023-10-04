import React from 'react';
import './Notification.css';

export const Notification = ({ level, message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={level}>
            <p>{message}</p>
        </div>
    )
}