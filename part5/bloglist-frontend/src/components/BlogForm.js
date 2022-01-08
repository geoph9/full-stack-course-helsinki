import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { ...newBlog, user: user, likes: 0 }
    createBlog(blogObject)

    setNewBlog({
      title: '', author: '', url: ''
    })
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newBlog['title']}
            name='Title'
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlog['author']}
            name='Author'
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlog['url']}
            name='URL'
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm