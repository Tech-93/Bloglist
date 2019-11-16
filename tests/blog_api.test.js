const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')




beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initalBlogs[0])
    await blogObject.save()

    let blogObject2 = new Blog(helper.initalBlogs[1])
    await blogObject2.save()
})


test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(helper.initalBlogs.length)
  })
  

test('that a blog is successfully added', async () => {
    const newBlog = {
        url: "about.com",
        title: "something",
        author: "someone",
        likes: 100
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)


    blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd.length).toBe(helper.initalBlogs.length + 1)
})

test('if blog has no likes it gets zero likes', async () => {
    const newBlog = {
        title: 'nothing',
        author: 'no-one',
        url: 'nowhere.com'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)

    something = await api.get('/api/blogs')

    expect(something.body[2].likes).toBe(0)    
})

test('if identifier property is named "id"' , async () => {
   
    const blogsAtStart = await helper.blogsInDB()
    identifierName = Object.keys(blogsAtStart[0])

    expect(identifierName[4]).toBe('id')
})

test('if title or url are missing return bad request', async () => {
    const falseBlog = new Blog( {
        author: 'no-one important',
        likes: 1
    })

    await api
    .post('/api/blogs')
    .send(falseBlog)
    .expect(400)

})

test('of deletion function', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete('/api/blogs/' + blogToDelete.id)
    .expect(204)

    blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd.length).toBe(helper.initalBlogs.length - 1)
})

test('of updateing likes works' ,async () => {
    
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
 
    const blog = {
        likes: 139
    }

    await api
    .put('/api/blogs/' + blogToUpdate.id)
    .send(blog)
    .expect(200)
})




afterAll(() => {
    mongoose.connection.close()
})