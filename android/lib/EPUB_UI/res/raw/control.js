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
var chapterSize;
var move = 0;
var leftPosition = 0;
var preventMove =0;
var showMenu =1;
var bookIdentifier;
var bookmarkIndexArray = new Array();

/** Inject span tag */
function injectSpanTag(pArray){
    for (var j=0;j<pArray.length;j++){
    	
        var pTag = pArray[j][0];
        var pIndex = pArray[j][1];
        if (typeof($(pTag).find("span")[0])=='undefined'||$($(pTag).find("span")[0]).attr("id")!='afd_span'){
            var text = $(pTag).html();
            
            text = "<span id='afd_span'>"+text+"</span>";
            text = text.replace(/,/g,"</span>afd_mark<span>").replace(/afd_mark/g,",");
            text = text.replace(/\. /g,"</span>afd_mark<span>").replace(/afd_mark/g,". ");
            text = text.replace(/，/g,"</span>afd_mark<span>").replace(/afd_mark/g,"，");
            text = text.replace(/。/g,"</span>afd_mark<span>").replace(/afd_mark/g,"。");
            $(pTag).empty();
            $(pTag).append(text);
        }
        
        var spanArray = $(pTag).find("span");
        
        for (var i=0;i<spanArray.length;i++){
            
            if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
                if (0<$(spanArray[i]).offset().left){
                    var tempArray = new Array();
                    tempArray.push(pIndex);
                    tempArray.push(i);
                    bookmarkIndexArray.push(tempArray);
                    var sText = $(spanArray[i]).text();
                    if (i<spanArray.length-1&&sText.length<3)
                        sText = $(spanArray[i+1]).text();
                    else 
                        sText = $(spanArray[i]).text();
                    storeData(pIndex,i,$(pTag).html(),sText.substring(0,30)+"......");
                    return;
                }
                if (i==spanArray.length-1){
                    var tempArray = new Array();
                    tempArray.push(pIndex);
                    tempArray.push(i);
                    bookmarkIndexArray.push(tempArray);

                    storeData(pIndex,i,$(pTag).html(),$(spanArray[i]).text().substring(0,30)+"......");
                    return;
                }
            }
            
            if (navigator.userAgent.match(/Android/i)) {
            	/*alert($("#afd_content").height()*(currentPage-1)+10+","+$(spanArray[i]).offset().top);*/
                if (($("#afd_content").height()-13)*(currentPage-1)<$(spanArray[i]).offset().top){
                    var tempArray = new Array();
                    tempArray.push(pIndex);
                    tempArray.push(i);
                    bookmarkIndexArray.push(tempArray);
                    var sText = $(spanArray[i]).text();
                    if (i<spanArray.length-1&&sText.length<3)
                        sText = $(spanArray[i+1]).text();
                    else 
                        sText = $(spanArray[i]).text();
                    storeData(pIndex,i,$(pTag).html(),sText.substring(0,30)+"......");
                    return;
                }
                if (i==spanArray.length-1){
                    var tempArray = new Array();
                    tempArray.push(pIndex);
                    tempArray.push(i);
                    bookmarkIndexArray.push(tempArray);
                    
                    storeData(pIndex,i,$(pTag).html(),$(spanArray[i]).text().substring(0,30)+"......");
                    return;
                }
            }
        }
    }
}

