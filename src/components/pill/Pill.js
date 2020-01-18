import './Pill.css';
import React from 'react';

export default function ({conversionCharacter, description, closeable = false}) {
    return (
        <div className="pill">
            <div>{description} '{conversionCharacter}'</div>
            <div className="close-button">
                <div className="close-cross"/>
            </div>
        </div>
    );
}