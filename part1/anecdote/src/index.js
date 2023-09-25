import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Button = ({ handeClick, text }) => (
  <button onClick={handeClick}>
    {text}
  </button>
);

const initVotes = [0, 0, 0, 0, 0, 0];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initVotes);
  const [mostVoted, setMostVoted] = useState(0);

  const handeClick = () => {
    const anecdoteIndex = Math.floor(Math.random() * 6);
    console.log('index', anecdoteIndex);
    setSelected(anecdoteIndex);
  };

  const handeClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  useEffect(()=>{
    const getMostVoted = () => {
      console.log(votes);
      const maxValue = Math.max(...votes);
      console.log('maxValue', maxValue);
      const mostVoted = votes.indexOf(maxValue);
      console.log('mostVoted', mostVoted);
      return mostVoted;
    }
    setMostVoted(getMostVoted());
  }, [votes])
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <div>
        <Button handeClick={handeClickVote} text='Vote' />
        <Button handeClick={handeClick} text='Next anecdote' />
      </div>

      <h2>Anecdote with most votes</h2>
      {props.anecdotes[mostVoted]}
    </div>
  )
}

//From React 18.0.0
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App anecdotes={anecdotes} />);