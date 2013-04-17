/*!
 * \author qqwang
 * \brief The epub root view definition 
 * \file EPubRootViewController.h
 * \version 1.0 
 * \date 2012-07-06
 * \copyright (c) 2012 com.anfengde. All rights reserved.
 * */

#import <UIKit/UIKit.h>
#import "EPubBook.h"
#import "GADBannerViewDelegate.h"
#import "MongooseDaemon.h"

#define ERROR_FATAL 0
#define INFO        1

#define DOWNLOAD_ERROR_INFO @"Download Error!"
#define DOWNLOAD_INFO       @"Download Success!"

#define DEFAULT_COVERIMG    @"../image/afd_coverimg.png"

@class GADBannerView, GADRequest;
@class EPubContentsViewController;

@interface EPubRootViewController : UIViewController <UIWebViewDelegate, UIGestureRecognizerDelegate,GADBannerViewDelegate>{
    /// Google Ad banner view pointer
    GADBannerView   *pAdBanner_;
    /// epub book pointer
    EPubBook        *epubBook;
    int             currentPageNum;
    int             totalPages;
    int             pIndex;
    int             sIndex;
    int             cIndex;
    int             lastBookNum;
    NSString        *clickBk;
    NSURLRequest	*downloadRequest;
	NSURLConnection	*downloadConnection;
    NSString        *saveEPubBookPath;
    float			bytesReceived;
	long long		expectedBytes;
    Boolean         downloadCancel;
    Boolean         isDownloading;
    MongooseDaemon  *mongooseDaemon;
    NSString        *lastBookPath;
@private
    UIWebView *afd_webView;
}

/** The current reading book */
@property (nonatomic, retain) EPubBook *epubBook;
@property (nonatomic, retain) GADBannerView *pAdBanner;
@property (nonatomic, readwrite) int currentPageNum;
@property (nonatomic, readwrite) int totalPages;
@property (nonatomic, readwrite) int pIndex;
@property (nonatomic, readwrite) int sIndex;
@property (nonatomic, readwrite) int cIndex;
@property (nonatomic, readwrite) int lastBookNum;
@property (nonatomic, retain) NSString *clickBk;
@property (nonatomic, readonly, retain) NSURLRequest* downloadRequest;
@property (nonatomic, readonly, retain) NSURLConnection* downloadConnection;
@property (nonatomic, retain) NSString *saveEPubBookPath;
@property (nonatomic, retain) NSString *downloadUrl;
@property (nonatomic, retain) MongooseDaemon *mongooseDaemon;
@property (nonatomic, retain) NSString *lastBookPath;

/**
 \brief Initialize with new nib file
 \param nibNameOrNil the name of nib file
 \param nibBundleOrNil the name of bundle
 \returns a newly initialize object
 */
- (id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil;

- (void)openBookFromSafari:(NSURL *)epubBookPath;

@end
