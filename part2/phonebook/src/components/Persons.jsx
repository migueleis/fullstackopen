import React from "react";

export const Persons = ({ newFilter, persons, handleRemove }) => {
    return (
        <div>
            {persons.filter(element => element.name.toUpperCase().includes(newFilter.toUpperCase()))
                .map(element => (
                    <div key={element.name}>
                        {element.name} {element.phone} <button onClick={() => handleRemove(element)}>remove</button>
                    </div>
                ))}
        </div>
    )
}