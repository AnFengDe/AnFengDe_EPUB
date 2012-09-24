/*!
 * \author qqwang
 * \brief The epub chapter definition 
 * \file EPubChapter.h
 * \version 1.0 
 * \date 2012-06-06
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubChapter : NSObject {
@private
    NSString *title_;
    NSString *href_;
    int size_;
    int level_;
}

/** chapter title */
@property (nonatomic, retain) NSString *title;
/** chapter href */
@property (nonatomic, retain) NSString *href;
/** the size of chapter */
@property (nonatomic, readwrite) int csize;
/** the level of chapter */
@property (nonatomic, readwrite) int level;

@end
