/*!
 * \author xdjiang
 * \brief The database driver definition
 * \file DBDriver.h
 * \version 1.0
 * \date 2012-11-27
 * \copyright (c) 2012 com.anfengde. All rights reserved.
 * */

#import "sqlite3.h"
#import "DBBooks.h"

/**
 \brief The database interface
 */
@interface DBDriver : NSObject {
    /** the sqlite */
    sqlite3 *db;
    /** the error msg */
    char *errorMsg;
}

/** init db, if fail return NO */
- (BOOL) initDB;
/** close db */
- (void) closeDB;

/** create book table */
- (BOOL)createTable;

/** get all books info */
- (NSMutableArray *) getAllBooks;

/** add book info */
- (BOOL) addBook:(DBBooks *)book;
/** delete book info */
- (BOOL) deleteBook:(DBBooks *)book;
/** delete all books info */
- (BOOL) deleteAllBook;
@end
