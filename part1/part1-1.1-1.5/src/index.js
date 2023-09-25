import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { Total } from './components/Total';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}  />
    </div>
  )
};

//From React 18.0.0
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);