//
//  AppDelegate.h
//  Example
//
//  Created by kitty on 12-8-1.
//  Copyright (c) 2012年 HeFei AnFengDe Info Ltd.. All rights reserved.
//
//TODO:本测试代码如果是做功能测试，应该在AnReader中体现，如果是JS测试，只要一个壳子，其中跑传统QUnit测试代码就行
#import <UIKit/UIKit.h>
#import <AnFengDe_EPUB_UI/EPubUIHeader.h>

@class EPubRootViewController;

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
 
@property (strong, nonatomic) EPubRootViewController *rootEpubView;

@end
