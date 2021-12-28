import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const showNotification = (setNotification, text, timeout=3000) => {
  setNotification(text)
  setTimeout(() => {
    setNotification(null)
  }, timeout)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const featchAll = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    featchAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = newBlog
    blogObject.user = user
    blogObject.likes = 0
    // setNotes(notes.concat(noteObject))
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog({title: '', author: '', url: ''})
    showNotification(
      setNotification,
      `A new blog ${blogObject.title} by ${blogObject.author} has been created.`,
      5000
    )
  }

  const handleLogin = async (event) => {    
    event.preventDefault()
    try {      
      const loggedUser = await loginService.login({        
        username, password,
      })
      if (!loggedUser) {
        showNotification(
          setErrorMessage,
          'Wrong username or password',
          5000
        )
        return
      }
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loggedUser)
      ) 
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      showNotification(
        setNotification,
        'Succesfully logged in',
        5000
      )
    } catch (exception) {
      showNotification(
        setErrorMessage,
        'Wrong Credentials',
        5000
      )
    }
  }

  const logoutUser = async (event) => {    
    event.preventDefault()
    if (!user) {
      setErrorMessage('User was already logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      setUser(null)
      window.localStorage.removeItem('loggedNoteappUser')
      blogService.setToken(null)
      setUsername('')
      setPassword('')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type="error" />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const showBlogs = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification message={notification} type="notification" />
        <Notification message={errorMessage} type="error" />
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logoutUser}>          
              logout
          </button>
        </div>
        <br />
        <h2>Create New</h2>
        <div>
          {addNewBlogForm()}
        </div>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  const addNewBlogForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
            title: 
            <input
              type="text"
              value={newBlog['title']}
              name="Title"
              onChange={({ target }) => setNewBlog({...newBlog, title: target.value })}
            />
          </div>
          <div>
            author: 
            <input
              type="text"
              value={newBlog['author']}
              name="Author"
              onChange={({ target }) => setNewBlog({...newBlog, author: target.value })}
            />
          </div>
          <div>
            url: 
            <input
              type="text"
              value={newBlog['url']}
              name="URL"
              onChange={({ target }) => setNewBlog({...newBlog, url: target.value })}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {user === null ? 
        loginForm() : 
        <div>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App