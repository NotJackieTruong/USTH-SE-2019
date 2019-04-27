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

function genreCreate(name,genre_image, cb) {
  var genre = new Genre({ 
    name: name,
    genre_image: genre_image
   });
       
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

function bookCreate(title, review, isbn, author, genre, book_image, book_link, cb) {
  bookdetail = { 
    title: title,
    review: review,
    author: author,
    isbn: isbn,
    book_image: book_image,
    book_link: book_link
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
          authorCreate('Stephen', 'King', 'https://cdn-01.independent.ie/migration_catalog/article25089586.ece/06d95/AUTOCROP/w620/1407_stephenking_i',"An American author of horror, supernatural fiction, suspense, science fiction, and fantasy. His books have sold more than 350 million copies,[2] many of which have been adapted into feature films, miniseries, television series, and comic books. King has published 58 novels (including seven under the pen name Richard Bachman) and six non-fiction books. He has written approximately 200 short stories,[3][4] most of which have been published in book collections.", '1973-06-06', false,  callback);
        },
        function(callback) {
          authorCreate('J.K', 'Rowling', 'https://i1.wp.com/salamandra.info/sites/default/files/styles/page_main/public/articles/rowling.jpg?itok=399w6wyt', "A British novelist, philanthropist, film producer, television producer and screenwriter, best known for writing the Harry Potter fantasy series.", '1965-07-31', false, callback);
        },
        function(callback) {
          authorCreate('Cao', 'Nam', 'https://image.tienphong.vn/w665/Uploaded/2019/xumrvjpnb/785/138785.jpg', "A Vietnamese writer, soldier and a martyr. One of the biggest Realistic fiction writers before the Vietnamese’s Revolution, a resistance journalist (after the revolution), one of the most well-known author in the XX century.", '1915-10-20', '1951-11-30', callback);
        },
        function(callback) {
          authorCreate('R.L', 'Stine', 'http://rlstine.com/upload/images/timeline/medium/20161212-about-rl-stine.jpg', "An American novelist, short story writer, television producer, screenwriter, and executive editor.\
          Stine has been referred to as the 'Stephen King of children's literature' and is the author of hundreds of horror fiction novels, including the books in the Fear Street, Goosebumps, Rotten School, Mostly Ghostly, and The Nightmare Room series. Some of his other works include a Space Cadets trilogy, two Hark gamebooks, and dozens of joke books. As of 2008, Stine's books have sold over 400 million copies.\
          ", '1943-10-08', false, callback);
        },
        function(callback) {
          authorCreate('H.G', 'Wells', 'https://www.biography.com/.image/t_share/MTE1ODA0OTcxMzI4NjM2NDI5/h.jpg',"An English writer. He was prolific in many genres, writing dozens of novels, short stories, and works of social commentary, satire, biography, and autobiography, and even including two books on recreational war games. He is now best remembered for his science fiction novels and is often called a 'father of science fiction', along with Jules Verne and Hugo Gernsback.", '1866-09-21', '1946-08-13', callback);
        },
        function(callback) {
          authorCreate('Margaret', 'Mitchell', 'https://i.pinimg.com/originals/f0/a5/35/f0a535033151b061dcf57de4fbe19153.jpg', "An American novelist and journalist. Mitchell wrote only one novel, published during her lifetime, the American Civil War-era novel Gone with the Wind, for which she won the National Book Award for Most Distinguished Novel of 1936 and the Pulitzer Prize for Fiction in 1937.", '1900-11-08', '1949-08-16', callback);
        },
        function(callback) {
          authorCreate('Nicholas', 'Sparks', 'http://priyadashini.pbworks.com/f/1367953776/d-Nicholas.Sparks.jpg', "An American romance novelist and screenwriter. He has published twenty novels and two non-fiction books. Several of his novels have become international bestsellers, and eleven of his romantic-drama novels have been adapted to film all with multimillion-dollar box office grosses.", '1965-12-31', false, callback);
        },
        function(callback) {
          authorCreate('Dan', 'Brown', 'http://danbrown.com/wp-content/uploads/2017/07/DB-Author-Photo-Credit-Dan-Courter-20170530_034-Edit.jpg', "An American author most well known for his thriller novels, including the Robert Langdon stories, Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts set in a 24-hour period, and feature the recurring themes of cryptography, keys, symbols, codes, art, and conspiracy theories. His books have been translated into 57 languages, and as of 2012, sold over 200 million copies. Three of them, Angels & Demons (2000), The Da Vinci Code (2003) and Inferno (2013) have been adapted into films.", '1964-06-21', false, callback);
        },
        function(callback) {
          authorCreate('Arthur Conan', 'Doyle', 'https://s3-us-west-2.amazonaws.com/easel-media/4a0aca49-60c7-4af7-9d95-d3e21f8d0a25.jpeg', "A British writer best known for his detective fiction featuring the character Sherlock Holmes. Originally a physician, in 1887 he published A Study in Scarlet, the first of four novels about Holmes and Dr. Watson. In addition, Doyle wrote over fifty short stories featuring the famous detective. The Sherlock Holmes stories are generally considered milestones in the field of crime fiction.\
          Doyle was a prolific writer; his non-Sherlockian works include fantasy and science fiction stories about Professor Challenger and humorous stories about the Napoleonic soldier Brigadier Gerard, as well as plays, romances, poetry, non-fiction and historical novels. One of Doyles early short stories, 'J. Habakuk Jephsons Statement', helped to popularise the mystery of the Mary Celeste.\
          ", '1859-05-22', '1930-07-07', callback);
        },
        function(callback) {
          authorCreate('Thomas', 'Harris', 'https://votamquan.files.wordpress.com/2018/03/18124au.jpg', "William Thomas Harris III is an American writer, best known for a series of suspense novels about his most famous character, Hannibal Lecter. The majority of his works have been made into films, the most notable being The Silence of the Lambs, which became only the third film in Academy Awards history to sweep the Oscars in major categories.\
          ", '1940-09-22', false, callback);
        },
        ],
        // optional callback
        cb);
}

