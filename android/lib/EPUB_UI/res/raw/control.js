var path;
var startX;
var startY;
var layoutHeight;
var layoutWidth;
var pages;
var moveTemp = 0;
var tempX = 0;
var currentPage;
var tempPosition = 0;
var chapterSize;
var size; 
var bookSize;
var chapterSize;
var chapterTotleNum;
var brightness;
var move = 0;
var leftPosition = 0;
var preventMove =0;
var showMenu =1;
var bookIdentifier;
var bookmarkIndexArray = new Array();
var injectBackJS = "unInjectBackJS";
var inReadingPage = "inReadingPage";
var androidLongtouch = 0;
var multipleTouch = 0;
var bookmark = new Array();
var androidVersion = 0;

/** Inject span tag */
function injectSpanTag(pArray){
    for (var j=0;j<pArray.length;j++){
        var pTag = pArray[j][0];
        
        var pIndex = pArray[j][1];
        if (typeof($(pTag).find("afdbooktag")[0])=='undefined'||$($(pTag).find("afdbooktag")[0]).attr("id")!='afd_span'){
            var text = $(pTag).html();
            var svgElements = getSvgTag(pTag,'svg');
            var canvasElements = getSvgTag(pTag,'canvas');
            text = "<afdbooktag id='afd_span'>"+text+"</afdbooktag>";
            text = text.replace(/,/g,"</afdbooktag>afd_mark<afdbooktag>").replace(/afd_mark/g,",");
            text = text.replace(/\. /g,"</afdbooktag>afd_mark<afdbooktag>").replace(/afd_mark/g,". ");
            text = text.replace(/，/g,"</afdbooktag>afd_mark<afdbooktag>").replace(/afd_mark/g,"，");
            text = text.replace(/。/g,"</afdbooktag>afd_mark<afdbooktag>").replace(/afd_mark/g,"。");
            $(pTag).html(text);
            //$(pTag).append(text);
            setSvgTag(pTag,svgElements,'svg');
            setSvgTag(pTag,canvasElements,'canvas');
        }
        var spanArray = $(pTag).find("afdbooktag");
        for (var i=0;i<spanArray.length;i++){
    		var left = $(spanArray[i]).offset().left;
    		//var top = $(elements[i]).offset().top;
    		var top = getElementTop(spanArray[i]);
            if (navigator.userAgent.match(/Android/i)&&androidVersion<14) {
                if (($afd_content.height()-13)*(currentPage-1)<top){
                    var sText = $(spanArray[i]).text();
                    if (i<spanArray.length-1&&sText.length<3)
                        sText = $(spanArray[i+1]).text();
                    else 
                        sText = $(spanArray[i]).text();
                    sText = sText.substring(0,30)+"......";
                    var bookmarkData = new Array();
                    bookmarkData.push(chapterIndex);
                    bookmarkData.push(pIndex);
                    bookmarkData.push(i);
                    
                    bookmarkData.push(sText);
                    bookmarkData.push($(pTag).html());
                    return bookmarkData;
                }
                if (i==spanArray.length-1){
                    var sText = $(spanArray[i]).text().substring(0,30)+"......";
                    var bookmarkData = new Array();
                    bookmarkData.push(chapterIndex);
                    bookmarkData.push(pIndex);
                    bookmarkData.push(i);
                    
                    bookmarkData.push(sText);
                    bookmarkData.push($(pTag).html());
                    return bookmarkData;
                }
            }
            else{
            	if (0<left){
                	//alert(top+";"+$(spanArray[i]).offset().top);
                    var sText = $(spanArray[i]).text();
                    if (i<spanArray.length-1&&sText.length<3)
                        sText = $(spanArray[i+1]).text();
                    else 
                        sText = $(spanArray[i]).text();
                    sText = sText.substring(0,30)+"......";
                    var bookmarkData = new Array();
                    bookmarkData.push(chapterIndex);
                    bookmarkData.push(pIndex);
                    bookmarkData.push(i);
                    
                    bookmarkData.push(sText);
                    bookmarkData.push($(pTag).html());
                    return bookmarkData;
                }
                if (j<pArray.length-1)continue;
                if (i==spanArray.length-1){
                    var sText = $(spanArray[i]).text().substring(0,30)+"......";
                    var bookmarkData = new Array();
                    bookmarkData.push(chapterIndex);
                    bookmarkData.push(pIndex);
                    bookmarkData.push(i);
                    
                    bookmarkData.push(sText);
                    bookmarkData.push($(pTag).html());
                    return bookmarkData;
                }
            }
        }
    }
}

