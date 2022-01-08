const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user

  const blog = new Blog({...request.body, user: user._id, })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog === null) {
    response.status(400).json({
      error: 'Could not find a blog with this id.'
    })
    return
  }
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    return
  }
  return response.status(401).json({
    error: 'You cannot delete another user\'s blog.'
  })
  // response.status(400).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const user = request.user
  const originalBlog = await Blog.findById(request.params.id)
  if (originalBlog === null) {
    return response.status(400).json({
      error: 'Could not find a blog with this id.'
    })
  }
  const body = request.body

  let newBlog = {  // title can't change
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id,
  }

  if (originalBlog.user.toString() !== user.id.toString()) {
    console.log(body.author, body.url, body.likes, originalBlog)
    // an external user is allowed to increase the likes
    if (
      body.author === originalBlog.author && 
      body.url === originalBlog.url &&
      body.likes !== originalBlog.likes
    ) {
      newBlog = {...newBlog, likes: body.likes}
    } else {
      return response.status(401).json({
        error: 'You cannot update another user\'s blog.'
      })
    }
  }

  console.log('UPDATING WITH BLOG:', newBlog)
  const updatedBlogPost = await Blog.findByIdAndUpdate(
    request.params.id, newBlog, { new: true }
  )
  response.json(updatedBlogPost)
})

module.exports = blogsRouter
