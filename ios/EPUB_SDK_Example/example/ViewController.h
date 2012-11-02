//
//  ViewController.h
//  example
//
//  Created by kitty on 12-7-3.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController {
    UITableView *myTableView;
    NSMutableArray *array;
    
    UIButton *btn_initEpub;
    UIButton *btn_openEpub;
    UIButton *btn_getMetadata;
    UIButton *btn_getRootFolder;
    UIButton *btn_getChapterCount;
    UIButton *btn_getChapter;
    UIButton *btn_cleanCache;
    UIButton *btn_closeEpub;
    UIButton *btn_cleanUp; 
    UIButton *btn_img;
}

@property (nonatomic, retain) IBOutlet UITableView *myTableView;
@property (nonatomic, retain) NSMutableArray *array;

@property (nonatomic, retain) IBOutlet UIButton *btn_initEpub;
@property (nonatomic, retain) IBOutlet UIButton *btn_openEpub;
@property (nonatomic, retain) IBOutlet UIButton *btn_getMetadata;
@property (nonatomic, retain) IBOutlet UIButton *btn_getRootFolder;
@property (nonatomic, retain) IBOutlet UIButton *btn_getChapterCount;
@property (nonatomic, retain) IBOutlet UIButton *btn_getChapter;
@property (nonatomic, retain) IBOutlet UIButton *btn_cleanCache;
@property (nonatomic, retain) IBOutlet UIButton *btn_closeEpub;
@property (nonatomic, retain) IBOutlet UIButton *btn_cleanUp;

@property (nonatomic, retain) IBOutlet UIButton *btn_img;

- (IBAction)btn_initEpubClick;
- (IBAction)btn_openEpubClick;
- (IBAction)btn_getMetadataClick;
- (IBAction)btn_getRootFolderClick;
- (IBAction)btn_getChapterCountClick;
- (IBAction)btn_getChapterClick;
- (IBAction)btn_cleanCacheClick;
- (IBAction)btn_closeEpubClick;
- (IBAction)btn_cleanUpClick;

- (IBAction)jumpToWebsite;
- (NSString *) applicationDocumentsDirectory;

@end
