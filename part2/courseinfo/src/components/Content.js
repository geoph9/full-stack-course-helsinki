import React from 'react'

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part part={part} key={part.id} />
        )}
      </div>
    )
}

export default Content