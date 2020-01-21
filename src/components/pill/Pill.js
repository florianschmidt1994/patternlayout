import './Pill.css';
import React from 'react';

export default function Pill(props) {
    const {
        conversionCharacter,
        description,
        innerRef,
        id,
        closeable = false,
        isClone = false,
        onClose = () => {},
    } = props;

    let className = "pill";

    if (closeable) {
        className += " pill-closeable";
    }

    if (isClone) {
        className += " pill-clone";
    }

    return (
        <div {...props} ref={innerRef} className={className}>
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