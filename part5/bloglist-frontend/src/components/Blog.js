import React, {useState} from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({blog, user}) => {
  const [visible, setVisible] = useState(false)
  const [likeButtonText, setLikeButtonText] = useState("like")
  const [currentLikes, setCurrentLikes] = useState(blog.likes)

  const changeLikes = async () => {
    const newText = (likeButtonText === "like") ? "dislike" : "like"
    const incrValue = (likeButtonText === "like") ? 1 : -1
    const newBlog = {...blog, likes: currentLikes+incrValue}
    const res = await blogService.increaseLikes(newBlog)
    if (res !== null) {
      setCurrentLikes(currentLikes+incrValue)
      setLikeButtonText(newText)
    }
  }

  const blogDetails = () => (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes: {currentLikes} 
        <button onClick={changeLikes}> 
          {likeButtonText}
        </button>
      </div>
      <div>
        {user.name}
      </div>
    </div>
  )
  // const hideWhenVisible = { border: "1px solid", display: visible ? 'none' : '' }
  // const showWhenVisible = { border: "1px solid", display: visible ? '' : 'none' }
  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }
  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }
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