/** store data with localStorage */
function storeData(pIndex,sIndex,pText,sText){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            var tempBookmark = localStorage.getItem(bookIdentifier);
            if (tempBookmark==null){
                tempBookmark = chapterIndex+"afd_item"+pIndex+"afd_item"+sIndex+"afd_item"+sText+"afd_item"+pText;
            }
            else
                tempBookmark = chapterIndex+"afd_item"+pIndex+"afd_item"+sIndex+"afd_item"+sText+"afd_item"+pText+"afd_divide"+tempBookmark;
            localStorage.setItem(bookIdentifier,tempBookmark);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}
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
    
	var elements = $("#afd_content").find("p");
    if (elements.length==0){
        var pArrayTemp = new Array();
        pArrayTemp.push(document.getElementById("afd_content"));
        pArrayTemp.push(-1);
        var pArray = new Array();
        pArray.push(pArrayTemp);
        injectSpanTag(pArray);
        return;
    }
	for ( var i = 0; i < elements.length; i++) {
		var left = $(elements[i]).offset().left;
		var top = $(elements[i]).offset().top;
	    /*alert(((currentPage-1)*layoutWidth+10)+",left:"+$(elements[i]).offset().left+",top:"+$(elements[i]).offset().top+",pIndex:"+i +","+elements[i].innerText.substring(0,10)+",bodyheight:"+layoutHeight+",currentpage:"+currentPage+",height:"+$("#afd_content").height()); */
		if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
			if (0<left&&left<layoutWidth){
                var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                injectSpanTag(pArray);
                return;
            }
            if (left>=layoutWidth){
                if (i==0){
                    var pArrayTemp = new Array();
                    pArrayTemp.push(elements[i]);
                    pArrayTemp.push(i);
                    var pArray = new Array();
                    pArray.push(pArrayTemp);
                    injectSpanTag(pArray);
                    return;
                }
                if (i>0){
                	var pArrayTemp1 = new Array();
                    var pArrayTemp2 = new Array();
                    var pArray = new Array();
                    pArrayTemp1.push(elements[i-1]);
                    pArrayTemp1.push(i-1);
                    pArray.push(pArrayTemp1);
                    pArrayTemp2.push(elements[i]);
                    pArrayTemp2.push(i);
                    pArray.push(pArrayTemp2);
                    injectSpanTag(pArray);
                    return;
                }
            }
            if (left<=0&&i==elements.length-1){
                var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                injectSpanTag(pArray);
                return;
            }           
		}
		if (navigator.userAgent.match(/Android/i)) {
			var heightTemp = $("#afd_content").height()-13;
			if ( heightTemp* (currentPage - 1)< top&&top<=heightTemp*currentPage) {
				var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                injectSpanTag(pArray);
                return;
			}
			if (top>heightTemp*currentPage){
				if (i==0){
                    var pArrayTemp = new Array();
                    pArrayTemp.push(elements[i]);
                    pArrayTemp.push(i);
                    var pArray = new Array();
                    pArray.push(pArrayTemp);
                    injectSpanTag(pArray);
                    return;
                }
                if (i>0){
                	var pArrayTemp1 = new Array();
                    var pArrayTemp2 = new Array();
                    var pArray = new Array();
                    pArrayTemp1.push(elements[i-1]);
                    pArrayTemp1.push(i-1);
                    pArray.push(pArrayTemp1);
                    pArrayTemp2.push(elements[i]);
                    pArrayTemp2.push(i);
                    pArray.push(pArrayTemp2);
                    injectSpanTag(pArray);
                    return;
                }
			}
			if (top<=heightTemp* (currentPage - 1)&&i==elements.length-1){
                var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                injectSpanTag(pArray);
                return;
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
function resizePage(current_percent, fontSize, pIndex, sIndex, clickBk) {
    
	$("#afd_content").css("font-size", parseInt(fontSize) + "px");
    if (clickBk=="clickBk"){
        var element;
        if (pIndex==-1){
            element = document.getElementById("afd_content");
        }
        else
            element = $("#afd_content").find("p")[pIndex];
        var span = $(element).find("span")[sIndex];
        var i;
        if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        	i = parseInt($(span).offset().left/layoutWidth);
    	}
    	if (navigator.userAgent.match(/Android/i)) {
    		i = parseInt($(span).offset().top/($("#afd_content").height()-13));
    	}
        currentPage = currentPage + i;
        leftPosition = leftPosition - i*layoutWidth;
        tempPosition = leftPosition;
        $("#afd_content").css({
                              "left" : leftPosition + "px"
                              });
        /*alert("pre:"+(currentPage-1)*$("#afd_content").height()+","+currentPage*$("#afd_content").height()+",ture:"+$(span).offset().top);*/
    }
    else {
        pages = getPages();
        if (current_percent != 0) {
            currentPage = parseInt((current_percent * pages) / 10000.0);
            if ((currentPage - (current_percent * pages) / 10000.0) < 0) {
                currentPage = currentPage + 1;
            }
            
            leftPosition = leftPosition - (currentPage - 1) * layoutWidth;
            tempPosition = leftPosition;
            $("#afd_content").css({
                                  "left" : leftPosition + "px"
                                  });
        }
    }
    readProportion();
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
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
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
    if ($("#afd_bkImg").attr("src")==path+"/image/afd_bookmark_yellow.png"){
        deleteBookmark();
        $("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");
        return;
    }
    getCurrentElementContent();
	$("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
}
/** Delete bookmark */
function deleteBookmark() {
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            var bookmarkArray = new Array();
            var tempBookmark = localStorage.getItem(bookIdentifier);
            if (tempBookmark==null)return;
            var tempBookmarkArray = tempBookmark.split("afd_divide");
            var num = tempBookmarkArray.length;
            
            for (var i=0;i<num;i++){
                var bookmarkData = tempBookmarkArray[i].split("afd_item");
                bookmarkArray.push(bookmarkData);
            }
            for (var i=0;i<bookmarkArray.length;i++){
                if (chapterIndex==bookmarkArray[i][0]){
                    var pIndex = bookmarkArray[i][1];
                    var sIndex = bookmarkArray[i][2];
                    var element;
                    if (pIndex==-1){
                        element = document.getElementById("afd_content");
                    }
                    else
                        element = $("#afd_content").find("p")[pIndex];
                    
                    var span = $(element).find("span")[sIndex];
                    if (navigator.userAgent.match(/Android/i)) {
                    	if (($("#afd_content").height()-13)*(currentPage-1)<$(span).offset().top&&$(span).offset().top<=($("#afd_content").height()-13)*currentPage){
                            for (var j=0;j<bookmarkIndexArray.length;j++){
                                if (pIndex==bookmarkIndexArray[j][0]&&sIndex==bookmarkIndexArray[j][1]){
                                    bookmarkIndexArray.splice(j,1);
                                    break;
                                }
                            }
                            refreshBookmark(bookmarkArray,i);
                            break;
                        }
                	}
                	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
                		if (0<$(span).offset().left&&$(span).offset().left<=layoutWidth){
                            for (var j=0;j<bookmarkIndexArray.length;j++){
                                if (pIndex==bookmarkIndexArray[j][0]&&sIndex==bookmarkIndexArray[j][1]){
                                    bookmarkIndexArray.splice(j,1);
                                    break;
                                }
                            }
                            refreshBookmark(bookmarkArray,i);
                            break;
                        }
                	}  
                }
            }
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    } 
}

/** refresh bookmark data */

function refreshBookmark(bookmarkArray,deleteBKIndex){
    bookmarkArray.splice(deleteBKIndex,1);    
    var tempBookmarkArray = new Array();
    var tempBookmark;
    if (bookmarkArray.length==0){
        localStorage.removeItem(bookIdentifier);
    }
    else {
        for (var i=0;i<bookmarkArray.length;i++){
            var bookmarkData = bookmarkArray[i];
            var temp = bookmarkData.join("afd_item");
            tempBookmarkArray.push(temp);
        }
        tempBookmark = tempBookmarkArray.join("afd_divide");
        
        if (typeof(localStorage) == 'undefined') {
            alert('Your browser does not support HTML5 localStorage. Try upgrading.');
        } else {
            try {
                localStorage.setItem(bookIdentifier,tempBookmark);
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Quota exceeded!'); 
                }
            }
        }
    }
}
/** Set bookmark image */
function setBookmarkImg(){
    
	for (var i=0;i<bookmarkIndexArray.length;i++){
        var pIndex = bookmarkIndexArray[i][0];
        
        var sIndex = bookmarkIndexArray[i][1];
        var element;
        if (pIndex==-1){
            element = document.getElementById("afd_content");
        }
        else
            element = $("#afd_content").find("p")[pIndex];
        
        var span = $(element).find("span")[sIndex];
        if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        	if (0<$(span).offset().left&&$(span).offset().left<layoutWidth){
                $("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
                break;
            }
    	}
    	if (navigator.userAgent.match(/Android/i)) {
    		if (($("#afd_content").height()-13)*(currentPage-1)<$(span).offset().top&&$(span).offset().top<($("#afd_content").height()-13)*currentPage){
                $("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
                break;
            }
    	}
        
        $("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");	
	}
	$("#afd_menu").toggle();
	$("#afd_zoomin").hide();
	$("#afd_zoomout").hide();
}

/** replace the p text */
function replacePText(){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            var tempBookmark = localStorage.getItem(bookIdentifier);
            if (tempBookmark==null)return;
            var tempBookmarkArray = tempBookmark.split("afd_divide");
            var num = tempBookmarkArray.length;
            
            for (var i=0;i<num;i++){
                var bookmarkData = tempBookmarkArray[i].split("afd_item");
                if (chapterIndex==bookmarkData[0]){
                    var pIndex = bookmarkData[1];
                    var sIndex = bookmarkData[2];
                    var tempArray = new Array();
                    tempArray.push(pIndex);
                    tempArray.push(sIndex);
                    bookmarkIndexArray.push(tempArray);
                    var element;
                    if (pIndex==-1){
                        element = document.getElementById("afd_content");
                    }
                    else
                        element = $("#afd_content").find("p")[pIndex];
                    var pText = bookmarkData[4];
                    $(element).html(pText);
                }                
            }
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }    
}
/**
 * Get the size from native code
 * 
 * @param tempSize
 * @param tempChapterSize
 * @param tempBookSize
 */
