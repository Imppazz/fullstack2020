const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const likes = blogs.map(blog => blog.likes)
    let total = likes.reduce((acc, curr) => acc + curr)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const likes = blogs.map(blog => blog.likes)
    maxLikes = Math.max(...likes)
    maxIndex = blogs.findIndex(blog => blog.likes === maxLikes)

    return blogs[maxIndex]
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

