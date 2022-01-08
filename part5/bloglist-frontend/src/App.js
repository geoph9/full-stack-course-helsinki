import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  const removeBlog = async (blog) => {
    const deleteConfirm = window.confirm(`Delete blog '${blog.title}' by '${blog.author}'?`)
    if (deleteConfirm === false) return
    const res = await blogService.removeBlog(blog)
    console.log('GORE RESUTLS:', res)
    if (res) {
      setBlogs(  // remove blog
        blogs.filter((b) => b.id !== blog.id)
      )
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    if (!returnedBlog) {
      showNotification(
        setErrorMessage,
        'Could not submit the new blog',
        5000
      )
      return
    }
    setBlogs(blogs.concat(returnedBlog))
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
        <Togglable buttonLabel="Create new blog" cancelLabel="Cancel" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} user={user} />
        </Togglable>
        <br />
        <ul>
          {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
          )}
        </ul>
      </>
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