/** store data with localStorage */
function storeData(bookmarkData){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {            
            var cIndex = bookmarkData[0];
            var pIndex = bookmarkData[1];
            var sIndex = bookmarkData[2];
            var sText = bookmarkData[3];
            var pText = bookmarkData[4];
            var tempArray = new Array();
            tempArray.push(pIndex);
            tempArray.push(sIndex);
            bookmarkIndexArray.push(tempArray);
            var tempBookmark = localStorage.getItem(bookIdentifier);
            if (tempBookmark==null){
                tempBookmark = cIndex+"afd_item"+pIndex+"afd_item"+sIndex+"afd_item"+sText+"afd_item"+pText;
            }
            else
                tempBookmark = cIndex+"afd_item"+pIndex+"afd_item"+sIndex+"afd_item"+sText+"afd_item"+pText+"afd_divide"+tempBookmark;
            localStorage.setItem(bookIdentifier,tempBookmark);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}

/**
 * Get the current element content
 */
function getCurrentElementContent() {
	var elements = $afd_content.find("p");
    if (elements.length==0){
        var pArrayTemp = new Array();
        pArrayTemp.push(document.getElementById("afd_content"));
        pArrayTemp.push(-1);
        var pArray = new Array();
        pArray.push(pArrayTemp);
        return pArray;
    }
	for ( var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML=='undefined'||$(elements[i]).text().replace(/ /g,"").replace(/ /,"").length==0&&i<elements.length-1)continue;
		var left = $(elements[i]).offset().left;
		var top = getElementTop(elements[i]);
		if (navigator.userAgent.match(/Android/i)&&androidVersion<14) {
			var heightTemp = $afd_content.height()-13;
			if (heightTemp* (currentPage - 1)< top&&top<=heightTemp*currentPage) {
				var pArrayTemp1 = new Array();
                var pArrayTemp2 = new Array();
                var pArray = new Array();
                pArrayTemp1.push(elements[i]);
                pArrayTemp1.push(i);
                pArray.push(pArrayTemp1);
                if (i+1<elements.length){
                    pArrayTemp2.push(elements[i+1]);
                    pArrayTemp2.push(i+1);
                    pArray.push(pArrayTemp2);
                }
                return pArray;
			}
			if (top>heightTemp*currentPage){
				if (i==0){
                    var pArrayTemp = new Array();
                    pArrayTemp.push(elements[i]);
                    pArrayTemp.push(i);
                    var pArray = new Array();
                    pArray.push(pArrayTemp);
                    return pArray;
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
                    return pArray;
                }
			}
			if (top<=heightTemp* (currentPage - 1)&&i==elements.length-1){
                var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                return pArray;
            }
		}
		else{
			if (0<left&&left<layoutWidth){
                var pArrayTemp1 = new Array();
                var pArrayTemp2 = new Array();
                var pArray = new Array();
                pArrayTemp1.push(elements[i]);
                pArrayTemp1.push(i);
                pArray.push(pArrayTemp1);
                if (i+1<elements.length){
                    pArrayTemp2.push(elements[i+1]);
                    pArrayTemp2.push(i+1);
                    pArray.push(pArrayTemp2);
                }
                return pArray;
            }
            if (left>=layoutWidth){
                if (i==0){
                    var pArrayTemp = new Array();
                    pArrayTemp.push(elements[i]);
                    pArrayTemp.push(i);
                    var pArray = new Array();
                    pArray.push(pArrayTemp);
                    return pArray;
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
                    return pArray;
                }
            }
            if (left<=0&&i==elements.length-1){
                var pArrayTemp = new Array();
                pArrayTemp.push(elements[i]);
                pArrayTemp.push(i);
                var pArray = new Array();
                pArray.push(pArrayTemp);
                return pArray;
            }
		}
	}
}
/**
 * Native codes invoke the method when the webview loading finished
 */
