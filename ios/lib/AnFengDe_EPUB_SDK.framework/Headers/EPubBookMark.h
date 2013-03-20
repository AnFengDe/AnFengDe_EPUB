/*!
 * \author xdjiang
 * \brief The epub bookmark definition 
 * \file EPubBookMark.h
 * \version 1.0 
 * \date 2012-08-29
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

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
