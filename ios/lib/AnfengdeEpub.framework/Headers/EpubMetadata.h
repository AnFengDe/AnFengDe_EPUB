//
//  EpubMetadata.h
//  AnReader
//
//  Created by Kitty Wang on 12-6-6.
//  Copyright (c) 2012年 com.anfengde. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EpubMetadata : NSObject {
@private
    NSString *identifier_;      /*unique ID*/
    NSString *title_;           /*book title*/
    NSString *language_;        /*book language*/
    NSString *version_;         /*book version*/
    NSString *creator_;         /*book author*/
	
	// -----the optional value----
    NSString *contributor_;
    NSString *date_;
    NSString *source_;
    NSString *type_;
    NSString *description_;     /*book description*/
    NSString *format_;
    NSString *publisher_;       /*book publisher*/
    NSString *relation_;
    NSString *rights_;
    NSString *subject_;
	
	// ---------manifest value-----------
    NSString *tocFile_;         /*tocfile relative path*/
    NSString *coverImage_;      /*coverImage relative path*/
}

@property (nonatomic, retain) NSString *identifier;
@property (nonatomic, retain) NSString *title;
@property (nonatomic, retain) NSString *language;
@property (nonatomic, retain) NSString *version;
@property (nonatomic, retain) NSString *creator;

@property (nonatomic, retain) NSString *contributor;
@property (nonatomic, retain) NSString *date;
@property (nonatomic, retain) NSString *source;
@property (nonatomic, retain) NSString *type;
@property (nonatomic, retain) NSString *description;
@property (nonatomic, retain) NSString *format;
@property (nonatomic, retain) NSString *publisher;
@property (nonatomic, retain) NSString *relation;
@property (nonatomic, retain) NSString *rights;
@property (nonatomic, retain) NSString *subject;

@property (nonatomic, retain) NSString *tocFile;
@property (nonatomic, retain) NSString *coverImage;


@end
