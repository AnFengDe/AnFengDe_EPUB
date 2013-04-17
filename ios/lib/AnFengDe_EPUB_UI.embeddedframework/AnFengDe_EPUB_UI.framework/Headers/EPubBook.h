/*!
 * \author qqwang
 * \brief The epub book definition 
 * \file EPubBook.h
 * \version 1.0 
 * \date 2012-06-07
 * \copyright (c) 2012 com.anfengde. All rights reserved.
 * */

#import <Foundation/Foundation.h>
#import <AnFengDe_EPUB_SDK/EPubSDKHeader.h>

/**
  EPubBook class
 //todo:暂时不动基本设计，先读懂，然后重构，显然这个类通过handle可以获得书籍相关信息，有些成员变量是不必要的，可以直接从SDK中获取
 */
@interface EPubBook : NSObject {
@private
    EPubMetadata    *metadata_;
    NSMutableArray  *chapterArray_;
    NSString        *category_;
    unsigned long   *readRecord_;
    NSString        *epubBookPath_;
    NSString        *cachePath_;
    NSString        *coverImage_;
@public
    /** The index of current chapter in the book */
    NSUInteger      currentChapterIndex;
    int             current_percent;
    /** The bookSize */
    int             bookSize_;
    /** The index of current page in current chapter */
    NSUInteger      currentPageIndexInChapter;
    int             handle;
    NSString        *errorMsg;
}

/** The basic info of epub book */
@property (nonatomic, retain) EPubMetadata      *metadata;
/** The array of book chapters */
@property (nonatomic, retain) NSMutableArray    *chapterArray;
/** The category of book */
@property (nonatomic, retain) NSString          *category;
/** The last open unix time stamp of book */
@property (nonatomic, assign) unsigned long     readRecord;
/** The source file path of book */
@property (nonatomic, retain) NSString          *epubBookPath;
/** The unzipped folder path of book */
@property (nonatomic, retain) NSString          *cachePath;
/** The cover image path of book */
@property (nonatomic, retain) NSString          *coverImage;

/** The bookSize */
@property (nonatomic, readwrite) int            bookSize;
@property (nonatomic, readwrite) int            handle;
@property (nonatomic, retain) NSString          *errorMsg;

/**
  Initialize a new EPubBook object
  @param path is the full path of the epub book
  @returns a newly initialized object
 */
- (id) initWithEPubPath:(NSString *)path;
/**
  Close and exit EPub reading
 */
+ (void) cleanUpEPubEnv;
/**
 init EPub SDK Library
 */
+ (int) initEPubEnv:(NSString *)cachePath;
/**
  Returns the directory of current app's Documents
  @returns the directory of current app's Documents
 */
+ (NSString*) applicationDocumentsDirectory;

- (BOOL) openEPubBook;

@end
