var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
  return 1
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const totalLikes = (list) => {
  const reducer = (sum, item) => {
    let likes = item.likes === undefined ? 0 : item.likes
    return sum + likes
  }
  return list.length === 0
    ? 0
    : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  const reducer = (currFavorite, item) => {
    let currLikes = currFavorite.likes === undefined ? 0 : currFavorite.likes
    let likes = item.likes === undefined ? 0 : item.likes
    if (likes > currLikes) {
      return {
        title: item.title,
        author: item.author,
        likes: likes,
      }
    }
    return currFavorite
  }
  if (!( list instanceof Array)) return {}
  return list.length === 1
    ? {title: list[0].title, author: list[0].author, likes: list[0].likes}
    : list.reduce(reducer, 0)
}
  
const mostBlogs = (list) => {
  if (!list || list.length === 0 || !list[0]['author']) return null
  const counts = _.countBy(list, 'author')
  const [author, count] = _.max(_.entries(counts))
  return {author, count}
}

const mostLikes = (list) => {
  if (!list || list.length === 0 || !list[0]['author']) return null
  const authors = _.groupBy(list, 'author')
  let likesPerAuthor = _.map(_.entries(authors), (currAuthor) => {
    let likes = _.sumBy(currAuthor[1], 'likes')
    return {'author': currAuthor[0], likes}
  })
  return _.maxBy(likesPerAuthor, 'likes')
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  blogs,
  mostBlogs,
  mostLikes,
}
