import React, { useState } from 'react'

const Button = ({handler, text}) => {
  return (
  <button onClick={handler}>
    {text}
  </button>
)}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0);
  // An initial object where the keys are the indices and the values are always 0
  const [votes, setVotes] = useState(Object.fromEntries(anecdotes.map((item, index) => [index, 0])));
  
  const nextJoke = () => setSelected(getRandom(0, anecdotes.length))
  const addVote = () => {
    const copy = { ...votes};
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} {votes[selected] === 1 ? 'vote' : 'votes'}</p>
      <br />
      <Button handler={addVote} text="vote" />
      <Button handler={nextJoke} text="next anecdote" />
    </div>
  )
}

export default App