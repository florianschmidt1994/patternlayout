import './Pill.css';
import React from 'react';

export default function Pill({conversionCharacter, description, closeable = false}) {
    return (
        <div className="pill">
            <div>{description} '{conversionCharacter}'</div>
            {closeable && <CloseButton/>}
        </div>
    );
}

function CloseButton(props) {
    return <div className="close-button">
        <div className="close-cross"/>
    </div>;
}