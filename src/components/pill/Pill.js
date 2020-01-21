import './Pill.css';
import React from 'react';

export default function Pill(props) {
    const {conversionCharacter, description, closeable = false, innerRef, id, idx} = props;

    return (
        <div {...props} ref={innerRef} className="pill">
            id: {id}<br/>
            idx: {idx}<br/>
            {/*<div>{description}</div>*/}
            {closeable && <CloseButton/>}
        </div>
    );
}

function CloseButton(props) {
    return <div className="close-button">
        <div className="close-cross"/>
    </div>;
}