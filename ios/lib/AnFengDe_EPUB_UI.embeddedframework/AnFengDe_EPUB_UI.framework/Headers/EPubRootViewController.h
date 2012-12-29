/*!
 * \author qqwang
 * \brief The epub root view definition 
 * \file EPubRootViewController.h
 * \version 1.0 
 * \date 2012-07-06
 * \copyright (c) 2012年 com.anfengde. All rights reserved.
 * */

#import <UIKit/UIKit.h>
#import "EPubBook.h"
#import "DBBooks.h"
#import "GADBannerViewDelegate.h"

#define ERROR_FATAL  0
#define ERROR_INFO   1

#define DOWNLOAD_ERROR_INFO @"Download Error!"
#define DOWNLOAD_INFO @"Download Success!"

#define DEFAULT_COVERIMG @"../image/afd_coverimg.png"

@class GADBannerView, GADRequest;
@class EPubContentsViewController;

@interface EPubRootViewController : UIViewController <UIWebViewDelegate, UIGestureRecognizerDelegate,GADBannerViewDelegate>{
    GADBannerView *adBanner_;
    EPubBook *epubBook;
    int currentPageNum;
    int totalPages;
    int pIndex;
    int sIndex;
    int cIndex;
    int lastBookNum;
    NSString *urlPrefix;
    NSString *clickBk;
//    NSMutableArray *bookArray;

@private
    UIWebView *afd_webView;
}

/** The current reading book */
@property (nonatomic, retain) EPubBook *epubBook;
@property (nonatomic, retain) GADBannerView *adBanner;
@property (nonatomic, readwrite) int currentPageNum;
@property (nonatomic, readwrite) int totalPages;
@property (nonatomic, readwrite) int pIndex;
@property (nonatomic, readwrite) int sIndex;
@property (nonatomic, readwrite) int cIndex;
@property (nonatomic, readwrite) int lastBookNum;
@property (nonatomic, retain) NSString *urlPrefix;
@property (nonatomic, retain) NSString *clickBk;
//@property (nonatomic, retain) NSMutableArray *bookArray;


- (GADRequest *)createRequest;

/**
  Initialize a new nib file
  @param nibNameOrNil is the name of nib
  @param nibBundleOrNil is the name of bundle
  @returns a newly initialize object
 */
- (id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil;
/** 
 Open chapter 
 @param chapterPath is the chapter path
 */
- (void)openChapter:(NSString*)chapterPath;
/** Inject js to html when open a link */
- (NSString*)openURL;
/** Save the reading status */
- (void)saveReadStatus;
/** Read the reading status */
- (void)readStatusData;
/** Write js and css to device */
- (void) writeJS:(NSString*)fileName type:(NSString*)type folder:(NSString*)folder;
/** Return html content with js and css */
- (NSString*) urlContent:(NSString*)htmlContent;
/** show error message */
- (void) showErrorCode:(NSString*)errorMes type:(int)type;
- (void)resizePage;
- (void)openBook:(NSString *)epubBookPath;
- (void)openBookshelf;
- (void)jump:(NSArray*)components;
- (BOOL)importBook:(NSString*)epubBookPath;
- (void)getBooksFromDB;
- (void)deleteBooks:(NSArray*)bookIdArray;
- (void)createBookself;
- (void)errorMessage:(int)ret;
- (NSString*)downloadFiles:(NSString*)urlPath;
- (NSString *) jsStringEscape:(NSString *)src;
- (void) bookStrEscape:(DBBooks *)book;
@end
