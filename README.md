EPUB_SDK
=================

Now we updated our EPUB SDK repository, the last version called EPUB UI Component.

License

EPUB SDK (the last version called EPUB UI Component) is a free software, all rights reserved by An Fengde  Information Technology Co.,Ltd.

EPUB_SDK official site is [http://epub.anfengde.com](http://epub.anfengde.com).

You can use EPUB SDK to make your own application. It’s free. 

The only requirement is that when you distribute your program you have to indicate the source of EPUB SDK (putting a link in your documentation is fine).

=================
* 20120824 A significant improvement of this version is the support to EPUB 2.0.x, in which most of the ebooks on the net are published. The SDK API interface is unchanged for compatibility with previous applications. Also we've added Google's AdMob feature. Ebook readers developed by this dev kit will cast advertisements.

=================
* 20120924 In this release we've fixed the bug of memory leaks in EPUB SDK. Meanwhile we added the features of page turning and reading progress bar for the rendering of book contents.

=================
* 20121026 In this release we've made a lot of modifications. We've realized our UI component based on HTML5 + CSS and used the same js code in android and iOS. Of course the users can always modify our js to get their desired effects, for example, a custom menu. And we've added the bookmark feature so that reading can be easier. At the same time we've included the the earlier EPub SDK example project to demonstrate the use of it. We've made some changes in version structure. 

=================
* 20121102 In this release our app supports the iPad. And at the same time, we've fixed the bug that some books can't be opened successfully. In our UI component we've added some functions to check whether the book is supported, if not, the app will display the corresponding error message and exit.

=================
* 20121109 In this release we've optimized the bookmark algorithm. Our bookmark data storing is base on HTML5 localStorage, which results in precise bookmark. At the same time, we've modified the rendering so that users who read on iPad will feel more comfortable.

=================
* 20121113 In this release we've fixed a bug that the localStorage would be cleared when application loaded in android. The bug was caused by Admob.

=================
* 20121224 In this release we've added bookshelf and settings function. In android you can add books from local or internet. In iOS you can load books from internet. And we've fixed some bugs. 

=================
* 20130118 In this release we've added the sharing function. In the reading page you can select the text by long clicking and then share the text. 

=================
* 20130228 In this release we've added TTS. And we've modified the downloading event. We added a button to cancel downloading and a progress bar to show the downloading progress.

=================
* 20130320 In this release we've fixed some bugs. And we've associated our project with ePub file type. In android you can invoke openBookFromFileExplorer(Intent intent) method and in iOS you can invoke openBookFromSafari:(NSURL*)url method.

=================
* 20130417 In this release we've fixed some bugs. And we are refactoring our code.

=================
* 20130521 In this release we've modified our project. We deleted the add book function. But you can put books in the books folder(in android is the assets/books), and the app will load them when it starts.

=================
* 20130608 In this release we've added the feature that you can swipe the page to open the chapter.

=================
* 20131021 In this release we've add mips, x86,armeabi and armeabi-v7a chip support. we also upgrade project setting for ios7 and android 4.3. Because we are focused on developing new UI code, so this version of the UI is not optimized for iOS7.
