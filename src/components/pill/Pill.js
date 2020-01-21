import './Pill.css';
import React from 'react';

export default function Pill(props) {
    const {conversionCharacter, description, closeable = false, innerRef, onClose = () => {}, id} = props;

    return (
        <div {...props} ref={innerRef} className={closeable ? "pill pill-closeable" : "pill"}>
            <div>{description}</div>
            {closeable && <CloseButton id={id} onClose={onClose}/>}
        </div>
    );
}

function CloseButton(props) {
    return <div className="close-button" onClick={() => props.onClose(props.id)}>
        <div className="close-cross"/>
    </div>;
}