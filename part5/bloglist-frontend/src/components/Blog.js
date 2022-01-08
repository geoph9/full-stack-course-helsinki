import React, { useState } from 'react'

const Blog = ({ blog, user, removeBlog, increaseLikes }) => {
  const [visible, setVisible] = useState(false)
  // const [likeButtonText, setLikeButtonText] = useState('like')
  const [currentLikes, setCurrentLikes] = useState(blog.likes)

  // API FUNCTIONS THAT CONCERN ALTERATIONS
  const changeLikes = async () => {
    // const newText = (likeButtonText === 'like') ? 'dislike' : 'like'
    // const incrValue = (likeButtonText === 'like') ? 1 : -1
    // const newBlog = { ...blog, likes: currentLikes+incrValue }
    // const res = await blogService.update(newBlog)
    // if (res === false) {
    //   console.log('JWT Token expired. Logout and re-login')
    //   setLikeButtonText('JWT Token expired')
    //   return
    // }
    // if (res !== null) {
    //   setCurrentLikes(currentLikes+incrValue)
    //   setLikeButtonText(newText)
    // }
    const res = await increaseLikes(blog)
    if (res)  setCurrentLikes(currentLikes+1)
    blog.likes++
  }
  ///

  // STYLING
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
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
        <span className="numberOfLikes">likes: {currentLikes}</span>
        <button className="likeButton" onClick={changeLikes}> like</button>
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
          className="removeBlogButton"
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
  const blogShortDescr = `${blog.title} ${blog.author}`
  ///
  return (
    <>
      {/* <Togglable buttonLabel='View' cancelLabel='Hide' showBorder={true}>

      </Togglable> */}
      <li className='blog blogDetailsShort' style={hideWhenVisible}>
        {blogShortDescr}
        <button className='viewBlogButton' onClick={toggleVisibility}>View</button>
      </li>
      <li className='blog blogDetailsExpanded' style={showWhenVisible}>
        {blogDetails()}
        <button onClick={toggleVisibility}>Hide</button>
        {deleteButton()}
      </li>
    </>
  )
}

export default Blog