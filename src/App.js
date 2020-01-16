import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pill from "./components/pill/Pill";
import Terminal from "./components/terminal/Terminal";

function App() {
    const conversions = [
        {conversionCharacter: "c", name: 'Category'},
        {conversionCharacter: "C", name: 'Fully Qualified Classname'},
        {conversionCharacter: "d", name: 'Date'},
        {conversionCharacter: "F", name: 'Filename'},
        {conversionCharacter: "l", name: 'Call Location'},
        {conversionCharacter: "L", name: 'Line Number'},
        {conversionCharacter: "m", name: 'Message'},
        {conversionCharacter: "M", name: 'Method Name'},
        {conversionCharacter: "n", name: 'Newline'},
        {conversionCharacter: "p", name: 'Priority'},
        {conversionCharacter: "r", name: 'Layout creation time'},
        {conversionCharacter: "t", name: 'Thread'},
        {conversionCharacter: "x", name: 'Nested Diagnostic context'},
        {conversionCharacter: "X", name: 'Mapped diagnostic context'},
        {conversionCharacter: " ", name: 'Whitespace'},
        {conversionCharacter: "%", name: 'Percentage sign'}
    ];

    return (
        <div className="App">
            <header>
                <h1>PatternLayout</h1>
                <p>Your interactive guide to Log4j PatternLayouts</p>
            </header>

            <main>
                {conversions.map(c => <Pill conversionCharacter={c.conversionCharacter} description={c.name}/>)}
                <div className="dropzone">Drag your elements here!</div>
                <div className="templateString">Your template string will appear here!</div>
                <Terminal/>
            </main>

            <footer>
                Made by Florian Schmidt in Munich – Impressum – Datenschutzerklärung
            </footer>
        </div>
    );
}

export default App;
