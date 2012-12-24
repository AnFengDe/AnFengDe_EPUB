//
//  DBDriver.h
//  AnFengDe_EPUB_UI
//
//  Created by xdjiang xdjiang on 11/27/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "sqlite3.h"
#import "DBBooks.h"

@interface DBDriver : NSObject {
    sqlite3 *db;
    char *errorMsg;
}

- (BOOL) initDB;
- (void) closeDB;

- (BOOL)createTable;

- (NSMutableArray *) getAllBooks;
- (BOOL) addBook:(DBBooks *)book;
- (BOOL) deleteBook:(DBBooks *)book;
- (BOOL) deleteAllBook;
- (NSString*) sqliteEscape:(NSString *)src;
- (void) bookStrEscape:(DBBooks *)book;
@end
