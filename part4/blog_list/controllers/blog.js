const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)
  const blog = new Blog({...request.body, user: user._id, })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {  // title can't change
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlogPost = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true }
  )
  response.json(updatedBlogPost)
})

module.exports = blogsRouter
