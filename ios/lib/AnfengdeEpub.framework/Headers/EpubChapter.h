//
//  EpubChapter.h
//  AnReader
//
//  Created by Kitty Wang on 12-6-6.
//  Copyright (c) 2012年 com.anfengde. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EpubChapter : NSObject {
    NSString *title_;
    NSString *href_;    /*the relative path to book cache folder*/
    int level_;
}

@property (nonatomic, retain) NSString *title;
@property (nonatomic, retain) NSString *href;
@property (nonatomic, readwrite) int level;

@end
