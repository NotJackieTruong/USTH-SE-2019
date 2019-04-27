#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Book = require('./models/book')
var Author = require('./models/author')
var Genre = require('./models/genre')




var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var genres = []
var books = []



function authorCreate(first_name, family_name, author_image, author_background, d_birth, d_death, cb) {
  authordetail = {
    first_name:first_name , 
    family_name: family_name, 
    author_image: author_image,
    author_background: author_background
  }
  if (d_birth != false) authordetail.date_of_birth = d_birth
  if (d_death != false) authordetail.date_of_death = d_death
  
  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function bookCreate(title, review, isbn, author, genre, book_image, cb) {
  bookdetail = { 
    title: title,
    review: review,
    author: author,
    isbn: isbn,
    book_image: book_image
  }
  if (genre != false) bookdetail.genre = genre
    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}




function createAuthors(cb) {
    async.series([
        function(callback) {
          authorCreate('Patrick', 'Rothfuss', 'https://statics.sportskeeda.com/editor/2018/08/bd960-1534053592-800.jpg','Hello world', '1973-06-06', false,  callback);
        },
        function(callback) {
          authorCreate('Ben', 'Bova', 'https://statics.sportskeeda.com/editor/2018/08/bd960-1534053592-800.jpg', 'Hello world', '1932-11-8', false, callback);
        },
        function(callback) {
          authorCreate('Isaac', 'Asimov', 'https://statics.sportskeeda.com/editor/2018/08/bd960-1534053592-800.jpg', 'Hello world', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          authorCreate('Bob', 'Billings', 'https://statics.sportskeeda.com/editor/2018/08/bd960-1534053592-800.jpg', 'Hello world', false, false, callback);
        },
        function(callback) {
          authorCreate('Jim', 'Jones', 'https://statics.sportskeeda.com/editor/2018/08/bd960-1534053592-800.jpg', 'Hello world', '1971-12-16', false, callback);
        },
        ],
        // optional callback
        cb);
}

function createGenres(cb) {
    async.series([
        function(callback) {
            genreCreate("Fantasy", callback);
          },
          function(callback) {
            genreCreate("Science Fiction", callback);
          },
          function(callback) {
            genreCreate("French Poetry", callback);
          },
          ],
          cb);
}

function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], 'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg', callback);
        },
        function(callback) {
          bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        },
        function(callback) {
          bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], 'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg', callback);
        },
        function(callback) {
          bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        },
        function(callback) {
          bookCreate('Test Book 2', 'review of test book 2', 'ISBN222222', authors[4], false, 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback)
        }
        ],
        // optional callback
        cb);
}




async.series([
    createAuthors,
    createGenres,
    createBooks,
    
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }

    // All done, disconnect from database
    mongoose.connection.close();
});



