import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { getAll, create, remove, update } from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationLevel, setNotificationLevel] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const allPersons = await getAll();
        setPersons(allPersons);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
    fetchData();
  }, []);

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    if (newName === '' || newPhone === '') {
      return;
    }
    const obj = {
      name: newName,
      phone: newPhone
    };
    const sameName = persons.find(person => person.name === newName);
    if (sameName) {
      if (window.confirm('Update ' + obj.name + '?')) {
        obj.id = sameName.id;
        update(obj,)
          .then(console.log("Updated " + obj))
          .catch(error => {
            setNotificationLevel('error');
            setNotificationMessage('Information of ' + obj.name + ' has already been removed from server');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      setNewName('');
      setNewPhone('');
      create(obj)
        .then(() => {
          setNotificationLevel('success');
          setNotificationMessage ('Added ' + obj.name);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  }

  const handleClickRemove = (contact) => {
    if (window.confirm('Delete ' + contact.name + '?')) {
      remove(contact).then(console.log('removed contact', contact));
    }
  }

  return (
    <div>
      <Notification level={notificationLevel} message={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter handleChangeFilter={handleChangeFilter} newFilter={newFilter} />
      <h2>Add a new number</h2>
      <PersonForm
        handleChange={handleChange}
        handleChangePhone={handleChangePhone}
        handleClick={handleClick}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleRemove={handleClickRemove} />
    </div>
  )
}

export default App;

//From React 18.0.0
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);