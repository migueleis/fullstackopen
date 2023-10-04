import React from "react";

export const PersonForm = ({ handleChange, newName, handleChangePhone, newPhone, handleClick }) => {

    return (
        <form>
            <div>
                name: <input onChange={handleChange} value={newName} />
            </div>
            <div>
                number: <input onChange={handleChangePhone} value={newPhone} />
            </div>
            <div>
                <button type="submit" onClick={handleClick}>add</button>
            </div>
        </form>
    )
}