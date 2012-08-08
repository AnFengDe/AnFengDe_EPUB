/*!
 * \author qqwang
 * \brief The epub rootfile definition.
 * \file EPubRootfile.h
 * \version 1.0 
 * \date 2012-06-06
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubRootfile : NSObject {
@private

    NSString *fullPath_;
    NSString *mediaType_;
}
/** full-path */
@property (nonatomic, retain) NSString *fullPath;
/** media-type, mostly like "application/oebps-package+xml" */
@property (nonatomic, retain) NSString *mediaType;

@end
