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

    console.log(reformedFavoriteBlog)
    return reformedFavoriteBlog
}

const mostBlogs = (blogs) => {
    var author = {}
    var count = 0   

    const authors = blogs.map(blog => blog.author)

    for (var i = 0; i < authors.length ; i++) {
        var tempAuthor = authors[i]
        var tempCount = 0
        for (var j = 0; j < authors.length; j++) {
            if(authors[j] === tempAuthor){
                tempCount++
            }
        }
        if(tempCount > count){
            author = tempAuthor
            count = tempCount
        }
    }

    mostBlogsAuthor = {
        author: author,
        blogs: count
    }

    return mostBlogsAuthor

}

const mostLikes = (blogs) => {
    var blogger = {}
    var likesCount = 0

    for(var i = 0; i < blogs.length; i++) {
        var tempBlogger = blogs[i]
        var tempLikesCount = 0

        for (var j = 0; j < blogs.length; j++) {
            if (blogs[j].author === tempBlogger.author){
                tempLikesCount += blogs[j].likes
            }
        }

        if(tempLikesCount > likesCount) {
            blogger = tempBlogger
            likesCount = tempLikesCount
        }
    }

    mostLikedBlogger = {
        author: blogger.author,
        likes: likesCount
    }

    return mostLikedBlogger

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }