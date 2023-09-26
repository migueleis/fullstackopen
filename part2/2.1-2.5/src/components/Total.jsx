import React from "react";

export const Total = (props) => {
    const getTotal = (parts) => {
        return parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);
    }
    return (
        <p>Number of exercises {getTotal(props.parts)}</p>
    )
}