function resizePage(current_percent, pIndex, sIndex, clickBk) {
    setTimeout(function(){
               if (clickBk=="clickBk"){
               var element;
               if (pIndex==-1){
               element = document.getElementById("afd_content");
               }
               else
               element = $afd_content.find("p")[pIndex];
               var span = $(element).find("afdbooktag")[sIndex];
               
               var i;
               if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
               //alert($(span).offset().left/layoutWidth+":"+$(span).offset().left+":"+layoutWidth+":"+$(window).width());
               i = parseInt($(span).offset().left/layoutWidth);
               }
               if (navigator.userAgent.match(/Android/i)) {
               i = parseInt(getElementTop(span)/($afd_content.height()-13));
               }
               currentPage = currentPage + i;
               leftPosition = leftPosition - i*layoutWidth;
               tempPosition = leftPosition;
               $afd_content.css({
                                "left" : leftPosition + "px"
                                });
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
               $afd_content.css({
                                "left" : leftPosition + "px"
                                });
               }
               }
               
               getReadingPercent();},100);
    
}

/**
 * Figure out the total pages
 */
function getPages() {
	var layoutLeft = $("#afd_break").position().left;
	var pagesTemp = layoutLeft / layoutWidth;
    pagesTemp = parseInt(pagesTemp) + 1;
	return pagesTemp;
}
/** Exit application */
function openBookshelf() {
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:openBookshelf';
	}
	if (navigator.userAgent.match(/Android/i)) {
		Android.openBookshelf();
	}
}
/** Open toc page */
function openPage(pageName) {
	var url = "file://" + path + "/html/"+pageName;
	window.location = url;
}
/** Add bookmark */
function addBookmark() {
    if ($("#afd_bkImg").attr("src")==path+"/image/afd_bookmark_yellow.png"){
        var lastBookmarkArray = deleteBookmark();
        refreshBookmark(lastBookmarkArray);
        $("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");
        return;
    }
    storeData(bookmark);
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
                        element = $afd_content.find("p")[pIndex];
                    var span = $(element).find("afdbooktag")[sIndex];
                    
                    if (navigator.userAgent.match(/Android/i)) {
                        for (var j=0;j<bookmarkIndexArray.length;j++){
                            if (pIndex==bookmarkIndexArray[j][0]&&sIndex==bookmarkIndexArray[j][1]){
                                bookmarkIndexArray.splice(j,1);
                                break;
                            }
                        }
                        var lastBookmarkArray = new Array();
                        lastBookmarkArray.push(bookmarkArray);
                        lastBookmarkArray.push(i);
                        //refreshBookmark(bookmarkArray,i);
                        return lastBookmarkArray;
                	}
                	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
                        for (var j=0;j<bookmarkIndexArray.length;j++){
                            if (pIndex==bookmarkIndexArray[j][0]&&sIndex==bookmarkIndexArray[j][1]){
                                bookmarkIndexArray.splice(j,1);
                                break;
                            }
                        }
                        var lastBookmarkArray = new Array();
                        lastBookmarkArray.push(bookmarkArray);
                        lastBookmarkArray.push(i);
                        //refreshBookmark(bookmarkArray,i);
                        return lastBookmarkArray;
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

function refreshBookmark(lastBookmarkArray){
    var deleteBKIndex = lastBookmarkArray[1];
    var bookmarkArray = lastBookmarkArray[0];
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
    if ($afd_menu.css("display")=="none"&&$afd_scale_panel.css("display")=="none"){
        $("#afd_bkImg").attr("src",path+"/image/afd_bookmark.png");	
        var pArray = getCurrentElementContent();
        var bookmarkData = injectSpanTag(pArray);
        bookmark = bookmarkData;
        var tempPIndex = bookmarkData[1];
        var tempSIndex = bookmarkData[2];
        for (var i=0;i<bookmarkIndexArray.length;i++){
            var pIndex = bookmarkIndexArray[i][0];
            var sIndex = bookmarkIndexArray[i][1];
            if (pIndex==tempPIndex&&sIndex==tempSIndex){
                $("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
                break;
            }
            var element;
            if (pIndex==-1){
                element = document.getElementById("afd_content");
            }
            else
                element = $afd_content.find("p")[pIndex];
            
            var span = $(element).find("afdbooktag")[sIndex];
            if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
                if (0<$(span).offset().left&&$(span).offset().left<layoutWidth){
                    $("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
                    break;
                }
            }
            if (navigator.userAgent.match(/Android/i)) {
                if (($afd_content.height()-13)*(currentPage-1)<getElementTop(span)&&getElementTop(span)<($afd_content.height()-13)*currentPage){
                    $("#afd_bkImg").attr("src",path+"/image/afd_bookmark_yellow.png");
                    break;
                }
            }
        }
        $afd_menu.show();
        $afd_bottomMenu.show();
    }
    else{
        $afd_menu.hide();
        $afd_bottomMenu.hide();
        $afd_currentPage.show();
        $afd_scale_panel.hide();
    }	
    $afd_zoomin.hide();
    $afd_zoomout.hide();
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
                        element = $afd_content.find("p")[pIndex];
                    var pText = bookmarkData[4];
                    var svgElements = getSvgTag(element,'svg');
                    var canvasElements = getSvgTag(element,'canvas');
                    $(element).html(pText);
                    setSvgTag(element,svgElements,'svg');
                    setSvgTag(element,canvasElements,'canvas');
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
 */
function getBookData(tempSize, tempChapterSize, tempBookSize, tempChapterIndex, tempchapterTotleNum,tempIdentifier,tempFilePath,title) {
	chapterSize = tempChapterSize;
	size = tempSize;
	bookSize = tempBookSize;
    chapterIndex = tempChapterIndex;
    chapterTotleNum = tempchapterTotleNum;
    bookIdentifier = tempIdentifier;
    path = tempFilePath;
    saveSettingData("afd_bookname",bookIdentifier);
    $("#afd_title").html(title);
    setLayoutImag();
    replacePText();
	getReadingPercent();
}

/** Figure out the percent */
function getReadingPercent() {
	pages = getPages();
	var value = (size + chapterSize * (currentPage / pages)) / bookSize;
	value = parseInt(value * 100 * 10000) / 10000.0;
	$afd_currentPage.html(value + "%");
}
/** Pass the reading data to native code */
function saveReadingData() {
	if (navigator.userAgent.match(/Android/i)) {
		Android.currentReadingData(currentPage, pages);
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = "anreader:afd:myaction:afd:currentReadingData:afd:" + currentPage
        + ":afd:" + pages;
	}
}

/** Hidden the fontsize button */
function hiddenFontSizeLayout() {
	$afd_zoomin.toggle();
	$afd_zoomout.toggle();
} 
/** Zoom in font size */
function fontSizeZoomin() {
	var fontSize = $afd_content.css("font-size");
    if (parseInt(fontSize)>36) {alert("Maximum"); return;}
	$afd_content.css("font-size", parseInt(fontSize) + 3 + "px");
    
	getReadingPercent();
	saveSettingData("fontSize",parseInt(fontSize) + 3);
	saveReadingData();
}
/** Zoom out font size */
function fontSizeZoomout() {
	var fontSize = $afd_content.css("font-size");
    if (parseInt(fontSize)<14) {alert("Minimum"); return;}
	$afd_content.css("font-size", parseInt(fontSize) - 3 + "px");
    
    if (currentPage > getPages()){
        var i = currentPage - getPages();
        leftPosition = leftPosition + i*layoutWidth;
        tempPosition = leftPosition;
        currentPage = getPages();
        $afd_content.css({
                         "left" : leftPosition + "px"
                         });
    }
	getReadingPercent();
	saveSettingData("fontSize",parseInt(fontSize) - 3);
	saveReadingData();
}
/** Resize the menu */
function resizeMenu() {
	$("#afd_title").css("left",
                        ($afd_menu.width() - $("#afd_title").width()) / 2);
	$("#afd_title").css("top",
                        ($afd_menu.height() - $("#afd_title").height()) / 2);
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
	$afd_content.css({
                     "left" : leftPosition + "px"
                     });
	getReadingPercent();
}

function onStart(ev) {
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
	    if (ev.touches.length >1){multipleTouch = 1;return};
	    multipleTouch = 0;
	}
    
	showMenu =1;
	pages = getPages();
	startX = ev.touches[0].pageX;
	startY = ev.touches[0].pageY;
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		if(window.getSelection().toString().length > 1){
	        showMenu = 0;
	    }
	    setTimeout(function(){showMenu=0;},300);
    } 
    
	if (currentPage==1&&startX<layoutWidth/2){
		preventMove =1;
		return;
	}
    
	//alert(leftPosition+","+tempPosition);
	leftPosition = $afd_content.position().left;
	if (tempPosition != leftPosition) {
		leftPosition = tempPosition;
	}   
	preventMove =0;
}

function onMove(ev){
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		if (multipleTouch ==1)return;
	}
    
    showMenu =0;
    $afd_menu.hide();
    $afd_bottomMenu.hide();
    $afd_scale_panel.hide();
    $afd_currentPage.show();
    $afd_sharingBox.hide();
    if (preventMove == 1)
        return;
    tempX = ev.touches[0].pageX;
    moveTemp = tempX - startX;
    $afd_content.css({
                     "left" : leftPosition + moveTemp + "px"
                     });
    if (navigator.userAgent.match(/Android/i)) {
        ev.preventDefault();
    }
}

