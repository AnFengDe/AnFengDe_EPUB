//
//  ViewController.m
//  example
//
//  Created by kitty on 12-7-3.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import "ViewController.h"
#import <AnFengDe_EPUB_SDK/EPubSDKHeader.h>

@interface ViewController() 
- (void)changeAdImage;
@end

@implementation ViewController
@synthesize myTableView;
@synthesize btn_cleanUp, btn_initEpub, btn_openEpub, btn_closeEpub, btn_cleanCache, btn_getChapter, btn_getMetadata, btn_getRootFolder, btn_getChapterCount, btn_img;
@synthesize array;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:(5.0) target:self selector:@selector(changeAdImage) userInfo:nil repeats:YES];
    [timer fire];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return NO;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return [array count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    
    // Configure the cell...
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier];
    }

    cell.textLabel.text = [array objectAtIndex:indexPath.row];
    return cell;
}


#pragma mark - Buttom Click

- (IBAction)btn_initEpubClick {
    array = [[NSMutableArray alloc] init];
    
    /*the path which will save the cache files*/
    NSString *cachePath = [NSString stringWithFormat:@"%@/Cache", [self applicationDocumentsDirectory]];
    int ret = [EPubONI initEPubEnv:cachePath];
    if (ret == AFD_EPUB_OK) {
        [array addObject:@"init successed."];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", ret]];
    [self.myTableView reloadData];
}

- (IBAction)btn_openEpubClick {
    array = [[NSMutableArray alloc] init];
    
    /*the path should be the full path of this epub file*/
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        [array addObject:@"open successed."];
        [array addObject:[NSString stringWithFormat:@"handle is %d", ret]];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_getMetadataClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        EPubMetadata *tmp = [[EPubMetadata alloc] init];
        [EPubONI getEPubMetadata:tmp Handle:ret];
        if (tmp) {
            [array addObject:tmp.identifier];
            [array addObject:tmp.version];
            [array addObject:tmp.title];
            [array addObject:tmp.creator];
            /* ... other infos */
        }
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_getRootFolderClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        [array addObject:[EPubONI getEPubBookRootFolder:ret]];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_getChapterCountClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        [array addObject:[NSString stringWithFormat:@"%d", [EPubONI getEPubChapterCount:ret]]];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_getChapterClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        NSMutableArray *tmp = [[NSMutableArray alloc] init];
        [EPubONI getEPubChapter:tmp Handle:ret];
        int count = 0, count2 = 0;
        for (int i = 0; i < [tmp count]; i++) {
            EPubChapter *chapter = [tmp objectAtIndex:i];
            if (chapter.level == 1) {
                count ++;
                [array addObject:[NSString stringWithFormat:@"%d.%@",count,  chapter.title]];
                count2 = 0;
            }
            else if (chapter.level == 2) {
                count2++;
                [array addObject:[NSString stringWithFormat:@"    %d.%@",count2,  chapter.title]];
            }
        }
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];

}

- (IBAction)btn_cleanCacheClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        [EPubONI cleanEPubBookCache:ret];
        [array addObject:@"clean this book's cache."];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_closeEpubClick { 
    array = [[NSMutableArray alloc] init];
    
    NSString *bundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *epubFilePath = [bundlePath stringByAppendingString:@"/testBook.epub"];
    NSLog(@"epubFilePath:%@",epubFilePath);
    int ret = [EPubONI openEPubBook:epubFilePath];
    if (ret != 0) {
        [EPubONI closeEPubBook:ret];
        [array addObject:@"close this book."];
    }
    else 
        [array addObject:[NSString stringWithFormat:@"error code is %d", [EPubONI getLastError]]];
    [self.myTableView reloadData];
}

- (IBAction)btn_cleanUpClick { 
    array = [[NSMutableArray alloc] init];
    [EPubONI cleanUpEPubEnv];
    [array addObject:@"clean up the epub env."];
    [self.myTableView reloadData];
}

BOOL changed = NO;
- (void)changeAdImage {
    if (changed) 
        [btn_img setBackgroundImage:[UIImage imageNamed:@"ad2.png"] forState:UIButtonTypeCustom];
    else
        [btn_img setBackgroundImage:[UIImage imageNamed:@"ad.png"] forState:UIButtonTypeCustom];
    changed = !changed;
}

- (IBAction)jumpToWebsite {
    NSURL *url = [NSURL URLWithString:@"http://epub.anfengde.com"];
    if (![[UIApplication sharedApplication] openURL:url])
        NSLog(@"%@%@",@"Failed to open url:",[url description]);
}

- (NSString *) applicationDocumentsDirectory {
    return [NSString stringWithFormat: @"%@",
            [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex: 0]];
}

@end
