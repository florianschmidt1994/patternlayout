import './Terminal.css';
import React from "react";

export default function ({output = ""}) {
    return <div id="terminal">
        <div id="header">
            <div className="button"></div>
            <div className="button"></div>
            <div className="button"></div>
        </div>
        <div id="content">
            {output}
        </div>
    </div>
}