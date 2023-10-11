import React, { useEffect, useState } from 'react';
import Note from './components/Note';
import { getAll } from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allNotes = await getAll();
        setNotes(allNotes);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App;
