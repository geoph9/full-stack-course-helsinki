import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.ex1} />
      <Part part={props.part2} exercise={props.ex2} />
      <Part part={props.part3} exercise={props.ex3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.number}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} ex1={exercises1} part2={part2} ex2={exercises2} part3={part3} ex3={exercises3} />
      <Total number={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App