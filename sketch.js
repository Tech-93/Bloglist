const Blog = require('./blogdb')



var allLikes = Blog.blogs.map(blog => blog.likes)

const blogs = Blog.blogs.map(blog => blog)

var blogger = {}
var likesCount = 0

for (var i = 0; i < blogs.length ; i++ ) {
    var tempBlogger = blogs[i]
    var tempLikesCount = 0

    for (var j = 0; j < blogs.length; j++) {
        if(blogs[j].author === tempBlogger.author){
            tempLikesCount += blogs[j].likes
        }
    }

    if (tempLikesCount > likesCount) {
        blogger = tempBlogger
        likesCount = tempLikesCount
    }   
}

const greatestBlogger = {
    author: blogger.author,
    likes: likesCount
}

console.log(greatestBlogger)








/*
var author = {}
var count = 0

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

const greatestBlogger = {
    author: author,
    blogs: count
}

console.log(greatestBlogger)


/*
for(var i = 0, len = blogs.length; i < len; i++){
    var counts = {}
    var compare = 0
    var mostFrequent
    var frequency = 0
    var author = blogs[i].author;
 
    if(counts[author] === undefined){ //if count[author] doesn't exist
       counts[author] = 1;    //set count[author] value to 1
    }else{                  //if exists
       counts[author] = counts[author] + 1; //increment existing value
    }
    if(counts[author] > compare){  //counts[author] > 0(first time)
       compare = counts[author];   //set compare to counts[author]
       mostFrequent = blogs[i];  //set mostFrequent value
       frequency = frequency + 1
    }

    
}

console.log(mostFrequent)
    console.log(frequency)

/*
Math.max.apply(Math, array.map(function(o) { return o.y; }))
*/


