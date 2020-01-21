import './Pill.css';
import React from 'react';

export default function Pill(props) {
    const {conversionCharacter, description, closeable = false, innerRef} = props;

    return (
        <div {...props} ref={innerRef} className={closeable ? "pill pill-closeable" : "pill"}>
            <div>{description}</div>
            {closeable && <CloseButton/>}
        </div>
    );
}

function CloseButton(props) {
    return <div className="close-button">
        <div className="close-cross"/>
    </div>;
}