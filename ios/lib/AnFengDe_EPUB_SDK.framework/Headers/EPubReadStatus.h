//
//  EPubReadStatus.h
//  EPUB_SDK
//
//  Created by xdjiang xdjiang on 10/9/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

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