function onEnd(ev){
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
	    if (multipleTouch ==1){
            $afd_content.animate({
                                 left : leftPosition
                                 }, 100);
            moveTemp = 0;
            tempX = 0;
            return;
        }
	}
    
	if(!($afd_sharingBox.css('display')=='none')){showMenu = 0;$afd_sharingBox.hide()};
	if (androidLongtouch==1)return;
    if (showMenu == 1 && startY > $('#afd_menu').height()&&startY<$('#afd_pageturn').height()-$('#afd_bottomMenu').height()) {
        setBookmarkImg();
    }
    if (preventMove == 1)
        return;
    var halfWidth = layoutWidth / 2;
    if (startX >= halfWidth) {
        if (currentPage < pages && moveTemp < -halfWidth * 0.5) {
            
            tempPosition = leftPosition - layoutWidth;
            $afd_content.animate({
                                 left : tempPosition
                                 }, 100);
            currentPage = currentPage + 1;
            getReadingPercent();
        } else {
            $afd_content.animate({
                                 left : leftPosition
                                 }, 100);
        }
    }
    if (startX < halfWidth) {
        if (currentPage > 1 && moveTemp > halfWidth * 0.5) {
            
            tempPosition = leftPosition + layoutWidth;
            $afd_content.animate({
                                 left : tempPosition
                                 }, 100);
            currentPage = currentPage - 1;
            getReadingPercent();
        } else {
            $afd_content.animate({
                                 left : leftPosition
                                 }, 100);
        }
    }
    
    moveTemp = 0;
    tempX = 0;
    saveReadingData();
}
function addListener() {
	document.getElementById("afd_pageturn").addEventListener('touchend',
                                                             onEnd, false);
    
	document.getElementById("afd_pageturn").addEventListener('touchmove',
                                                             onMove, false);
    
	document.getElementById("afd_pageturn").addEventListener("touchstart",
                                                             onStart, false);
	document.getElementById("afd_zoom").addEventListener("click",
                                                         hiddenFontSizeLayout, false);
	document.getElementById("afd_zoomin").addEventListener("click",
                                                           fontSizeZoomin, false);
	document.getElementById("afd_zoomout").addEventListener("click",
                                                            fontSizeZoomout, false);
	document.getElementById("afd_bookshelf").addEventListener("click",
                                                              openBookshelf, false);
	document.getElementById("afd_TOC").addEventListener("click", function(){openPage("toc.html");},
                                                        false);
    document.getElementById("afd_setting").addEventListener("click", function(){openPage("setting.html");},
                                                            false);
	document.getElementById("afd_bookmark").addEventListener("click",
                                                             addBookmark, false);
	
    document.getElementById("afd_jumping").addEventListener("click",function()
                                                            {displayScalepanel("jumping")}, false);
    document.getElementById("afd_brightness").addEventListener("click",function()
                                                               {displayScalepanel("brightness");}, false);
    document.getElementById("afd_precedingChapter").addEventListener("click",
                                                                     function(){openChapter(chapterIndex,"preceding");}, false);
    document.getElementById("afd_nextChapter").addEventListener("click",
                                                                function(){openChapter(chapterIndex,"next");}, false);
}
function getSvgTag(element,type){
    var svgElements = new Array();
    var svgs;
    if (type == 'svg')
        svgs = element.getElementsByTagNameNS('http://www.w3.org/2000/svg','svg');
    if (type == 'canvas')
        svgs = element.getElementsByTagName('canvas');
    if (svgs.length==0)svgElements.push("0");
    for (var i=0;i<svgs.length;i++){
    	
        svgElements.push(svgs[i]);
    }
    return svgElements;
}
function setSvgTag(element,svgElements,type){
	if (svgElements[0]=="0")return;
    var svgTemps;
    if (type == 'svg')
        svgTemps = element.getElementsByTagName('svg');
    if (type == 'canvas')
        svgTemps = element.getElementsByTagName('canvas');
    for (var i=0;i<svgTemps.length;i++){
        var svgElement = svgElements[i];
        $(svgTemps[i]).replaceWith(svgElement);
    }
}
function initDom() {
    var svgElements = getSvgTag(document.body,'svg');
    var canvasElements = getSvgTag(document.body,'canvas');
	var bodyContent = document.body.innerHTML;
    $body = $("body");
	$body.empty();
	var menu = "<div id='afd_menu'><div id='afd_bookshelf'><img/></div><div id='afd_TOC'><img/></div><div id='afd_title'></div><div id='afd_zoom'><img/></div><div id='afd_zoomout'><img/></div><div id='afd_zoomin'><img/></div><div id='afd_bookmark'><img id='afd_bkImg'/></div></div>";
    var bottomMenu = "<div id='afd_bottomMenu'><div id='afd_precedingChapter'><img/></div><div id='afd_divide_1' class='afd_divide'><img/></div><div id='afd_jumping'><img/></div><div id='afd_divide_2' class='afd_divide'><img/></div><div id='afd_brightness'><img/></div><div id='afd_divide_3' class='afd_divide'><img/></div><div id='afd_setting'><img/></div><div id='afd_divide_4' class='afd_divide'><img/></div><div id='afd_nextChapter'><img/></div></div>";
	var pageturn = "<div id='afd_pageturn'></div>";
	var content = "<div id='afd_content'></div>";
    var scalePanel = "<div class='afd_scale_panel'><span id='afd_value'></span><div class='afd_scale' id='afd_bar'><div></div><span id='afd_btn'></span></div></div>" ;
    var sharingBox = "<div id='afd_sharingBox'></div>";
    
    //$body.append(test);
	$body.append(menu);
    $body.append(sharingBox);
    
    var twitter = "<div class='afd_shareItem'><a id='afd_twitter_button' target='_blank' href ='#'><span><img/>Twitter</span></a></div>";
    var googleShare = "<div class='afd_shareItem'><a id='afd_gplus' href='#'><span><img/>Google+</span></a></div>";
    $afd_sharingBox = $("#afd_sharingBox");
    $afd_sharingBox.append(googleShare); 
    $afd_sharingBox.append(twitter); 
    
	$body.append(pageturn);
	
    $afd_pageturn = $("#afd_pageturn");
	$afd_pageturn.append(content);
    $afd_content = $("#afd_content");
	$body.append("<div id='afd_currentPage'></div>");
    $body.append(scalePanel);
    $body.append(bottomMenu);
    
	layoutHeight = $(window).height();
	layoutWidth = $(window).width();
    
    var cWPadding;
    var cHPadding;
    if ($(window).width()>=720){
        $afd_content.css({
                         "padding-right":"40px","padding-left":"40px","padding-top":"10px"});
        cWPadding = 80;
        cHPadding = 35;
        $("#afd_bookmark").css({ "right":"40px"});
        $("#afd_zoom").css({ "right":"80px"});
        $("#afd_TOC").css({ "left":"110px"});
        $("#afd_bookshelf").css({"left":"40px"});
    }
    if ($(window).width()<720){
        $afd_content.css({
                         "-webkit-column-gap": "20px",
                         "padding-right":"10px","padding-left":"10px","padding-top":"10px"});
        cWPadding = 20;
        cHPadding = 35;
    }
    $afd_menu = $("#afd_menu")
    $afd_bottomMenu = $("#afd_bottomMenu");
    $afd_currentPage = $("#afd_currentPage");
    $afd_scale_panel = $(".afd_scale_panel");
    $afd_zoomin = $("#afd_zoomin");
    $afd_zoomout = $("#afd_zoomout");
	$afd_menu.width(layoutWidth);
    $afd_bottomMenu.width(layoutWidth);
    $afd_scale_panel.width(layoutWidth);
	$afd_pageturn.width(layoutWidth);
	//$afd_content.width(layoutWidth - cWPadding);
	$afd_pageturn.height(layoutHeight);
	$afd_content.height(layoutHeight - cHPadding);
	$afd_content.append(bodyContent);
    
    setSvgTag(document.getElementById("afd_content"),svgElements,'svg');
    setSvgTag(document.getElementById("afd_content"),canvasElements,'canvas');
    
	$afd_content.append("<break id='afd_break'><br/>&#160;</break>");
    $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
	$("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
	$("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
	currentPage = 1;
	resizeMenu();
	$(window).resize(function() {
                     layoutHeight = $(window).height();
                     layoutWidth = $(window).width();
                     $afd_menu.width(layoutWidth);
                     $afd_bottomMenu.width(layoutWidth);
                     $afd_scale_panel.width(layoutWidth);
                     $afd_pageturn.width(layoutWidth);
                     //$afd_content.width(layoutWidth - cWPadding);
                     $afd_pageturn.height(layoutHeight);
                     $afd_content.height(layoutHeight - cHPadding);
                     $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
                     rotateScreen();
                     resizeMenu();
                     });
}
/**
 * Invoke native code to pass data to js
 * native code calls getBookData() and resizePage()
 */
function getNativeDataAndResizePage(){
	if (navigator.userAgent.match(/Android/i)) {
		Android.resizePage();
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:resizePage';
	}
}
/**
 * Get the actual top
 */
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
function displayScalepanel(tag){
    $afd_scale_panel.toggle();
    $afd_menu.hide();
    $afd_bottomMenu.hide();
    $afd_currentPage.hide();
    new scale('afd_btn','afd_bar','afd_value',tag);
}

scale=function (btn,bar,value,tag){
	this.btn=document.getElementById(btn);
	this.bar=document.getElementById(bar);
    this.value=document.getElementById(value);
	this.step=this.bar.getElementsByTagName("div")[0];
	this.init(tag);
};
scale.prototype={
init:function (tag){
    
    var afd_button = this.btn;
    var afd_bar = this.bar;
    var afd_step = this.step;
    var t = this;
    var floatPercent;
    var currentValue; 
    var barWidth = $(afd_bar).width();
    if (tag=="jumping"){
        floatPercent = parseFloat($afd_currentPage.html());
        currentValue = floatPercent/100*barWidth;
    }
    if (tag=="brightness"){
        floatPercent = 1-brightness;
        currentValue = floatPercent*barWidth;
    }
    
    afd_button.style.left = currentValue-11+"px";
    afd_step.style.width = currentValue+"px";
    
    if (tag=="jumping"){
        currentValue = currentValue/barWidth;
        currentValue = parseInt(currentValue * 100 * 100) / 100.0;
        t.ondrag(currentValue+"%");
    }
    if (tag=="brightness"){
        currentValue = parseInt(floatPercent * 100) / 100.0;
        t.ondrag(currentValue);
    }
    afd_bar.ontouchstart=function (e){
        var value = e.touches[0].pageX-$(afd_bar).offset().left;
        if (0<value&&value<barWidth){
            afd_button.style.left = value-11+"px";
            afd_step.style.width = value+"px";
            value = value/barWidth;
            if (tag=="jumping"){
                value = parseInt(value * 100 * 100) / 100.0;
                t.ondrag(value+"%");
            }
            if (tag=="brightness"){
                value = parseInt(value * 100) / 100.0;
                t.ondrag(value);
                var tempBrightness = 1 - value;
                t.onbrightness(tempBrightness);
            }
        }
    }
    afd_bar.ontouchmove=function (e){
        var value = e.touches[0].pageX-$(afd_bar).offset().left;
        if (0<value&&value<barWidth){
            afd_button.style.left= value-11+"px";
            afd_step.style.width = value+"px";
            value = value/barWidth;
            if (tag=="jumping"){
                value = parseInt(value * 100 * 100) / 100.0;
                t.ondrag(value+"%");
            }
            if (tag=="brightness"){
                value = parseInt(value * 100) / 100.0;
                t.ondrag(value);
                var tempBrightness = 1 - value;
                t.onbrightness(tempBrightness);
            }
        }
        if (navigator.userAgent.match(/Android/i)) {
            e.preventDefault();
        }
    }
    afd_bar.ontouchend=function (e){
        if (tag=="jumping"){
            var percent = $(afd_step).width()/barWidth;
            t.onjump(percent);
        }
        if (tag=="brightness"){
            saveSettingData("brightness",brightness);
        }
    }
},
ondrag:function (value){
    this.value.innerHTML=value;
},
onjump:function (percent){
	if (navigator.userAgent.match(/Android/i)) {
		Android.silderBarListener(percent);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:silderBarListener:afd:'+ percent;
    }    
},
onbrightness:function (tempBrightness){
    brightness = tempBrightness;
    $afd_pageturn.css("background-color","rgba(0,0,0,"+tempBrightness+")");
}
}
function setLayoutImag(){
    $afd_menu.css("background-image","url('"+path+"/image/afd_topmenu.png')");
    $("#afd_bookshelf img").attr("src",path+"/image/afd_back.png");	
    $("#afd_TOC img").attr("src",path+"/image/afd_tablecontentsbtn.png");	
    $("#afd_zoom img").attr("src",path+"/image/afd_fontsize.png");	
    $("#afd_zoomout img").attr("src",path+"/image/afd_font_zoomout.png");	
    $("#afd_zoomin img").attr("src",path+"/image/afd_font_zoomin.png");	
    $("#afd_bookmark img").attr("src",path+"/image/afd_bookmark.png");	
    $("#afd_precedingChapter img").attr("src",path+"/image/afd_prev.png");	
    $("#afd_jumping img").attr("src",path+"/image/afd_skip.png");	
    $("#afd_brightness img").attr("src",path+"/image/afd_bright.png");	
    $("#afd_setting img").attr("src",path+"/image/afd_setting.png");	
    $("#afd_nextChapter img").attr("src",path+"/image/afd_next.png");	
    $(".afd_divide img").attr("src",path+"/image/afd_divide.png");
    
    $afd_bottomMenu.css("background-image","url('"+path+"/image/afd_topmenu.png')");
    $(".afd_scale span").css("background-image","url('"+path+"/image/afd_drug.png')");
}
/**
 * Open the chapter
 * @param i is the chapter index
 */
function openChapter(i,order){
    if (order=="preceding"){
        if (i==0) {
            alert("The first chapter!");
            return;
        }
        else i=i-1;
    }
    if (order=="next"){
        if (i==chapterTotleNum-1){
            alert("The last chapter!");
            return;
        }
        else i=i+1;
    }
	if (navigator.userAgent.match(/Android/i)) {
        Android.jsOpenChapter(i);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:jsOpenChapter:afd:'+i;
    } 
}

function readySettingData(key){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}

function saveSettingData(key,value){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            localStorage.setItem(key,value);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
    
}

function initSettings(){
    //$afd_pageturn.find("*").css({"background-color":"rgba(0,0,0,0)"});
	var fontSize = readySettingData("fontSize");
	if (fontSize !=null){
		$afd_content.css("font-size", parseInt(fontSize) + "px");
	}
	else{
		$afd_content.css("font-size", "16px");
	}
    brightness = readySettingData("brightness");
    if (brightness==null){brightness=0}
    $afd_pageturn.css("background-color","rgba(0,0,0,"+brightness+")");
    var fontColor = readySettingData("fontColor");
    if (fontColor!=null){
        $afd_pageturn.find("*").css({"color":fontColor});
    }
    var background = readySettingData("background");
    if (background!=null){
        $body.css({"background-color":background});
    }
    var fontStyle = readySettingData("fontStyle");
    if (fontStyle!=null){
        $afd_pageturn.find("*").css({"font-family":fontStyle});
    }
    var dayAndNightModel = readySettingData("dayAndNightModel");
    if (dayAndNightModel=="night"){
        $body.css({"background-color":"black"});
        $afd_pageturn.find("*").css({"color":"white"});
    }
}

function showSharingPage(){
    androidLongtouch = 0;
    var text = window.getSelection().toString();
    
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.getSelection().empty();                 
        $("#afd_twitter_button").attr('href',"http://twitter.com/intent/tweet?source=sharethiscom&text="+text);
        $("#afd_twitter_button img").attr('src',path+"/image/twitter_bird_callout.png");
        $("#afd_gplus").attr('href',"https://m.google.com/app/plus/x/aoyapxt82rpw/?v=compose&group=m1c&hideloc=1&content="+text);
        $("#afd_gplus img").attr('src',path+"/image/gplus_64.png");
        $afd_sharingBox.show();
    }
    else
        Android.shareText(text);
}

function androidLongtouchModel(model){
	androidLongtouch = model;
	if (model==1){
		$afd_menu.hide();
	    $afd_bottomMenu.hide();
	}
}

function androidCopySelectionText(){
	androidLongtouch = 0;
    var text = window.getSelection().toString();
	Android.copySelectionText(text);
}

function ttsSpeaking(){
	androidLongtouch = 0;
    var text = window.getSelection().toString();
	Android.textToSpeak(text);
}

function getAndroidVersion(andVersion){
	androidVersion = andVersion;
}
function resetViewport(){
    var metas = $("head").find("meta");
    for (var i=0;i<metas.length;i++){
        if ($(metas[i]).attr('name')=="viewport"){
            $(metas[i]).replaceWith("<meta name=\"viewport\" content=\"width=device-width, height=device-height\"/>");
            return;
        }
    }
}
$(document).ready(function() {
                  resetViewport();
                  initDom();
                  initSettings();
                  addListener();
                  getNativeDataAndResizePage();
                  });