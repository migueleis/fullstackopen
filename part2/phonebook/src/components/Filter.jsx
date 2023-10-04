import React from 'react';

export const Filter = ({handleChangeFilter, newFilter}) => {
    return (
        <div>
        Filter shown with: <input onChange={handleChangeFilter} value={newFilter} />
      </div>
    )
}