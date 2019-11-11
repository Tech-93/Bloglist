const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if(blogs.length === 0) {
        
        return 0

    } else {

    var total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

    return total
    
    }
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostFavouredBlog = blogs.find(blog => blog.likes === mostLikes)

    const reformedFavoriteBlog = {
        title: mostFavouredBlog.title,
        author: mostFavouredBlog.author,
        likes: mostFavouredBlog.likes
    }

    return reformedFavoriteBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }