/*!
 * \author qqwang
 * \brief The epub spine item definition 
 * \file EPubSpine.h
 * \version 1.0 
 * \date 2012-07-28
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubSpine : NSObject {
@private
    NSString *idref_;
    NSString *linear_;
}

/** itemref idref */
@property (nonatomic, retain) NSString *idref;
/** itemref linear */
@property (nonatomic, retain) NSString *linear;

@end
