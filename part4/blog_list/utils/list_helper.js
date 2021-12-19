// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
  return 1
}

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
  
// eslint-disable-next-line no-unused-vars
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
