/*!
 * \author xdjiang
 * \brief The epub read status definition 
 * \file EPubReadStatus.h
 * \version 1.0 
 * \date 2012-10-9
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubReadStatus : NSObject {
@private
    int          current_chapter_;   //chapter index
    int          current_percent_;
}
/** chapter index*/
@property (nonatomic, readwrite) int current_chapter;
/** read percent*/
@property (nonatomic, readwrite) int current_percent;

@end
