import React from 'react'
import Content from './Content'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
}

const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
)

const Courses = ({courses}) => {
    return (
        <div>
            {courses.map(course =>
                <Course course={course} key={course.id} />
            )}
        </div>
    )
}

export default Courses