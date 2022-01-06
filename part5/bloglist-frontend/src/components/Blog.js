import React, {useState} from 'react'
import Togglable from './Togglable'

const Blog = ({blog, user}) => {
  const [visible, setVisible] = useState(false)
  const blogDetails = () => (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes: {blog.likes}
      </div>
      <div>
        {user.name}
      </div>
    </div>
  )
  const hideWhenVisible = { border: "1px solid", display: visible ? 'none' : '' }
  const showWhenVisible = { border: "1px solid", display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonName = `${blog.title} ${blog.author}`
  return (
    <>
      {/* <Togglable buttonLabel="View" cancelLabel="Hide" showBorder={true}>
        
      </Togglable> */}
      <div style={hideWhenVisible}>
        {buttonName} 
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blogDetails()}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </>
  )
}

export default Blog