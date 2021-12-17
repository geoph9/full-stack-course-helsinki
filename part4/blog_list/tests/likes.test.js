const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


describe('totalLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    listWithOneBlog[0],
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Steppenwolf',
      author: 'Hermann Hesse',
      url: 'https://www.goodreads.com/book/show/16631.Steppenwolf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Siddhartha',
      author: 'Hermann Hesse',
      url: 'https://www.goodreads.com/book/show/52036.Siddhartha',
      likes: 0,
      __v: 0
    },
  ]
  test('of one value is the value itself', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of many is calculated right', () => {
    expect(totalLikes(listWithManyBlogs)).toBe(15)
  })

  test('of empty array is zero', () => {
    expect(totalLikes([{}])).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('of one value is the value itself', () => {
    expect(favoriteBlog([blogs[0]])).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    })
  })

  test('of many is calculated right', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    })
  })

  test('of empty array is an empty object', () => {
    expect(favoriteBlog([{}])).toBe(undefined)
  })
})
