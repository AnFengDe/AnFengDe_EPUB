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

#define AFD_EPUB_ERR_PARSE_MIMETYPE	    -12
#define AFD_EPUB_ERR_ACCESS_OPF         -13
#define AFD_EPUB_ERR_PARSE_CONTAINER    -14
#define AFD_EPUB_ERR_PARSE_METADATA		-15
#define AFD_EPUB_ERR_PARSE_MANIFEST     -16
#define AFD_EPUB_ERR_PARSE_SPINE        -17
#define AFD_EPUB_ERR_PARSE_TOC			-18

#define AFD_EPUB_ERR_HANDLE_LIST_NULL   -19
#define AFD_EPUB_ERR_CHECK_HANDLE		-20
#define AFD_EPUB_ERR_DEL_HANDLE			-21
#define AFD_EPUB_ERR_INVALID_HANDLE     -22

#define AFD_EPUB_ERR_LONG_PATH		    -23
#define AFD_EPUB_ERR_DEL_FILE		    -24
#define AFD_EPUB_ERR_GET_CACHE_BOOK     -25
#define AFD_EPUB_ERR_UNZIP_FILE			-26

#endif
