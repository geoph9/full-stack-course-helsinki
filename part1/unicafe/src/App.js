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

const StatContent = ({name, count}) => <p>{name}: {count}</p>

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
  const [allClicks, setAllClicks] = useState(0);
  const [average, setAverage] = useState(0);
  const [positives, setPositives] = useState(0);

  const getAverage = (newGoods, newNeutrals, newBads) => 
    (newGoods-newBads)/(newGoods+newNeutrals+newBads)
  const getPositives = (newGoods, newNeutrals, newBads) => {
    if (newGoods + newNeutrals + newBads === 0) return 0
    return newGoods / (newGoods+newNeutrals+newBads)
  }
  const formatPositives = () => positives*100 + " %"

  const incrementGood = () => {
    // The increment does not take effect inside the function
    // and so we still need to pass the incremented variable.
    setAverage(getAverage(goods+1, neutrals, bads))
    setPositives(getPositives(goods+1, neutrals, bads))
    setGoods(goods + 1)
    setAllClicks(allClicks + 1)
  }
  const incrementNeutral = () => {
    setAverage(getAverage(goods, neutrals+1, bads))
    setPositives(getPositives(goods, neutrals+1, bads))
    setNeutrals(neutrals + 1)
    setAllClicks(allClicks + 1)
  }
  const incrementBad = () => {
    setAverage(getAverage(goods, neutrals, bads+1))
    setPositives(getPositives(goods, neutrals, bads+1))
    setBads(bads + 1)
    setAllClicks(allClicks + 1)
  }

  return (
    <div>
      <Header header={title} />
      <br />
      <Button handleClick={incrementGood} text='good' />
      <Button handleClick={incrementNeutral} text='neutral' />
      <Button handleClick={incrementBad} text='bad' />
      <br />
      <Header header={stats} />
      <StatContent name='good' count={goods} />
      <StatContent name='neutral' count={neutrals} />
      <StatContent name='bad' count={bads} />
      <StatContent name='all' count={allClicks} />
      <StatContent name='average' count={average} />
      <StatContent name='positive' count={formatPositives()} />
      </div>
  )
}

export default App