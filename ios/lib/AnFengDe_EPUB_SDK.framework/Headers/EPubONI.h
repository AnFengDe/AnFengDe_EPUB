/*!
 * \author qqwang
 * \brief The epub ONI(Objectived C Native Interface) definition 
 * \file EPubONI.h
 * \version 1.0 
 * \date 2012-06-06
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import "EPubMetadata.h"
#import "EPubManifestItem.h"
#import "EPubSpine.h"
#import "EPubChapter.h"
#import "EPubSpine.h"
#import "EPubBookMark.h"
#import "EPubReadingStatus.h"

/// EPub ONI interface define
@interface EPubONI : NSObject {
    
}

/**
  Initialize the epub reading environment
  @param cachePath is the path of cache
  @returns AFD_EPUB_OK if success, else returns error code
 */
+ (int)initEPubEnv:(NSString *)cachePath;
/**
  Open a book
  @param bookname is the full path of book
  @returns if success returns the handle of this book, else returns 0,
           the specific error code can be obtained through epub_get_last_error function
 */
+ (int)openEPubBook:(NSString *)bookname;
/**
  Get the book metadata
  @param metadata is the instance of EPubMetadata
  @param handle is the handle of the book
  @returns AFD_EPUB_OK if success, else returns error code
 */
+ (int)getEPubMetadata:(EPubMetadata *)metadata Handle:(unsigned int)handle;
/**
  Get the number of manifest items
  @param handle is the handle of the book
  @returns the number of manifest items
 */
+ (int)getEPubManifestCount:(unsigned int)handle;
/**
  Get the book manifest
  @param manifest is the mutable array used to storaged manifest items
  @param handle is the handle of the book
  @returns AFD_EPUB_OK if success, else returns error code
 */
+ (int)getEPubManifest:(NSMutableArray *)manifest Handle:(unsigned int)handle;
/**
  Get the number of the spine items
  @param handle is the handle of the book
  @returns the number of the spine items
 */
+ (unsigned int)getEPubSpineCount:(unsigned int)handle;
/**
  Get the spine items
  @param spineArray is the mutable array used to storaged spine items
  @param handle is the handle of current epub book
  @returns the number of the spine items
 */
+ (unsigned int)getEPubSpine:(NSMutableArray *)spineArray Handle:(unsigned int)handle;
/**
  Get the number of the chapters
  @param handle is the handle of the book
  @returns the number of the chapters
 */
+ (unsigned int)getEPubChapterCount:(unsigned int)handle;
/**
 Get the table of chapters
 @param chapterArray is the mutable array used to storaged chapters
 @param handle the handle of current epub book
 @returns the number of the chapters
 */
+ (unsigned int)getEPubChapter:(NSMutableArray *)chapterArray Handle:(unsigned int)handle;
/**
 Get the book size of total chapters
 @param handle the handle of current epub book
 @returns the book size of total chapters
 */
+ (unsigned int)getEPubBookSize:(unsigned int)handle;
/**
 Get book mimetype
 @param handle is the handle of the book
 @returns the mimetype of the book
 */
+ (NSString *)getEPubMimetype:(unsigned int)handle;
/**
  Get book root dir
  @param handle is the handle of the book
  @returns the cache path of the book
 */
+ (NSString *)getEPubBookRootFolder:(unsigned int)handle;
/**
  Get epub cover image path
  @param  handle is the handle of this book
  @returns the full path of cover image or NULL
 */
+ (NSString *)getEPubCoverImage:(unsigned int)handle;
/**
 Get epub css path
 @param  handle is the handle of this book
 @returns the full path of css or NULL
 */
+ (NSString *)getEPubCSS:(unsigned int)handle;
/**
  Clean up this book's cache dir
  @param handle is the handle of this book
  @returns AFD_EPUB_OK if success, else returns error code
 */
+ (int)cleanEPubBookCache:(unsigned int)handle;
/**
  Close this book and clean its handle
  @param handle is the handle of the book
  @return AFD_EPUB_OK if success, else returns error code
 */
+ (int)closeEPubBook:(unsigned int)handle;
/**
  Clean up the env
 */
+ (void)cleanUpEPubEnv;

/**
 Get BookMark Count
 */
+ (unsigned int)getEPubBookMarkCount:(unsigned int)handle;

/**
 Get BookMark
 */ 
+ (unsigned int)getEPubBookMark:(NSMutableArray *)bookmarkArray Handle:(unsigned int)handle;

/**
 Add BookMark
 */
+ (int)addEPubBookMark:(EPubBookMark *)bookmark Handle:(unsigned int)handle;

/**
 Update BookMark
 */
+ (int)updateEPubBookMark:(EPubBookMark *)bookmark Handle:(unsigned int)handle;

/**
 Delete BookMark
 */
+ (int)deleteEPubBookMark:(EPubBookMark *)bookmark Handle:(unsigned int)handle;

/**
 get error message
 */
+ (NSString *)getErrorMessage:(unsigned int)errorcode;

/**
 get last error code
 */
+ (int)getLastError;

/**
 get last reading status(include last chapter and last percent)
 */
+ (unsigned int)getEPubReadingStatus:(EPubReadingStatus *)status Handle:(unsigned int)handle;

/**
 update last reading status(include last chapter and last percent)
 */
+ (unsigned int)updateEPubReadingStatus:(EPubReadingStatus *)status Handle:(unsigned int)handle;

/**
 check current opened book uncompress still work or not
 */
+ (int)isUnZipping;

@end
