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

            setConversions({
                ...conversions,
                [source.droppableId]: itemsCopy2,
            })

        } else {
            let fromCopy = Array.from(conversions[source.droppableId]);
            let toCopy = Array.from(conversions[destination.droppableId]);

            const removedElement = removeAtIndexInPlace(source.index, fromCopy);
            insertAtIndexInPlace(destination.index, toCopy, removedElement);

            setConversions({
                [source.droppableId]: fromCopy,
                [destination.droppableId]: toCopy
            });
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

                    <Droppable droppableId="available" direction="horizontal">
                        {
                            provided => (
                                <PillList innerRef={provided.innerRef} {...provided.droppableProps}>
                                    {conversions.available.map((c, idx) =>
                                        <Draggable key={c.id} draggableId={c.id} index={idx}>
                                            {(p1) =>
                                                <Pill {...p1.draggableProps} {...p1.dragHandleProps}
                                                      id={c.id}
                                                      idx={idx}
                                                      innerRef={p1.innerRef}
                                                      conversionCharacter={c.conversionCharacter}
                                                      description={c.name}/>}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
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
                                                         idx={idx}
                                                         innerRef={p1.innerRef}
                                                         conversionCharacter={c.conversionCharacter}
                                                         description={c.name}
                                                         closeable
                                            />}
                                        </Draggable>
                                    )}
                                    {conversions.selected.length !== 0 ? provided.placeholder : "Drag your elements here"}
                                </div>
                            )
                        }
                    </Droppable>
                    {/*<Droppable droppableId="2">*/}
                    {/*    {*/}
                    {/*        provided => <div>*/}
                    {/*            <div className="dropzone">Drag your elements here!</div>*/}
                    {/*            {conversions.map((c, idx) =>*/}
                    {/*                <Draggable draggableId={c.name} index={idx}>*/}
                    {/*                    {(provided) =>*/}
                    {/*                        <Pill {...provided.draggableProps} {...provided.dragHandleProps}*/}
                    {/*                              innerRef={provided.innerRef}*/}
                    {/*                              conversionCharacter={c.conversionCharacter}*/}
                    {/*                              description={c.name}/>}*/}
                    {/*                </Draggable>*/}
                    {/*            )}{provided.placeholder}*/}
                    {/*        </div>*/}
                    {/*    }*/}
                    {/*    /Droppable>*/}

                    {/*    <div className="dropzone">Drag your elements here</div>*/}

                </DragDropContext>

                <div className="templateString">Your template string will appear here!</div>
                <Terminal/>
            </main>

            <footer>
                Made by Florian Schmidt in Munich – Impressum – Datenschutzerklärung
            </footer>
        </div>
    );
}