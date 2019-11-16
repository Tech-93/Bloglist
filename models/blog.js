const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


const blogSchema = mongoose.Schema({
    url: {
      type: String,
      required: true 
    },
    title: {
      type: String,
      required: true
    },
    author: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  })

  blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
    }
  })

  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog
