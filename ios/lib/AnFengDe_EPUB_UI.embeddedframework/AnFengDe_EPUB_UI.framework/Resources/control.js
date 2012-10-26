var startX;
var startY;
var layoutHeight;
var layoutWidth;
var layoutRight;
var pages;
var moveTemp = 0;
var currentPage;
var tempPosition = 0;
var chapterSize;
var size;
var bookSize;
var move = 0;
var leftPosition = 0;
var preventMove =0;
var showMenu =1;
var bookmarkArray = new Array();
/**
 * Stop show up menu when click on link
 */
function clickOnLinkListener() {
	var a = document.getElementsByTagName("a");
	for ( var i = 0; i < a.length; i++) {
		a[i].addEventListener("touchstart", function clickOnLink(ev) {
                              preventMove =1;
                              showMenu =0;
                              if (navigator.userAgent.match(/Android/i)) {
                              Android.clickOnLink();
                              }
                              ev.stopPropagation();
                              }, false);
	}
}
/**
 * Get the current element content
 */
function getCurrentElementContent() {
	var elements = $("#afd_pageturn").find("p");
	var bookmarkContent ;
	/* alert(elements.length); */
	for ( var i = 0; i < elements.length; i++) {
		var left = $(elements[i]).offset().left;
		var top = $(elements[i]).offset().top;
	    /*alert(((currentPage-1)*layoutWidth+10)+","+$(elements[i]).offset().left+","+$(elements[i]).offset().top+","+i+","+elements[i].innerText.substring(0,10)+","+layoutHeight);*/ 
		if (navigator.userAgent.match(/iPhone/i)) {
			if (0 < left) {
                if (left<layoutWidth)
                    bookmarkContent = elements[i].innerText.substring(0, 30)+"......";
                if (i==0)
                    bookmarkContent = elements[1].innerText.substring(0, 30)+"......";
                if (i>0)
                    bookmarkContent = elements[i-1].innerText.substring(0, 30)+"......";
				return bookmarkContent = bookmarkContent.replace("\n"," ");
			}
			if (i == elements.length - 1) {
				bookmarkContent = elements[i].innerText.substring(0, 30)+"......";
				return bookmarkContent = bookmarkContent.replace("\n"," ");
			}
            
		}
		if (navigator.userAgent.match(/Android/i)) {
			if ((layoutHeight - 30) * (currentPage - 1) < top) {
				if (top<(layoutHeight - 30) * currentPage)
				    bookmarkContent = elements[i].innerText.substring(0, 30)+"......";	
                if (i==0)
                    bookmarkContent = elements[1].innerText.substring(0, 30)+"......";
                if (i>0)
					bookmarkContent = elements[i-1].innerText.substring(0, 30)+"......";
				return bookmarkContent = bookmarkContent.replace("\n"," ");
			}
			if (i == elements.length - 1) {
				bookmarkContent = elements[i].innerText.substring(0, 30)+"......";
				return bookmarkContent = bookmarkContent.replace("\n"," ");
			}
		}
	}
}
/**
 * Native codes invoke the method when the webview loading finished
 * 
 * @param current_percent
 * @param fontSize
 */
function resizePage(current_percent, fontSize) {
	$("#afd_content").css("font-size", parseInt(fontSize) + "px");
	pages = getPages();
	if (current_percent != 0) {
		currentPage = parseInt((current_percent * pages) / 10000.0);
		if ((currentPage - (current_percent * pages) / 10000.0) < 0) {
			currentPage = currentPage + 1;
		}
		/* alert(currentPage); */
		leftPosition = leftPosition - (currentPage - 1) * layoutWidth;
		tempPosition = leftPosition;
		$("#afd_content").css({
                              "left" : leftPosition + "px"
                              });
	}
	readProportion();
	if (navigator.userAgent.match(/Android/i)) {
        Android.getBookmark();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:getBookmark';
    }
	/* alert(leftPosition); */
}
/**
 * Figure out the total pages
 * 
 * @returns {pages}
 */
