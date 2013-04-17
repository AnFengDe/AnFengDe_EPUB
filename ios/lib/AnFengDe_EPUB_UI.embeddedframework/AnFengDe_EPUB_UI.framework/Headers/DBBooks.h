/*!
 * \author xdjiang
 * \brief The database book table definition
 * \file DBBooks.h
 * \version 1.0
 * \date 2012-11-27
 * \copyright (c) 2012 com.anfengde. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface DBBooks : NSObject
{
    /// book identifier
    NSString *identifier;
    /// book name
    NSString *name;
    /// book author
    NSString *author;
    /// book coverimage path
    NSString *coverimage;
    /// book path
    NSString *bookpath;
}
@property (nonatomic, retain) NSString *identifier;
@property (nonatomic, retain) NSString *name;
@property (nonatomic, retain) NSString *author;
@property (nonatomic, retain) NSString *coverimage;
@property (nonatomic, retain) NSString *bookpath;
@end
