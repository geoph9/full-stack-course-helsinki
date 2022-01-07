import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likeButtonText, setLikeButtonText] = useState('like')
  const [currentLikes, setCurrentLikes] = useState(blog.likes)

  // API FUNCTIONS THAT CONCERN ALTERATIONS
  const changeLikes = async () => {
    const newText = (likeButtonText === 'like') ? 'dislike' : 'like'
    const incrValue = (likeButtonText === 'like') ? 1 : -1
    const newBlog = { ...blog, likes: currentLikes+incrValue }
    const res = await blogService.increaseLikes(newBlog)
    if (res !== null) {
      setCurrentLikes(currentLikes+incrValue)
      setLikeButtonText(newText)
    }
  }
  ///

  // STYLING
  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }
  const showWhenVisible = {
    ...hideWhenVisible,
    display: visible ? '' : 'none'
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  ///

  // EJX
  const blogDetails = () => (
    <div>
      <div>{blog.title} {blog.author}</div>
      <div>{blog.url}</div>
      <div>
        likes: {currentLikes}
        <button onClick={changeLikes}> {likeButtonText}</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
  const deleteButton = () => {
    // NOTE: USERNAME IS ASSUMED TO BE UNIQUE
    if (blog.user.name && blog.user.name.toString() !== user.name.toString()) return
    return (
      <div>
        <button
          onClick={() => removeBlog(blog)}
          style={{
            backgroundColor: 'blue',
            color: 'black',
            borderRadius: '8px'
          }}>
            remove
        </button>
      </div>
    )
  }
  const buttonName = `${blog.title} ${blog.author}`
  ///
  return (
    <>
      {/* <Togglable buttonLabel='View' cancelLabel='Hide' showBorder={true}>

      </Togglable> */}
      <div style={hideWhenVisible}>
        {buttonName}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blogDetails()}
        <button onClick={toggleVisibility}>Hide</button>
        {deleteButton()}
      </div>
    </>
  )
}

export default Blog