function getPages() {
	layoutRight = $("#afd_break").position().left;
	var pagesTemp = layoutRight / layoutWidth;
	if ((pagesTemp - parseInt(pagesTemp)) > 0) {
		pagesTemp = parseInt(pagesTemp) + 1;
	}
	return pagesTemp;
}
/** Exit application */
function exitReading() {
	if (navigator.userAgent.match(/iPhone/i)) {
		window.location = 'anreader:myaction:exit';
	}
	if (navigator.userAgent.match(/Android/i)) {
		Android.exitReading();
	}
}
/** Open toc page */
function openTOCPage() {
	var url = "file://" + path + "/html/toc.html";
	window.location = url;
}
/** Add bookmark */
function addBookmark() {
	var bookmarkContent = getCurrentElementContent();
    for (var i=0;i<bookmarkArray.length;i++){
        if (bookmarkArray[i]==bookmarkContent){
            $("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");
            bookmarkArray.length=0;
            deleteBookmark(bookmarkContent);
            return;
        }
    }
	if (navigator.userAgent.match(/Android/i)) {
		Android.addBookmark(bookmarkContent);
	}
	if (navigator.userAgent.match(/iPhone/i)) {
		window.location = "anreader:myaction:addBookmark:" + bookmarkContent;
	}
	/*alert(bookmarkContent);*/
	$("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
	bookmarkArray.push(bookmarkContent);
}
/** Delete bookmark */
function deleteBookmark(identifier) {
    if (navigator.userAgent.match(/Android/i)) {
        Android.deleteBookmark(identifier);
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = "anreader:myaction:deleteBookmark:"+identifier;
    }
}
/** Get bookmark */
function getBookmark(text,i){
	bookmarkArray[i]=text;
}
/** Set bookmark image */
function setBookmarkImg(){
	var bookmarkContent = getCurrentElementContent();   
	for (var i=0;i<bookmarkArray.length;i++){
        /*alert(bookmarkContent);*/
		if (bookmarkArray[i]==bookmarkContent){
			$("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
			break;
		}
		$("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");
	}
	$("#afd_menu").toggle();
	$("#afd_zoomin").hide();
	$("#afd_zoomout").hide();
}
/**
 * Get the size from native code
 * 
 * @param tempSize
 * @param tempChapterSize
 * @param tempBookSize
 */
function readProportionData(tempSize, tempChapterSize, tempBookSize) {
	chapterSize = tempChapterSize;
	size = tempSize;
	bookSize = tempBookSize;
	readProportion();
}

/** Figure out the percent */
function readProportion() {
	pages = getPages();
	var value = (size + chapterSize * (currentPage / pages)) / bookSize;
	value = parseInt(value * 100 * 10000) / 10000.0;
	$("#currentPage").html(value + "%");
}
/** Pass the reading data to native code */
function saveReadingData() {
	var fontSize = $("#afd_content").css("font-size");
	if (navigator.userAgent.match(/Android/i)) {
		Android.currentReadingData(currentPage, parseInt(fontSize), pages);
	}
	if (navigator.userAgent.match(/iPhone/i)) {
		window.location = "anreader:myaction:currentReadingData:" + currentPage
        + ":" + parseInt(fontSize) + ":" + pages;
	}
}
/**
 * Set the book title
 * 
 * @param title
 */
function setBookTitle(title) {
	$("#afd_title").html(title);
}
/** Hidden the fontsize button */
function hiddenFontSizeLayout() {
	$("#afd_zoomin").toggle();
	$("#afd_zoomout").toggle();
}
/** Zoom in font size */
function fontSizeZoomin() {
	var fontSize = $("#afd_content").css("font-size");
	$("#afd_content").css("font-size", parseInt(fontSize) + 1 + "px");
	readProportion();
	saveReadingData();
}
/** Zoom out font size */
function fontSizeZoomout() {
	var fontSize = $("#afd_content").css("font-size");
	$("#afd_content").css("font-size", parseInt(fontSize) - 1 + "px");
	readProportion();
	saveReadingData();
}
/** Resize the menu */
function resizeMenu() {
	$("#afd_title").css("left",
                        ($("#afd_menu").width() - $("#afd_title").width()) / 2);
	$("#afd_title").css("top",
                        ($("#afd_menu").height() - $("#afd_title").height()) / 2);
}
function rotateScreen() {
	var percent = currentPage * 10000 / pages;
	pages = getPages();
	currentPage = parseInt((percent * pages) / 10000.0);
	if ((currentPage - (percent * pages) / 10000.0) < 0) {
		currentPage = currentPage + 1;
	}
	/* alert(currentPage); */
	leftPosition = 0;
	leftPosition = leftPosition - (currentPage - 1) * layoutWidth;
	tempPosition = leftPosition;
	$("#afd_content").css({
                          "left" : leftPosition + "px"
                          });
	readProportion();
}

function onStart(ev) {
	showMenu =1;
	pages = getPages();
	startX = ev.touches[0].pageX;
	startY = ev.touches[0].pageY;
	if (currentPage==1&&startX<layoutWidth/2){
		preventMove =1;
		return;
	}
	
	leftPosition = $("#afd_content").position().left;
	if (tempPosition != leftPosition) {
		leftPosition = tempPosition;
	}   
	preventMove =0;
}

function addListener() {
	var tempX = 0;
	document.getElementById("afd_pageturn").addEventListener('touchend',
                                                             function(ev) {
                                                             
                                                             if (showMenu == 1 && startY > $('#afd_menu').height()) {
                                                             setBookmarkImg();
                                                             }
                                                             if (preventMove == 1)
                                                             return;
                                                             var halfWidth = layoutWidth / 2;
                                                             if (startX >= halfWidth) {
                                                             if (currentPage < pages && moveTemp < -halfWidth * 0.5) {
                                                             
                                                             tempPosition = leftPosition - layoutWidth;
                                                             $("#afd_content").animate({
                                                                                       left : tempPosition
                                                                                       }, 100);
                                                             currentPage = currentPage + 1;
                                                             readProportion();
                                                             } else {
                                                             $("#afd_content").animate({
                                                                                       left : leftPosition
                                                                                       }, 100);
                                                             }
                                                             }
                                                             if (startX < halfWidth) {
                                                             if (currentPage > 1 && moveTemp > halfWidth * 0.5) {
                                                             
                                                             tempPosition = leftPosition + layoutWidth;
                                                             $("#afd_content").animate({
                                                                                       left : tempPosition
                                                                                       }, 100);
                                                             currentPage = currentPage - 1;
                                                             readProportion();
                                                             } else {
                                                             $("#afd_content").animate({
                                                                                       left : leftPosition
                                                                                       }, 100);
                                                             }
                                                             }
                                                             moveTemp = 0;
                                                             tempX = 0;
                                                             saveReadingData();
                                                             }, false);
    
	document.getElementById("afd_pageturn").addEventListener('touchmove',
                                                             function(ev) {
                                                             showMenu =0;
                                                             $("#afd_menu").hide();
                                                             if (preventMove == 1)
                                                             return;
                                                             tempX = ev.touches[0].pageX;
                                                             moveTemp = tempX - startX;
                                                             $("#afd_content").css({
                                                                                   "left" : leftPosition + moveTemp + "px"
                                                                                   });
                                                             if (navigator.userAgent.match(/Android/i)) {
                                                             ev.preventDefault();
                                                             }
                                                             }, false);
    
	document.getElementById("afd_pageturn").addEventListener("touchstart",
                                                             onStart, false);
	document.getElementById("afd_zoom").addEventListener("click",
                                                         hiddenFontSizeLayout, false);
	document.getElementById("afd_zoomin").addEventListener("click",
                                                           fontSizeZoomin, false);
	document.getElementById("afd_zoomout").addEventListener("click",
                                                            fontSizeZoomout, false);
	document.getElementById("afd_bookshelf").addEventListener("click",
                                                              exitReading, false);
	document.getElementById("afd_TOC").addEventListener("click", openTOCPage,
                                                        false);
	document.getElementById("afd_bookmark").addEventListener("click",
                                                             addBookmark, false);
	clickOnLinkListener();
}

function initDom(path) {
	var srcPath = path;
	var bodyContent = $("body").html();
	$("body").empty();
	var menu = "<div id='afd_menu' style='background-image: url(\""
    + srcPath
    + "/image/afd_topmenu.png\");'><div id='afd_bookshelf'><img src='"
    + srcPath
    + "/image/afd_back.png'/></div><div id='afd_TOC'><img src='"
    + srcPath
    + "/image/afd_tablecontentsbtn.png'/></div><div id='afd_title'></div><div id='afd_zoom'><img src='"
    + srcPath
    + "/image/afd_fontsize.png'/></div><div id='afd_zoomout'><img src='"
    + srcPath
    + "/image/afd_font_zoomout.png'/></div><div id='afd_zoomin'><img src='"
    + srcPath
    + "/image/afd_font_zoomin.png'/></div><div id='afd_bookmark'><img id='afd_bkImg' src='"
    + srcPath + "/image/afd_bookmark.png'/></div></div>";
	var pageturn = "<div id='afd_pageturn'></div>";
	var content = "<div id='afd_content'></div>";
    
	$("body").append(menu);
	$("body").append(pageturn);
	$("#afd_pageturn").append(content);
	$("body").append("<div id='currentPage'></div>");
    
	$("#afd_content").html(bodyContent);
	$("#afd_content").append("<span id='afd_break'><br></span>");
    
	layoutHeight = $(window).height() - 20;
	layoutWidth = $(window).width() - 10;
	$("#afd_menu").width($(window).width());
	$("#afd_pageturn").width(layoutWidth);
	$("#afd_content").width(layoutWidth - 20);
	$("#afd_pageturn").height(layoutHeight);
	$("#afd_content").height(layoutHeight - 20);
	$("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
	$("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
	$("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
    
	pages = getPages();
	currentPage = 1;
	resizeMenu();
	$(window).resize(function() {
                     layoutHeight = $(window).height() - 20;
                     layoutWidth = $(window).width() - 10;
                     $("#afd_menu").width($(window).width());
                     $("#afd_pageturn").width(layoutWidth);
                     $("#afd_content").width(layoutWidth - 20);
                     $("#afd_pageturn").height(layoutHeight);
                     $("#afd_content").height(layoutHeight - 20);
                     $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
                     rotateScreen();
                     resizeMenu();
                     });
	if (navigator.userAgent.match(/Android/i)) {
		Android.resizePage();
	}
	if (navigator.userAgent.match(/iPhone/i)) {
		window.location = 'anreader:myaction:resizePage';
	}
	addListener();
}

$(document).ready(function() {
                  initDom(path);
                  });