import React, {useState} from 'react';
import './App.css';
import Pill from "./components/pill/Pill";
import Terminal from "./components/terminal/Terminal";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function PillList(props) {
    return <div ref={props.innerRef} className="pill-list">
        {props.children}
    </div>
}

function move(array, from, to) {
    console.log(array);
    console.log("From " + from + " to " + to);

    let element = array[from];
    array.splice(from, 1);
    array.splice(to, 0, element);

    console.log(array);

    return array;
}

function removeAtIndexInPlace(index, array) {
    return array.splice(index, 1)[0];
}

function insertAtIndexInPlace(index, array, element) {
    array.splice(index, 0, element);
}

const initialData = [{id: "c-1", conversionCharacter: "c", name: 'Category'},
    {id: "c-2", conversionCharacter: "C", name: 'Fully Qualified Classname'},
    {id: "c-3", conversionCharacter: "d", name: 'Date'},
    {id: "c-4", conversionCharacter: "F", name: 'Filename'},
    {id: "c-5", conversionCharacter: "l", name: 'Call Location'},
    {id: "c-6", conversionCharacter: "L", name: 'Line Number'},
    {id: "c-7", conversionCharacter: "m", name: 'Message'},
    {id: "c-8", conversionCharacter: "M", name: 'Method Name'},
    {id: "c-9", conversionCharacter: "n", name: 'Newline'},
    {id: "c-10", conversionCharacter: "p", name: 'Priority'},
    {id: "c-11", conversionCharacter: "r", name: 'Layout creation time'},
    {id: "c-12", conversionCharacter: "t", name: 'Thread'},
    {id: "c-13", conversionCharacter: "x", name: 'Nested Diagnostic context'},
    {id: "c-14", conversionCharacter: "X", name: 'Mapped diagnostic context'},
    {id: "c-15", conversionCharacter: " ", name: 'Whitespace'},
    {id: "c-16", conversionCharacter: "%", name: 'Percentage sign'}
];

export default function App() {
    const [conversions, setConversions] = useState({
        available: initialData,
        selected: []
    });

    const [exampleLog, setExampleLog] = useState("");

    const onDragEnd = (result) => {

        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // re-order within the same list
        if (source.droppableId === destination.droppableId) {

            const itemsCopy = Array.from(conversions[source.droppableId]);
            const itemsCopy2 = move(itemsCopy, source.index, destination.index);

            updateConversion({
                ...conversions,
                [source.droppableId]: itemsCopy2,
            })

        } else {
            let fromCopy = Array.from(conversions[source.droppableId]);
            let toCopy = Array.from(conversions[destination.droppableId]);

            // const removedElement = removeAtIndexInPlace(source.index, fromCopy);

            // create a clone!
            const clonedElement = Object.assign({}, fromCopy[source.index]);

            // TODO: Use collision-free id!
            clonedElement.id = "" + Math.random();
            insertAtIndexInPlace(destination.index, toCopy, clonedElement);

           updateConversion({
                [source.droppableId]: fromCopy,
                [destination.droppableId]: toCopy
            });
        }
    };

    const updateConversion = (newConversions) => {

        setConversions(newConversions);

        fetch("https://patternlayout-server.florianschmidt.me/format", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({pattern: newConversions.selected.reduce((prev, curr) => prev + "%" + curr.conversionCharacter, "")})
        })
            .then(resp => resp.json())
            .then(json => setExampleLog(json.message))
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error(err)
            });
    }

    const onClose = (id) => {
        updateConversion({
            available: conversions.available,
            selected: conversions.selected.filter(e => e.id !== id)
        });
    };

    const templateString = () => {
        if (conversions.selected.length === 0) {
            return "Your template string will appear here!";
        } else {
            return conversions.selected.reduce((prev, curr) => prev + "%" + curr.conversionCharacter, "");
        }
    };


    return (
        <div className="App">
            <header>
                <h1>PatternLayout</h1>
                <p>Your interactive guide to Log4j PatternLayouts</p>
            </header>

            <main>

                <DragDropContext onDragEnd={onDragEnd}>

                    <Droppable droppableId="available" direction="horizontal" isDropDisabled={true}>
                        {
                            provided => (
                                <PillList innerRef={provided.innerRef} {...provided.droppableProps}>
                                    {conversions.available.map((c, idx) =>
                                        <Draggable key={c.id} draggableId={c.id} index={idx}>
                                            {(p1, s1) =>
                                                <>
                                                    <Pill {...p1.draggableProps} {...p1.dragHandleProps}
                                                          id={c.id}
                                                          idx={idx}
                                                          innerRef={p1.innerRef}
                                                          conversionCharacter={c.conversionCharacter}
                                                          description={c.name}/>
                                                    {s1.isDragging && <Pill isClone={true} conversionCharacter={c.conversionCharacter} description={c.name}/>}
                                                    {p1.placeholder}
                                                </>
                                            }
                                        </Draggable>
                                    )}
                                </PillList>
                            )
                        }
                    </Droppable>

                    <Droppable droppableId="selected" direction="horizontal">
                        {
                            provided => (
                                <div
                                    className={conversions.selected.length !== 0 ? "dropzone" : "dropzone dropzone-empty"}
                                    ref={provided.innerRef} {...provided.droppableProps}>
                                    {conversions.selected.map((c, idx) =>
                                        <Draggable key={c.id} draggableId={c.id} index={idx}>
                                            {p1 => <Pill {...p1.draggableProps} {...p1.dragHandleProps}
                                                         id={c.id}
                                                         innerRef={p1.innerRef}
                                                         conversionCharacter={c.conversionCharacter}
                                                         description={c.name}
                                                         onClose={onClose}
                                                         closeable
                                            />}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                    {conversions.selected.length === 0 && "Drag your elements here"}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>

                <div className="templateString">{templateString()}</div>
                <Terminal output={exampleLog}/>
            </main>

            <footer>
                Made by Florian Schmidt in Munich – Impressum – Datenschutzerklärung
            </footer>
        </div>
    );
}