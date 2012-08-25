/*!
 * \author qqwang
 * \brief The epub metadate definition 
 * \file EPubMetadata.h
 * \version 1.0 
 * \date 2012-06-06
 * \copyright (c) 2012 AnFengDe. All rights reserved.
 * */

#import <Foundation/Foundation.h>

@interface EPubMetadata : NSObject {
@private
    NSString *identifier_;
    NSString *title_;
    NSString *language_;
    NSString *version_;
    NSString *creator_;
	
    NSString *contributor_;
    NSString *date_;
    NSString *source_;
    NSString *type_;
    NSString *description_;
    NSString *format_;
    NSString *publisher_;
    NSString *relation_;
    NSString *rights_;
    NSString *subject_;
}

/** unique ID */
@property (nonatomic, retain) NSString *identifier;
/** book title */
@property (nonatomic, retain) NSString *title;
/** book language */
@property (nonatomic, retain) NSString *language;
/** book version */
@property (nonatomic, retain) NSString *version;
/** book author */
@property (nonatomic, retain) NSString *creator;

/** book contributor */
@property (nonatomic, retain) NSString *contributor;
/** book date */
@property (nonatomic, retain) NSString *date;
/** book source */
@property (nonatomic, retain) NSString *source;
/** book type */
@property (nonatomic, retain) NSString *type;
/** book description */
@property (nonatomic, retain) NSString *description;
/** book format */
@property (nonatomic, retain) NSString *format;
/** book publisher */
@property (nonatomic, retain) NSString *publisher;
/** book relation */
@property (nonatomic, retain) NSString *relation;
/** book rights */
@property (nonatomic, retain) NSString *rights;
/** book subject */
@property (nonatomic, retain) NSString *subject;

@end