function createGenres(cb) {
    async.series([
        function(callback) {
            genreCreate("Realistic", "https://tailieuvanhoc.net/wp-content/uploads/2014/11/Ph%C3%A2n-t%C3%ADch-nh%C3%A2n-v%E1%BA%ADt-l%C3%A3o-H%E1%BA%A1c-trong-truy%E1%BB%87n-ng%E1%BA%AFn-L%C3%A3o-H%E1%BA%A1c-c%E1%BB%A7a-Nam-Cao.jpg", callback);
          },
        function(callback) {
          genreCreate("Fiction", "https://i3.wp.com/canacopegdl.com/images/fiction/fiction-9.jpg", callback);
        },
        function(callback) {
          genreCreate("Fantasy", "http://buzzymag.com/wp-content/uploads/2018/01/Fantasy-Book-Writing.jpg", callback);
        },
        function(callback) {
          genreCreate("Romance", "http://www.mariasfarmcountrykitchen.com/wp-content/uploads/2015/05/Romance-Novels-101.jpg", callback);
        },
        function(callback) {
          genreCreate("Short Story", "https://cdn-images-1.medium.com/max/1200/1*JleH9NpurzW1xTDLSLgQww.jpeg", callback);
        },
        function(callback) {
          genreCreate("Horror", "https://www.fastweb.com/uploads/article_photo/photo/2036943/10-Horror-Books-Way-Scarier-Than-the-Films.jpg", callback);
        },
        function(callback) {
          genreCreate("Children Book", "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/16/1524058250-rick-and-morty-portal.jpg", callback);
        },
        function(callback) {
          genreCreate("Sci-Fi", "https://www.hiepsibaotap.com/wp-content/uploads/2018/08/the-apples-of-eden-were-pieces-of-eden-a-type-of-technology-made-by-isu1.jpg", callback);
        },
        function(callback) {
          genreCreate("Thriller", "https://www.filmykeeday.com/wp-content/uploads/2014/03/Taken-Hollywood-suspense-thriller-film-e1484810072643.jpg", callback);
        },
        function(callback) {
          genreCreate("Crime Book", "https://d92mrp7hetgfk.cloudfront.net/images/sites/H2B/Detective/original.jpg?1532640504", callback);
        },

         
          ],
          cb);
}

