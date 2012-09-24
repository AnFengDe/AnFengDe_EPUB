/*!
 * \author qqwang
 * \brief The epub book definition 
 * \file EPubBook.h
 * \version 1.0 
 * \date 2012-06-07
 * \copyright (c) 2012年 com.anfengde. All rights reserved.
 * */

#import <Foundation/Foundation.h>
#import <AnFengDe_EPUB_SDK/EPubSDKHeader.h>

/**
  EPubBook class
 */
@interface EPubBook : NSObject {
@private
    EPubMetadata    *metadata_;
    NSMutableArray *chapterArray_;
    
    NSString *category_;
    /** The last open unix time stamp of book */
    unsigned long *readRecord;
    NSString *epubFilePath_;
    NSString *cachePath_;
@public
    /** The index of current chapter in the book */
    NSUInteger currentChapterIndex;
    /** The bookSize */
    int bookSize_;
    /** The index of current page in current chapter */
    NSUInteger currentPageIndexInChapter;
}

/** The basic info of epub book */
@property (nonatomic, retain) EPubMetadata *metadata;
/** The array of book chapters */
@property (nonatomic, retain) NSMutableArray *chapterArray;
/** The category of book */
@property (nonatomic, retain) NSString *category;
/** The source file path of book */
@property (nonatomic, retain) NSString *epubFilepath;
/** The unzipped folder path of book */
@property (nonatomic, retain) NSString *cachePath;
/** The bookSize */
@property (nonatomic, readwrite) int bookSize;

/**
  Initialize a new EPubBook object
  @param path is the full path of the epub book
  @returns a newly initialized object
 */
- (id) initWithEPubPath:(NSString *)path;
/**
  Close and exit EPub reading
 */
+ (void) closeEPubReading;
/**
  Returns the directory of current app's Documents
  @returns the directory of current app's Documents
 */
+ (NSString*) applicationDocumentsDirectory;
@end
