import React from "react";
import { Part } from "./Part";

export const Content = (props) => {
    const showPart = (part) => {
        return <Part key={part.name} part={part.name} exercises={part.exercises}/>
    }
    const listParts = (parts) =>{
        return parts.map(part => showPart(part));
    }
    return (
        <div>
            {listParts(props.parts)}
        </div>
    )
}