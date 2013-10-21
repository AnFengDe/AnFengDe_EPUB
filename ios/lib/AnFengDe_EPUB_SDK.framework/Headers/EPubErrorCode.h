//
//  EPubErrorCode.h
//  Anfengde
//
//  Created by Kitty Wang on 12-7-3.
//  Copyright (c) 2012年 com.anfengde. All rights reserved.
//

#ifndef AnFengDe_EPubErrorCode_h
#define AnFengDe_EPubErrorCode_h

//------------------------------------------------------------------
// EPUB ERROR DEFINE
//------------------------------------------------------------------
#define AFD_EPUB_OK                     1
#define AFD_EPUB_NG                     0

#define AFD_EPUB_ERR_INIT_REPEAT        -2
#define AFD_EPUB_ERR_NULL_PATH          -3
#define AFD_EPUB_ERR_CREATE_CACHE_DIR   -4
#define AFD_EPUB_ERR_ACCESS_DIR         -5
#define AFD_EPUB_ERR_ACCESS_FILE        -6

#define AFD_EPUB_ERR_CORRUPTED_FILE     -7
#define AFD_EPUB_ERR_READ_FILE_LIST     -8
#define AFD_EPUB_ERR_OPEN_EPUB_FILE     -9
#define AFD_EPUB_ERR_GET_FILE_INFO      -10
#define AFD_EPUB_ERR_READ_EPUB_FILE     -11
#define AFD_EPUB_ERR_PARSE_MIMETYPE     -12
#define AFD_EPUB_ERR_PARSE_CONTAINER    -13
#define AFD_EPUB_ERR_PARSE_METADATA		-14
#define AFD_EPUB_ERR_PARSE_MANIFEST     -15
#define AFD_EPUB_ERR_PARSE_SPINE        -16
#define AFD_EPUB_ERR_PARSE_TOC			-17

#define AFD_EPUB_ERR_HANDLE_LIST_NULL   -18
#define AFD_EPUB_ERR_INVALID_HANDLE		-19
#define AFD_EPUB_ERR_DEL_HANDLE			-20

#define AFD_EPUB_ERR_LONG_PATH		    -21
#define AFD_EPUB_ERR_DEL_FILE		    -22
#define AFD_EPUB_ERR_GET_CACHE_BOOK     -23
#define AFD_EPUB_ERR_UNZIP_FILE			-24
#define AFD_EPUB_ERR_GET_CHAPTER_SIZE   -25

#define AFD_EPUB_ERR_PARSE_BOOKMARK		-26
#define AFD_EPUB_ERR_NO_READING_DATA_FILE	-27
#define AFD_EPUB_ERR_CHAPTER_NULL       -28
#define AFD_EPUB_ERR_UNZIP_BUSY         -29
#define AFD_EPUB_CHECK_SPACE_FAILED     -30
#define AFD_EPUB_LACK_OF_SPACE          -31
#endif
