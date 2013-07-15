/*!
 * \author qqwang
 * \author chtian
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

/// default cover image
#define DEFAULT_COVERIMG    @"../image/afd_coverimg.png"

@class GADBannerView, GADRequest;
@class EPubContentsViewController;

@interface EPubRootViewController : UIViewController <UIWebViewDelegate, UIGestureRecognizerDelegate,GADBannerViewDelegate>{
    /// Google Ad banner view pointer
    GADBannerView   *pAdBanner_;
    /// epub book pointer
    EPubBook        *epubBook;
    ///current page number
    int             currentPageNum;
    /// total pages
    int             totalPages;
    /// TODO:什么意思
    int             pIndex;
    /// TODO:什么意思
    int             sIndex;
    /// TODO:什么意思
    int             cIndex;
    /// TODO:什么意思?这个变量根本就没有用
    int             lastBookNum;
    /// TODO:点击了返回按钮
    NSString        *clickBk;
    /// download request
    NSURLRequest	*downloadRequest;
    /// download connection
	NSURLConnection	*downloadConnection;
    /// epub book save path
    NSString        *saveEPubBookPath;
    /// download received bytes  todo:有必要吗
    float			bytesReceived;
    /// the expected bytes for download
	long long		expectedBytes;
    /// the download operation cancel flag
    Boolean         downloadCancel;
    /// the flag of downloading
    Boolean         isDownloading;
    /// simple http server daemon
    MongooseDaemon  *mongooseDaemon;
    /// TODO: 有必要吗?
    NSString        *lastBookPath;
    Boolean         displayAd;
    NSString        *adUnitId;
    Boolean         allowToModifyAd;
@private
    /// book main view
    UIWebView       *afd_webView;
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

/**
 \brief open epub book from Safari browser when downloaded
 \param epubBookPath the epub book path
 */
- (void)openBookFromSafari:(NSURL *)epubBookPath;
/**
 \brief customize AdMob
 \param display display the Admob or not
 \param adId the Admob adUnitId
 */
- (void)customizeAdMob:(Boolean)display adUnitId:(NSString*)adId;
@end
