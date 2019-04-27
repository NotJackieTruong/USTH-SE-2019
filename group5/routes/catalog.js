var express = require('express');
var router = express.Router();

//Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');



///Book Routes///

//GET catalog home page.
router.get('/', book_controller.book_search);

//GET request for one book
router.get('/book/:id', book_controller.book_detail);

//GET request for list of all books
router.get('/books', book_controller.book_list);



///Author routes///

//GET request for one author
router.get('/author/:id', author_controller.author_detail);

//GET request for list of all authors
router.get('/authors', author_controller.author_list);



///Genre routes///

//GET request for one genre
router.get('/genre/:id', genre_controller.genre_detail);

//GET request for list of all genres
router.get('/genres', genre_controller.genre_list);


module.exports = router;