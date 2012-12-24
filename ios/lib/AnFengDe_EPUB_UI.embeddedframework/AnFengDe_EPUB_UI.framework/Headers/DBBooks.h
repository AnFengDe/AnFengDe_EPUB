//
//  DBBooks.h
//  AnFengDe_EPUB_UI
//
//  Created by xdjiang xdjiang on 11/27/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DBBooks : NSObject
{
    NSString *identifier;
    NSString *name;
    NSString *author;
    NSString *coverimage;
    NSString *bookpath;
}

@property (nonatomic, retain) NSString *identifier;
@property (nonatomic, retain) NSString *name;
@property (nonatomic, retain) NSString *author;
@property (nonatomic, retain) NSString *coverimage;
@property (nonatomic, retain) NSString *bookpath;
@end
