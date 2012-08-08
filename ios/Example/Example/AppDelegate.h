//
//  AppDelegate.h
//  Example
//
//  Created by kitty on 12-8-1.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AnFengDe_EPUB_UI/EPubUIHeader.h>

@class EPubRootViewController;

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
 
@property (strong, nonatomic) EPubRootViewController *rootEpubView;

@end
