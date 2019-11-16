const Blog = require('../models/blog')
const User = require('../models/user')

const initalBlogs = [
    {
        url: 'Saltair.com',
        title: 'Bonfire',
        author: 'Gideon',
        likes: 1000
    }, 
    {
        url: 'Manchester.com',
        title: 'Halloween',
        author: 'Mathew',
        likes: 200
    }
]

const initialUsers = [
    {
        username: 'simppa',
        name: 'Simon Westerlund',
        password: '4116'
    },
    {
        username: 'fartface',
        name: 'Amanda Dabrowski',
        password: 'poobrain'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user)
  }

module.exports = {
    initalBlogs, blogsInDB, initialUsers, usersInDb
}