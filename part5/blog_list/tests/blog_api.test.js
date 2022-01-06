const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  // create a dummy user
  const user = await helper.createDummyUser()
  
  for (let note of helper.initialBlogs) {
    let blogObject = new Blog(note)
    blogObject.user = user._id
    await blogObject.save()
  }
  
})

describe('tests related to GET', () => {
  // Get returns correct amount of blog posts
  test('number of blogs in database after GET is legit.', async () => {
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)

  })

  // Check that the id is named `id` and not `_id`
  test('identifier name should be `id`', async () => {
    const allBlogs = await helper.blogsInDb()
  
    expect(allBlogs[0].id).toBeDefined()
  })
})

describe('adding new blog posts', () => {
  // Adding a new note
  test('a valid blog can be added', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)

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
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
  })
  // Adding a new note without a token
  test('a valid blog without a valid token should be unauthorized', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
  })

  // Check that if likes is missing from post then it defaults to 0
  test('when likes is missing it defaults to 0', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const newBlog = {
      author: 'Tester',
      title: 'Test',
      url: 'http://example.com/blog'
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const newLike = blogsAtEnd.filter(b => b.title === 'Test')[0].likes
    expect(newLike).toEqual(0)
  })
  
  test('blog without title is not added', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const newBlog = {
      author: 'Tester'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)

    // Check that size stays the same
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog without author is not added', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const newBlog = {
      title: 'Test'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)
    
    // Check that size stays the same
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})

describe('deleting blog posts', () => {
  test('delete first blog', async () => {
    // The first blog post belongs to the user with this token
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const allBlogs = await helper.blogsInDb()
    const blogToBeDeletedId = allBlogs[0].id

    await api
      .delete(`/api/blogs/${blogToBeDeletedId}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)
    
    // Check that size reduces by 1
    const allBlogsAfter = await helper.blogsInDb()
    expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('delete blog that doesn\'t exist', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const blogToBeDeletedId = 'testid'

    await api
      .delete(`/api/blogs/${blogToBeDeletedId}`)
      .set('Authorization', 'bearer ' + token)
      .expect(400)
    
    // Check that size stays the same
    const allBlogsAfter = await helper.blogsInDb()
    expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length )
  })
})

describe('updating blog posts', () => {
  test('update likes on first blog', async () => {
    const token = await helper.loginUser(helper.dummyUsername, helper.dummyPassword)
    const allBlogs = await helper.blogsInDb()
    const newBlogPost = allBlogs[0]

    await api
      .put(`/api/blogs/${newBlogPost.id}`)
      .set('Authorization', 'bearer ' + token)
      .send({...newBlogPost, likes: 18})
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const newLike = blogsAtEnd.filter(b => b.title === newBlogPost.title)[0].likes
    expect(newLike).toEqual(18)
  })

  test('update with invalid token fails', async () => {
    const token = 'blablabalhsldhaksfhaifh230124nk'
    const allBlogs = await helper.blogsInDb()
    const newBlogPost = allBlogs[0]

    await api
      .put(`/api/blogs/${newBlogPost.id}`)
      .set('Authorization', 'bearer ' + token)
      .send({...newBlogPost, likes: 18})
      .expect(401)
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