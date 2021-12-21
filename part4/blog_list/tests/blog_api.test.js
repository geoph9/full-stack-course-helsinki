const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (let note of helper.initialBlogs) {
    let blogObject = new Blog(note)
    await blogObject.save()
  }
})

// Get returns correct amount of blog posts
test('number of blogs in database after GET is legit.', async () => {
  const allBlogs = await helper.blogsInDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length)

})

// Adding a new note
test('a valid blog can be added', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

// Check that the id is named `id` and not `_id`
test('identifier name should be `id`', async () => {
  const allBlogs = await helper.blogsInDb()

  expect(allBlogs[0].id).toBeDefined()
})

describe('missingProperties', () => {
  // Check that if likes is missing from post then it defaults to 0
  test('when likes is missing it defaults to 0', async () => {
    const newBlog = {
      author: 'Tester',
      title: 'Test',
      url: 'http://example.com/blog'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const newLike = blogsAtEnd.filter(b => b.title === 'Test')[0].likes
    expect(newLike).toEqual(0)
  })
  
  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Tester'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    // Check that size stays the same
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog without author is not added', async () => {
    const newBlog = {
      title: 'Test'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    // Check that size stays the same
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)  // timeout

afterAll(() => {
  mongoose.connection.close()
})