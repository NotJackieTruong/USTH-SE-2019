var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');

var async = require('async');


exports.index = function(req, res) {   
    
    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display all books
exports.book_list = function(req, res, next) {

    Book.find({}, 'title author book_image')  //A
      .populate('author')  //B
      .exec(function (err, list_books) { //C
        if (err) { return next(err); }  //D
        //Successful, so render
        res.render('book_list', { title: 'Book Review', book_list: list_books }); //E
      });
      
  };

// Book search
exports.book_search = function(req, res, next){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Book.find({title: regex}, function(err, list_books){
            if(err){
                var err = new Error('Book not found');
                err.status = 404;
                return next(err);
            } else {
                res.render('book_list', { title: 'Book Review', book_list: list_books });
            }
        })
    } else {
        Book.find({}, 'title author book_image')
            .populate('author')
            .exec(function (err, list_books) {
                if (err) { 
                    var err = new Error('Book not found');
                    err.status = 404;
                    return next(err);
                 }
                //Successful, so render
                res.render('book_list', { title: 'Book Review', book_list: list_books });
            });
    }
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book} );
    });

};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

