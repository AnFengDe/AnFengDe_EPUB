//
//  EPubBookMark.h
//  EPUB_SDK
//
//  Created by xdjiang xdjiang on 8/29/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EPubBookMark : NSObject{
@private
    int          chapter_index_;   //chapter index
    unsigned int create_time_;
    unsigned int access_time_;
    int          read_percent_;
    NSString     *identifier_;     //bookmark id
    NSString     *text_;           //bookmark text
}
/** chapter index*/
@property (nonatomic, readwrite) int chapter_index;
/** create time*/
@property (nonatomic, readwrite) unsigned int create_time;
/** access time*/
@property (nonatomic, readwrite) unsigned int access_time;
/** read percent*/
@property (nonatomic, readwrite) int read_percent;
/** identifier */
@property (nonatomic, retain) NSString *identifier;
/** text */
@property (nonatomic, retain) NSString *text;

@end