function readProportionData(tempSize, tempChapterSize, tempBookSize, tempChapterIndex) {
	chapterSize = tempChapterSize;
	size = tempSize;
	bookSize = tempBookSize;
    chapterIndex = tempChapterIndex;
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
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = "anreader:myaction:currentReadingData:" + currentPage
        + ":" + parseInt(fontSize) + ":" + pages;
	}
}
/**
 * Set the book title
 * 
 * @param title
 */
function setBookTitle(title,identifier) {
    bookIdentifier = identifier;
	$("#afd_title").html(title);
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            localStorage.setItem("afd_bookname",identifier);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
    replacePText();
}
/** Hidden the fontsize button */
function hiddenFontSizeLayout() {
	$("#afd_zoomin").toggle();
	$("#afd_zoomout").toggle();
}
/** Zoom in font size */
function fontSizeZoomin() {
	var fontSize = $("#afd_content").css("font-size");
    if (parseInt(fontSize)>36) {alert("Maximum"); return;}
	$("#afd_content").css("font-size", parseInt(fontSize) + 3 + "px");
	readProportion();
	saveReadingData();
}
/** Zoom out font size */
function fontSizeZoomout() {
	var fontSize = $("#afd_content").css("font-size");
    if (parseInt(fontSize)<13) {alert("Minimum"); return;}
	$("#afd_content").css("font-size", parseInt(fontSize) - 3 + "px");
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
    
    var cWPadding;
    var cHPadding;
    if ($(window).width()>=720){
        $("#afd_content").css({
                              "padding-right":"40px","padding-left":"40px","padding-top":"10px"});
        cWPadding = 80;
        cHPadding = 20;
        $("#afd_bookmark").css({ "right":"40px"});
        $("#afd_zoom").css({ "right":"80px"});
        $("#afd_TOC").css({ "left":"110px"});
        $("#afd_bookshelf").css({"left":"40px"});
    }
    if ($(window).width()<720){
        $("#afd_content").css({
                              "-webkit-column-gap": "20px",
                              "padding-right":"10px","padding-left":"10px","padding-top":"10px"});
        cWPadding = 20;
        cHPadding = 20;
    }
    
	$("#afd_menu").width($(window).width());
	$("#afd_pageturn").width(layoutWidth);
	$("#afd_content").width(layoutWidth - cWPadding);
	$("#afd_pageturn").height(layoutHeight);
	$("#afd_content").height(layoutHeight - cHPadding);
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
                     $("#afd_content").width(layoutWidth - cWPadding);
                     $("#afd_pageturn").height(layoutHeight);
                     $("#afd_content").height(layoutHeight - cHPadding);
                     $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
                     rotateScreen();
                     resizeMenu();
                     });
	if (navigator.userAgent.match(/Android/i)) {
		Android.resizePage();
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:myaction:resizePage';
	}
	addListener();
}

$(document).ready(function() {
                  initDom(path);
                  });