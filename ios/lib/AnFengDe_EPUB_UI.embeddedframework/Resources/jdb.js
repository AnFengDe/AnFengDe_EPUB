var db=null;
var bookArray=new Array();

//define book stuctor 
function Book()
{
    this.identifier = null;
    this.name = null;
    this.author = null;
    this.coverimage = null;
    this.bookpath = null;
}

function errorHandler(transaction, error)

{
    
    // error.message is a human-readable string.
    
    // error.code is a numeric error code
    
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
    
    
    // Handle errors here
    
    var we_think_this_error_is_fatal = true;
    
    if (we_think_this_error_is_fatal) return true;
    
    return false;
    
}

//this is a callback function, this function be called after get results from db
function insertBookArrary(transaction, results)
{
	alert("insertBookArrary");
    var len = results.rows.length, i;
    for (i = 0; i < len; i++){
        book = new Book();
        book.identifier = results.rows.item(i).identifier;
        book.name = results.rows.item(i).name;
        book.author = results.rows.item(i).author;
        book.coverimage = results.rows.item(i).coverimage;
        book.bookpath = results.rows.item(i).bookpath;
        alert("news:"+book.identifier);
        bookArray.push(book);
    }
}

//init database
function initDatabase() {
	try {
	    if (!window.openDatabase) {
	        alert('Databases are not supported in this browser.');
	        return;
	    } else {
	        var shortName = 'afd.sqlite';
	        var version = '1.0';
	        var displayName = 'AFD Database';
	        var maxSize = 1024*1024; //  bytes
	        db = openDatabase(shortName, version, displayName, maxSize);
			createTables();
	    }
	} catch(e) {
	    if (e == 2) {
	        // Version number mismatch.
	        console.log("Invalid database version.");
	    } else {
	        console.log("Unknown error "+e+".");
	    }
	    return;
	}
}

//create tables
function createTables()
{
	alert("createTables");
    if(db == null)
    {
        alert('Databases are not supported in this browser.');
        return; 
    }
    db.transaction(function (tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS books  (identifier VARCHAR PRIMARY KEY  NOT NULL  UNIQUE , name VARCHAR NOT NULL , author VARCHAR, coverimage VARCHAR, bookpath VARCHAR NOT NULL )');
                   });
}

//get books from books table
function getBooksFromDB()
{
	alert("getBooksFromDB");
    bookArray=[];
    if(db == null)
    {
        alert('Databases are not supported in this browser.');
        return 0;
    }
    db.transaction(function (tx) {
                   tx.executeSql('SELECT * FROM books', [], 
                		   insertBookArrary,
                		   errorHandler);
                   });
}

//insert an new book to books table
function insertBookToDB(book)
{
	alert("insertBookToDB");
    if(db == null)
    {
        alert('Databases are not supported in this browser.');
        return; 
    }
    db.transaction(function (tx) {
                   tx.executeSql(('INSERT INTO books VALUES (?,?,?,?,?);'), [book.identifier,book.name,book.author,book.coverimage,book.bookpath],
                		   null,
                		   errorHandler); 
                   });
}

function deleteBookfromDB(book)
{
	alert("deleteBookfromDB");
    if(db == null)
    {
        alert('Databases are not supported in this browser.');
        return; 
    }
    db.transaction(function (tx) {
                   tx.executeSql(('DELETE FROM books where identifier=(?);'), [book.identifier],
                		   null,
                		   errorHandler); 
                   });
    
}

//$(document).ready(function(){
//	              initDatabase();
//                  book = new Book()
//                  book.identifier='311111';
//                  book.name = '22222';
//                  book.author = '33333';
//                  book.coverimage = '44444';
//                  book.bookpath='55555';
//                  //deleteBookfromDB(book);
//                  insertBookToDB(book);
//                  getBooksFromDB();
//                  });
