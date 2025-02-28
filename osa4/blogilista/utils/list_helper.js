const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const blog = blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev)
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const counts = {}
  const onlyAuthors = blogs.map(blog => blog.author)
  onlyAuthors.forEach(author => {
    counts[author] = (counts[author] || 0) + 1
  })
  const mostBlogs = Object.keys(counts).reduce((prev, current) => counts[current] > counts[prev] ? current : prev)

  return {
    'author': mostBlogs,
    'blogs': counts[mostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const totalLikes = {}
  blogs.forEach(blog => {
    totalLikes[blog.author] = (totalLikes[blog.author] || 0) + blog.likes
  })
  const authorMostLikes = Object.keys(totalLikes).reduce((prev, current) => totalLikes[current] > totalLikes[prev] ? current : prev)

  return {
    'author': authorMostLikes,
    'likes': totalLikes[authorMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}