/*!
 * \author qqwang
 * \brief The epub manifest item definition 
 * \file EPubManifestItem.h
 * \version 1.0 
 * \date 2012-07-27
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubManifestItem : NSObject {
@private
    NSString *identifier_;
    NSString *properties_;
    NSString *href_;
    NSString *mediaType_;
}

/** item id */
@property (nonatomic, retain) NSString *identifier;
/** item properties */
@property (nonatomic, retain) NSString *properties;
/** item href */
@property (nonatomic, retain) NSString *href;
/** item media-type */
@property (nonatomic, retain) NSString *mediaType;

@end
