import React, { useState } from 'react'

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

// const History = ({goods, neutrals, bads}) => {  
//   return (    
//     <>
//       <p>Good: {goods}</p>
//       <p>Neutral: {neutrals}</p>
//       <p>Bad: {bads}</p>
//     </>  
//   )
// }

const Statistic = ({name, count}) => <tr><td>{name}</td><td>{count}</td></tr>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({goods, neutrals, bads}) => {
  // Calculate updated stats
  const getAverage = () => 
    (goods+neutrals+bads !== 0) ? (goods-bads)/(goods+neutrals+bads): 0
  const getPositives = () => {
    if (goods + neutrals + bads === 0) return 0
    return (goods / (goods+neutrals+bads))*100 + ' %'
  }
  if (goods+neutrals+bads === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return ( 
    <table>
      <tbody>
        <Statistic name='good' count={goods} />
        <Statistic name='neutral' count={neutrals} />
        <Statistic name='bad' count={bads} />
        <Statistic name='all' count={goods + neutrals + bads} />
        <Statistic name='average' count={getAverage()} />
        <Statistic name='positive' count={getPositives()} />
      </tbody>
    </table>
  )
}

const App = () => {
  const title = "Give Feedback";
  const stats = "Statistics";

  const [goods, setGoods] = useState(0);
  const [neutrals, setNeutrals] = useState(0);
  const [bads, setBads] = useState(0);

  // State setters
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
      <Statistics goods={goods} neutrals={neutrals} bads={bads} />
    </div>
  )
}

export default App