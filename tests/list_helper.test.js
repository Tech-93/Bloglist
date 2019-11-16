const listHelper = require('../utils/list_helper')
const Blogs = require('../blogdb')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})




describe('total likes', () => {
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

  const emptyList = []

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(Blogs.blogs)
    expect(result).toBe(36)
  })


})

describe('favorite Blog', () => {

  const comparativeBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('if the right favorite is found in list', () => {
    const result = listHelper.favoriteBlog(Blogs.blogs)
    expect(result).toEqual(comparativeBlog)
  })

})

describe('Most Blogs', () => {
  const comparativeBlog = {
    author: 'Robert C. Martin',
    blogs: 3
  }


  test('if the right blogger with most blog is found in the list', () => {
    const result = listHelper.mostBlogs(Blogs.blogs)
    expect(result).toEqual(comparativeBlog)

  })

})


describe('Most Likes', () => {
  const comparativeBlog = {
    author: "Edsger W. Dijkstra",
    likes: 17 
  }

  test('if the right blogger with most likes is found', () => {
    const result = listHelper.mostLikes(Blogs.blogs)
    expect(result).toEqual(comparativeBlog)
  })
})