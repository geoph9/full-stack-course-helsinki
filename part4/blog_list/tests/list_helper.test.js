/* eslint-disable quotes */
const listHelper = require('../utils/list_helper')

describe('dummyTest', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})


describe('totalLikes', () => {
  test('of one value is the value itself', () => {
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
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of many is calculated right', () => {
    expect(listHelper.totalLikes(listHelper.blogs)).toBe(31)
  })

  test('of empty array is zero', () => {
    expect(listHelper.totalLikes([{}])).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('of one value is the value itself', () => {
    expect(listHelper.favoriteBlog([listHelper.blogs[0]])).toEqual({
      title: listHelper.blogs[0].title,
      author: listHelper.blogs[0].author,
      likes: listHelper.blogs[0].likes
    })
  })

  test('of many is calculated right', () => {
    expect(listHelper.favoriteBlog(listHelper.blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

  test('of array with empty object is an empty object', () => {
    expect(listHelper.favoriteBlog([{}])).toEqual({})
  })

  test('of no array is an empty object', () => {
    expect(listHelper.favoriteBlog(null)).toEqual({})
  })
})

describe('mostBlogs', () => {
  test('of many blogs returns the correct value', () => {
    expect(listHelper.mostBlogs(listHelper.blogs)).toEqual({
      author: 'Robert C. Martin',
      count: 3
    })
  })

  test('of no blogs to return null', () => {
    expect(listHelper.mostBlogs([{}])).toEqual(null)
  })
  test('of null to return null', () => {
    expect(listHelper.mostBlogs(null)).toEqual(null)
  })
})

describe('mostLikes', () => {
  test('of many blogs returns the correct value', () => {
    expect(listHelper.mostLikes(listHelper.blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('of no blogs to return null', () => {
    expect(listHelper.mostLikes([{}])).toEqual(null)
  })
  test('of null to return null', () => {
    expect(listHelper.mostLikes(null)).toEqual(null)
  })
})