function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('Pet sematary', "Pet Sematary follows family man Louis Creed’s move from Chicago to Ludlow as he becomes the director of the University of Maine’s health service. He moves to the small town of Ludlow with his wife Rachael, daughter Ellie and toddler Gage. They also have a family cat named Church, named after Winston Churchill. Shortly after moving in, the family is introduced to the pet cemetery by their friendly neighbour Jud Crandall. Later on, Louis finds out the uncanny secrets that lie just beyond the pet cemetery.\
          Pet Sematary didn’t scare me, but it certainly gave me chills. There are many uncomfortable scenes, much of them including corpses. If these are themes you’re not used to reading about then you may find it disturbing. For me, it wasn’t so much about what was happening in these scenes, it was how King painted the picture that made me cringe. He knows exactly which strings to pull.\
          It’s surprising that Stephen King didn’t even want to publish this book. Originally, King shelved it because he and his wife thought it too dark and disturbing. However, later on there was a need for him to provide a book to his publisher for contractual obligations. This is when King decided to send Pet Sematary to his editor, who loved the book. The book was a success upon publication, and it’s not hard to understand why. Do yourself a favour and read this book.", '1234555321123', authors[0], [genres[5],], 'https://images-na.ssl-images-amazon.com/images/I/81efI4Y5MFL.jpg', 'https://www.amazon.com/Pet-Sematary-Stephen-King/dp/0743412281', callback);
          },
        function(callback) {
          bookCreate('It', "It’s a book about childhood, in particular the special elements like friendships that seem they will last forever, days and lives that will last forever. I cannot think of many authors who can capture what it was like to be a kid better than King. He remembers things vividly and through his words allows us to remember the excitement, the awkwardness, the ability to laugh genuinely and hard at the dumbest of things. But it is not all fun, there are the bullies, there is the feeling of inadequacy and isolation. This is not just a horror story, indeed it is less about horror and more about coming of age.\
          As an exploration of childhood, growing up, friendship and facing both real and supernatural fears I still hold It up as a great book. But the ending, and the book’s length in general, will be unpalatable to many readers.\
          -Floresiensis\
          ", '1234555321123', authors[0], [genres[5],], 'https://images-na.ssl-images-amazon.com/images/I/71lZgzNE2kL.jpg', 'https://www.amazon.com/Novel-Stephen-King/dp/1501142976', callback);
        },
        function(callback) {
          bookCreate('Chí Phèo', "'Chí Phèo'- 'Ai cho tao lương thiện?' Trên kia mình trích một câu nói của Chí Phèo, có thể bây giờ mình không còn nhớ nó đúng không nhưng mình rất nhớ khi đọc câu này lần đầu tiên, mình đã nhăn mặt và chợt khóc. Tại sao cái lương thiện, cái bình sinh vốn dĩ của con người mà Chí Phèo phải gào lên thẳng mặt Bá Kiến, phải đòi bằng được. Nó khiến cho những ai có lương tri đếu cảm thấy đau lòng, đều phải ưu tư. Những tưởng tâm trạng chua xót, bi thương và bế tắc ấy chỉ có ở Chí Phèo. Chí Phèo là một tên say rượu lởm khởm, suốt ngày vừa uống rượu vừa chửi, sống một cuộc đời ô nhục, thối tha, làm những điều tệ bạc. Nhưng rồi một ngày hắn muốn làm lại cuộc đời, muốn hòa nhập vào cộng đồng xã hội, muốn sống một cuộc sống bình thường. Nam Cao là một nhà văn hiện thực sâu sắc, thậm chí ông còn phê phán và khinh thường những câu chuyện tình mơ mộng hão huyền, yêu đương trên cái nền thối nát của xã hội phong kiến lúc bấy giờ. Những câu chuyện của ông đều mang tính 'nghệ thuật vị nhân sinh' và có chất hiện thực và triết lý hàng thế kỉ. Trong đó có 'Chí Phèo' câu chuyện đã làm nên tên tuổi của ông. 'Chí Phèo' đã khái quát một hiện tượng xã hội ở nông thôn Việt Nam trước năm 1945, một bộ phận nông dân lao động lương thiện bị đẩy vào con đường tha hóa, lưu manh hóa. Như nhân vật Chí Phèo bị oan và đẩy vào tù và trở thành người không ra người, ngợm không ra ngợm, xấu xí cả về nhân cách lẫn ngoại hình. Qua đó, nhà văn đã kết án đanh thép cái xã hội tàn bạo tàn phá cả thể xác và tâm hồn người nông dân lao động, đồng thời khẳng định bản chất lương thiện của họ, ngay trong khi họ bị vùi dập mất cả nhân hình, nhân tính. Chí Phèo đã hét lên đi đòi nợ Bá Kiến, đó là khi hắn đã khát khao một cuộc sống bình thường, một cuộc sống mà ngay khi gặp Thị Nở hắn nhớ đến. Đó là thời trẻ hắn cũng đã từng ước mơ một gia đình êm ấm, chồng cày cấy vợ chăm nhà. Nhưng giờ đây, hắn lại trở nên thế này. Ngay cả Thị Nở, người phụ nữ xấu nhất vùng cũng từ chối hắn. Cái xã hội mà ngay cả những ước mơ nhỏ bé của một đời người cũng không thể thành hiện thực, cái ước mơ được yên ổn đó thôi cũng không thể thì đó là một xã hội bất công và vô nhân đạo. Chí Phèo là một tác phẩm có giá trị hiện thực và giá trị nhân đạo sâu sắc, mới mẻ. Sau đó, vì bị cự tuyệt quyền làm người và nhận ra kẻ thù chính của cuộc đời mình là Bá Kiến, Chí Phèo đâm chết Bá Kiến và tự kết liễu cuộc đời mình. Cái chết của Chí Phèo rất quan trọng, vì nó đã nói lên sự bế tắc của người nông dân bị tha hóa trong xã hội u ắm, khiến chí rơi vào bước đường cùng. Khép lại 'Chí Phèo' đã để lại trong mình những bài học nhân sinh sâu sắc về quyền làm người và quyền sống.\
          -April\
        ", '1234555321123', authors[2], [genres[0],genres[1], genres[3], genres[4]], 'http://huyhoangbook.vn/wp-content/uploads/2018/01/605_131510594372136975_Chi-Pheo.jpg', 'https://tiki.vn/chi-pheo-p336162.html', callback);
        },
        function(callback) {
          bookCreate('The attack of the aqua apes', "The ghosts of Fear Street-- they'll haunt you forever! Do you believe in ghosts? Don't say no until you take a walk down Fear Street. Pat the woods-- where no birds sing. Past the lake-- where something lurks beneath the water. Past the cemetery-- where everyone is dying to meet you.\
          And be sure to say hello to Scott and Glen. They decided to use water from the Fear Street lake to grow their Aqua Apes. The creatures started out tiny and cute. But one kept growing, and growing, and growing... And its teeth kept getting sharper, and sharper, and sharper...\
          ", '1234555321123', authors[3], [genres[5], genres[6],], 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781442486195/the-attack-of-the-aqua-apes-9781442486195_hr.jpg', 'https://www.amazon.com/Attack-Aqua-Apes-Ghosts-Street-ebook/dp/B0098OHMTG', callback);
        },
        function(callback) {
          bookCreate('Nightmare in 3-D', "The ghosts of Fear Street -- they'll haunt you forever! Do you believe in ghosts? Don't say no until you take a walk down Fear Street. Past the woods -- where no birds sing. Past the lake -- where something lurks beneath the water. Past the cemetery -- where everyone is dying to meet you.\
          And take a peek in Sal's Five and Ten. He sells great stuff. Wes Parker bought a 3-D poster there. He spent hours trying to see the hidden picture. Then he wished he hadn't. Because the thing inside the poster saw Wes too. Now it wants out and it wants Wes.\
          ", '1234555321123', authors[3], [genres[5], genres[6]], 'https://images.gr-assets.com/books/1354496191l/656716.jpg', 'https://www.amazon.com/Nightmare-3-D-Ghosts-Fear-Street/dp/0671529447/ref=cm_cr_arp_d_product_top?ie=UTF8', callback);
        },
        function(callback) {
          bookCreate('How to be a vampire', "One morning, Andrew woke up undead. First there were the bite marks on his neck. Then he tried to eat garlic...yikes! And now he's got this weird urge to sleep upside down. Not that Andrew minds turning into a vampire. He'll be able to stay up all night, fly, and scare his sister silly. Cool! But then Andrew meets his vampire teacher, one really scary guy. Andrew isn't ready for a lesson on how to sleep in a coffin-- or how to drink blood! But does he have a choice?", '1234555321123', authors[3], [genres[5], genres[6]], 'https://images.gr-assets.com/books/1173467237l/293191.jpg', 'https://www.amazon.com/Vampire-R-L-Stines-Ghosts-Street/dp/1442427604', callback);
        },
        function(callback) {
          bookCreate('Harry Potter and the Prisoner of Azkaban', "This book is undoubtedly darker than the previous ones, as Harry learns more and more about the sinister forces that threaten the wizarding world. The characters begin to get more developed and more complex, and an awful lot more interesting. I must warn you though, that once you begin, you'll find it almost impossible to stop! Once you finish, you'll be skimming through it again, finding seemingly obvious clues, thinking 'How did I miss that?!'. If that wasn't enough to get you interested, the Harry Potter covers have recently been redesigned, and they are even more stunning than ever! The Prisoner of Azkaban cover is by far my favourite: Harry heroically brandishing a wand, from which a silver stag has erupted! To no one's surprise, I give Harry Potter and the Prisoner of Azkaban 5/5 stars!\
          - theguardian.com\
          ", '1234555321123', authors[1], [genres[2], genres[6]], 'https://hpmedia.bloomsbury.com/rep/s/9780747560777_309834.jpeg', 'https://www.amazon.com/gp/product/B0192CTMX2/ref=series_dp_rw_ca_3', callback);
        },
        function(callback) {
          bookCreate('Harry Potter and the Goblet of Fire', "I can never find a boring or uninteresting moment in The Goblet of Fire and I never get sick of reading it again and again as it's so easy to lose myself in Harry Potter with the astounding events and distinctive characters. I really like how Hermione Granger strives through in this book as not just a clever girl, but as a girl with passion and determination. I like her complex personality; normally she is typecasted into just being 'intelligent', but Hermione is shown with a more girly and emotive side in this book, giving her more depth than just being Harry's clever friend. She is well-rounded and is more accessible as a regular person (though a witch) with feelings and a personality.\
          Anyone who hasn't read up to The Goblet of Fire should definitely re-think that decision as this is the book where it all changes and it's then impossible to not continue reading the rest of the books.\
          The Goblet of Fire definitely deserves a 10/10 in my opinion.\
          - theguardian.com\
          ", '1234555321123', authors[1], [genres[2], genres[6]], 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a3/Goblet_of_Fire_New_Cover.jpg/revision/latest?cb=20170109054633', 'https://www.amazon.com/gp/product/B0192CTMUU/ref=series_dp_rw_ca_4', callback);
        },
        function(callback) {
          bookCreate('The War of the Worlds', "Each generation has adapted The War of the Worlds to reflect its own concerns; the approaching conflict in Europe in the late 1930s, the cold war in George Pal's 1953 film, and Spielberg's post-9/11 take on the tale. But in doing so they habitually overlook the key to enjoying Wells's book. Very much a comment on the ethics of the seemingly advanced Victorian world, he continually compares the Martians' acts of destruction to our own obliteration of indigenous animal and human populations in the name of 'progress'. There is a creeping sense, throughout the book, that perhaps humanity deserves this invasion and shouldn't think of itself as all-powerful. All of which makes it far more satisfying than a straight, pulpy, alien invasion drama – a true classic that has pointed the way not just for science-fiction writers, but for how we as a civilisation might think of ourselves.\
          - theguardian.com\
        ", '1234555321123', authors[4], [genres[7],], 'https://cdn.shopify.com/s/files/1/0726/9203/products/War-of-Worlds_1024x1024.jpg?v=1528394298', 'https://www.amazon.co.uk/War-Worlds-H-G-Wells/dp/1604502444', callback);
        },
        function(callback) {
          bookCreate('Gone With the Wind', "Scarlett O' Hara is a feisty teenage girl, with everything a girl could possibly want. Mamy to wait on her, a loving family, wealth, men begging to dance with her, good looks and a sixteen inch waist. So when she falls for handsome Ashley Wilkes, and the start of the civil war is announced, her world begins to fall apart. At a ball in Twelve Oaks, she meets Rhett Butler. He's extremely rich and arrogant with a reputation for being a rogue and she forms her opinion of him almost at once.\
          Then the war is announced and Scarlett's adventure begins. In order to make Ashley jealous, she marries Charles Hamilton. But after going away to fight the Yankees, Charles dies almost immediately. Although Scarlett is left a widow, she realises that she is going to have her first baby and, due to depression, she is sent to Atlanta. Scarlett's life then starts to change dramatically. Being a widow, she can only wear black, and must not talk to men. This makes life very hard for flirty sixteen-year-old Scarlett. Then the civil war really starts to become dangerous, and it is up to Scarlett to save herself.\
            - theguardian.com\
          ", '1234555321123', authors[5], [genres[3],], 'https://images-na.ssl-images-amazon.com/images/I/81fWm4C8vJL.jpg', 'https://www.amazon.com/Gone-Wind-Margaret-Mitchell/dp/B000GISOGS', callback);
        },
        function(callback) {
          bookCreate('The notebook', "Set amid the austere beauty of the North Carolina coast, The Notebook begins with the story of Noah Calhoun, a rural Southerner recently returned form the Second World War. Noah is restoring a plantation home to its former glory, and he is haunted by images of the beautiful girl he met fourteen years earlier, a girl he loved like no other. Unable to find her, yet unwilling to forget the summer they spent together, Noah is content to live with only memories...until she unexpectedly returns to his town to see him once again.\
          Like a puzzle within a puzzle, the story of Noah and Allie is just the beginning. As it unfolds, their tale miraculously becomes something different, with much higher stakes. The result is a deeply moving portrait of love itself, the tender moments and the fundamental changes that affect us all. It is a story of miracles and emotions that will stay with you forever.\
          -goodreads.com\
          ", '1234555321123', authors[6], [genres[3],], 'https://nicholassparks.com/wp-content/uploads/1996/07/201612-notebook.jpg', 'https://www.amazon.com/Notebook-Nicholas-Sparks/dp/0446605239', callback);
        },
        function(callback) {
          bookCreate('The silence of the lambs', "Plotlines surrounding the FBI and its special crime investigation units have become one of the most dry, dull and horribly overdone novel themes. The rush that once came with reading about the advanced technology that American law enforcement agencies used, and the classic confrontation between the villain and the protagonist while an armed and dangerous SWAT team wait nearby, has faded. The Silence of the Lambs stands alone in being, I personally believe, the only FBI-centred novel worth reading.\
          Clarice Starling, still doing her years at the training academy and a part of the Bureau's behavioural sciences unit, is called upon to participate in one of the goriest, strangest cases the Bureau has ever seen. She is sent to talk to Hannibal Lecter, an ex-psychologist who is currently residing in a high security mental asylum.\
          Lecter, having been sentenced to a whole life in an asylum due to his cannibalistic tendencies, establishes an odd sort of relationship with Starling. They work together, to track the movements and the thoughts of a fast-moving psychopath.\
          A strange partnership emerges as secrets from Starling's past are revealed. It isn't the fact that there's a man capable of murder on the loose that scares her, it's the man who's safe behind bars that does.\
            - theguardian.com\
          ", '1234555321123', authors[9], [genres[8],], 'https://images-na.ssl-images-amazon.com/images/I/81jpy6NRw2L.jpg', 'https://www.amazon.com/Silence-Lambs-Hannibal-Lecter/dp/0312924585', callback);
        },
        function(callback) {
          bookCreate('The Da Vinci Code', "What happens in The Da Vinci Code is ... alert readers will have noticed a delay in getting round to plot summary, but it takes time to force the face straight. Anyway, my lips are now level, so let's go. Art expert Jacques Sauniere is discovered murdered in the Louvre, having somehow found the strength in his last haemorrhaging moments to arrange his body in the shape of a famous artwork and leave a series of codes around the building.\
          These altruistic clues are interpreted by Robert Langdon, an American 'professor of religious symbology' who, by chance, is visiting Paris, and Sophie Neveu, a French 'cryptologist' who is the granddaughter of the artistic cadaver in the Louvre.\
          As they joust with authorial research - about the divine proportion in nature and the possibility that the Mona Lisa is a painting of Leonardo himself in drag - a thug from the secretive Catholic organisation Opus Dei, under orders from a sinister bishop, is also trying to understand the meaning of the imaginative corpse in the museum.\
          It all seems to be connected with the Priory of Sion, a secret society. Reading a book of this kind is rather like going to the doctor for the results of tests. You desperately want to know the outcome but have a sickening feeling about what it might prove to be. In this case, the answer was as bad as I'd feared.\
          - theguardian.com\
          ", '1234555321123', authors[7], [genres[8],], 'https://kbimages1-a.akamaihd.net/185e7463-9792-4728-8403-d91a6352d549/1200/1200/False/the-da-vinci-code-1.jpg', 'https://www.amazon.com/Vinci-Code-Robert-Langdon/dp/0307474275', callback);
        },
        function(callback) {
          bookCreate('A study in scarlet', "A Study in Scarlet is one of the weirder Sherlock Holmes stories – its strange final section, told in recollection by our murderer, is set in Mormon Utah – which perhaps is why it slipped by almost unnoticed when it was first published in Beeton's Christmas Annual in 1887. In this version, however, you feel its oddities rather less; graphic novel pages, unlike prose pages, can be turned pretty fast in any saggy bits, and Culbard and Edginton are adept at concision, leaving out nothing that is crucial and excising much that isn't. I relished every page and thought how this book would be the perfect primer for any child whose parents feel them to be just on the cusp of potential Holmes worship. Culbard and Edginton are now hard at work on The Sign of Four, in which Holmes, bored and restless, is in danger of abandoning himself entirely to his cocaine solution. Until, that is, the entreaty of a young governess piques his attention… I can't wait to see what they do with it.", '1234555321123', authors[8], [genres[9],], 'https://sffbookreview.files.wordpress.com/2012/10/sherlock-holmes.jpg', 'https://www.amazon.com/Study-Scarlet-Arthur-Conan-Doyle/dp/1599866749', callback);
        },
        
       

        // function(callback) {
        //   bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], 'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate('Test Book 2', 'review of test book 2', 'ISBN222222', authors[4], false, 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback)
        // },
        // function(callback) {
        //   bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
        // function(callback) {
        //   bookCreate('Test Book 1', 'review of test book 1', 'ISBN111111', authors[4], [genres[0],genres[1]], 'https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg', callback);
        // },
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



