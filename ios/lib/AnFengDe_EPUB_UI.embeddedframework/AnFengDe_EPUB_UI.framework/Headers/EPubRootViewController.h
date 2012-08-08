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

@class EPubContentsViewController;

@interface EPubRootViewController : UIViewController <UIWebViewDelegate, UIGestureRecognizerDelegate>{
    EPubBook *epubBook;
    UIWebView *afd_webView;
    UIView *afd_topMenu;
    UIButton *afd_backBtn;
    UIButton *afd_tableContentsBtn;
    UIButton *afd_fontSizeBtn;
    UILabel *afd_bookTitle;
    UIButton *afd_zoomOutBtn;
    UIButton *afd_zoomInBtn;
/** Judge whether had loaded the top menu */
    BOOL loadedToolbar;
/** Judge whether had loaded current View */
    BOOL loadedView;
/** the current font size of the text */
    NSUInteger textFontSize;
@private
    NSMutableArray *customRootConfig_;
}

/** The current reading book */
@property (nonatomic, retain) EPubBook *epubBook;
/** The webView to dispaly the book */
@property (nonatomic, retain) IBOutlet UIWebView *afd_webView;
/** The top menu of View */
@property (nonatomic, retain) IBOutlet UIView *afd_topMenu;
/** The button to back from the current View */
@property (nonatomic, retain) IBOutlet UIButton *afd_backBtn;
/** The button to load the table of contents */
@property (nonatomic, retain) IBOutlet UIButton *afd_tableContentsBtn;
/** current book title */

@property (nonatomic, retain) IBOutlet UILabel *afd_bookTitle;
/** The button to display two zoom buttons */
@property (nonatomic, retain) IBOutlet UIButton *afd_fontSizeBtn;
/** The button to zoom out the text font */
@property (nonatomic, retain) IBOutlet UIButton *afd_zoomOutBtn;
/** The button to zoom in the text font */
@property (nonatomic, retain) IBOutlet UIButton *afd_zoomInBtn;

@property (strong, nonatomic) EPubContentsViewController *contentsViewController;
@property (nonatomic, readonly) NSMutableArray *customRootConfig;

/**
  Initialize a new nib file
  @param nibNameOrNil is the name of nib
  @param nibBundleOrNil is the name of bundle
  @param bookPath is the full path of current book
  @returns a newly initialize object
 */
- (id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil epubBookPath:(NSString *)bookPath;
/**
  Save the custom configuration
 */
- (void) saveEPubRootViewConfiguration;
/**
 Reset the configuration of EPub Root View
 */
- (void) resetEPubRootViewDefaultConfiguration;

/**
 set the top menu's background image
 @param name is the full path of image
 */
- (void) setTopMenuBackgroundImage:(NSString *)name;
/**
 set "back" button image
 @param name is the full path of image
 */
- (void) setBackBtnBackgroundImage:(NSString *)name;
/**
 set "table of contents" button iamge
 @param name is the full path of image
 */
- (void) setTableContentsBtnBackgroundImage:(NSString *)name;
/**
 set the font color of book title
 @param color is the custom color
 */
- (void) setBookTitleFontColor:(UIColor *)color;
/**
 set the font type of book title
 @param fontType is the type of font supported by iOS or your device
 */
- (void) setBookTitleFontType:(NSString *)fontType;
/**
 set the font size of book title
 @param fontSize is the custom size of font
 */
- (void) setBookTitleFontSize:(CGFloat)fontSize;
/**
 set book title visible or invisible
 @param hidden is YES(visible) or NO(invisible)
 */
- (void) setBookTitleHidden:(BOOL)hidden;
/**
 set "fontSize" button image
 @param name is the full path of image
 */
- (void) setFontSizeBtnBackgroundImage:(NSString *)name;

/**
 set "table of contents" menu's background image
 @param name is the full path of image
 */
- (void) setTableContentsMenuBackgroundImage:(NSString *)name;
/**
 set "table of contents" tableView's background image
 @param name is the full path of image
 */
- (void) setTableContentsViewBackgroundImage:(NSString *)name;
/**
 set "continue reading" button image
 @param name is the full path of image
 */
- (void) setContinueReadingBtnBackgroundImage:(NSString *)name;
/**
 set the font color of chapter title
 @param color is the custom color
 */
- (void) setChapterTitleFontColor:(UIColor *)color;
/**
 set the font type of chapter title
 @param fontType is the type of font supported by iOS or your devicethe custom color
 */
- (void) setChapterTitleFontType:(NSString *)fontType;
/**
 set the font sizze of chapter title
 @param fontSize is the custom size of font
 */
- (void) setChapterTitleFontSize:(CGFloat)fontSize;

@end
