import React, { useState } from 'react'

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const History = ({goods, neutrals, bads}) => {  
  return (    
    <>
      <p>Good: {goods}</p>
      <p>Neutral: {neutrals}</p>
      <p>Bad: {bads}</p>
    </>  
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const title = "Give Feedback";
  const stats = "Statistics";

  const [goods, setGoods] = useState(0);
  const [neutrals, setNeutrals] = useState(0);
  const [bads, setBads] = useState(0);

  const incrementGood = () => setGoods(goods + 1)
  const incrementNeutral = () => setNeutrals(neutrals + 1)
  const incrementBad = () => setBads(bads + 1)

  return (
    <div>
      <Header header={title} />
      <br />
      <Button handleClick={incrementGood} text='good' />
      <Button handleClick={incrementNeutral} text='neutral' />
      <Button handleClick={incrementBad} text='bad' />
      <br />
      <Header header={stats} />
      <History goods={goods} neutrals={neutrals} bads={bads} />
      </div>
  )
}

export default App