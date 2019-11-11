const Blog = require('./blogdb')



var allLikes = Blog.blogs.map(blog => blog.likes)



var total = allLikes.reduce((sum, likes) => sum + likes)

var total2 = Blog.blogs.reduce((sum,blog) => sum + blog.likes, 0)

const mostLikes = Math.max(...Blog.blogs.map(blog => blog.likes))

const favouriteBlog = Blog.blogs.find(blog => blog.likes === mostLikes)

const refined = {
    title: favouriteBlog.title,
    author: favouriteBlog.author,
    likes: favouriteBlog.likes
}

console.log(refined)


const bloggers = Blog.blogs.map(blog => blog.author)



console.log(uniquesBloggers)


/*
Math.max.apply(Math, array.map(function(o) { return o.y; }))
*/


