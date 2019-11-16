const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
    
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

   

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
    

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        url : body.url,
        title: body.title,
        author: body.author,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })
    
    
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token is missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)


    if(blog.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'this user does not own this blog' })
    } 
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
} catch (exception) {
    next(exception)
}
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog => updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter