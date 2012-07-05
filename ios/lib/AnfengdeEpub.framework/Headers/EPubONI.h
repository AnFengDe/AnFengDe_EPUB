//
//  EPubONI.h
//  Anfengde
//
//  Created by Kitty Wang on 12-6-6.
//  Copyright (c) 2012年 com.anfengde. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EpubMetadata.h"
#import "EpubChapter.h"

/// EPubONIDelegate protocol definition
@protocol EPubONIDelegate <NSObject>
@optional
+ (int)epubGetLastError;
+ (NSString *)epubGetMessage;

@end

@interface EPubONI : NSObject {
@private
    id      _delegate;
}

/// delegate object
@property (nonatomic, retain) id delegate;

/**
 * \brief  init the env
 * \param  cachePath the path of cache
 * \return  if success return AFD_EPUB_OK, else return error code
 */
+ (int)initEpubEnv:(NSString *)cachePath;
/**
 * \brief  open a book
 * \param  bookname the path of book
 * \return  if success return handle, else return error code
 */
+ (int)openEpubBook:(NSString *)bookname;
/**
 * \brief  get the book info
 * \param  metadata EpubMetadata instance
 * \param  handle the handle of the book
 * \return  if success return AFD_EPUB_OK, else return error code
 */
+ (int)getEpubMetadata:(EpubMetadata *)metadata Handle:(unsigned int)handle;
/**
 * \brief  get book root dir
 * \param  handle the handle of the book
 * \return  the cache path of the book
 */
+ (NSString *)getEpubBookRootFolder:(unsigned int)handle;
/**
 * \brief  get the number of the chapters
 * \param  handle the handle of the book
 * \return  the number of the chapters
 */
+ (unsigned int)getEpubChapterCount:(unsigned int)handle;
/**
 * \brief  get the chapter
 * \param  chapterList the mutable array used to storaged chapters
 * \param  handle the handle of current epub book
 * \return  the number of the chapters
 */
+ (unsigned int)getEpubChapter:(NSMutableArray *)chapterArray Handle:(unsigned int)handle;
/**
 * \brief  clean up this book's cache dir
 * \param  handle the handle of this book
 */
+ (void)cleanCache:(unsigned int)handle;
/**
 * \brief  close this book and clean its handle
 * \param  handle the handle of the book
 * \param  if success return EPUB_OK, else return error code
 */
+ (int)closeEpubBook:(unsigned int)handle;
/**
 * \brief  clean up the env
 */
+ (void)cleanUpEpubEnv;

@end
