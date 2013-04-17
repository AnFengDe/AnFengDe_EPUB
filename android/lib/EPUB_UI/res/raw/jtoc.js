var bookmarkTimeout;
var opChapter = 0;
var pageShowing = 0;
var deleteBKIndex;
var screenWidth;
var bookmarkArray = new Array();
/**
 * Show up the chapter
 * @param chapterTitle is the chapter name
 * @param level is the level of the chapter
 * @param i is the chapter index
 */
function getChapter(chapterTitle,level,i,currentChapterIndex){
	var tempLevel;
    var title = chapterTitle;
	if (screenWidth>720){
		tempLevel = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    if (screenWidth<720){
    	tempLevel = "&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    var levelSpaces = "&nbsp";
    for (var j=1;j<level;j++){
    	levelSpaces = levelSpaces + "&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    $("#afd_BTContent").append("<li id='afd_chapter"+i+"'>"+levelSpaces+tempLevel+title+"</li>");
   
    document.getElementById("afd_chapter"+i+"").addEventListener("click",function(){addChapterListener(i,currentChapterIndex);},false);
    if (currentChapterIndex==i){
    	$("#afd_chapter"+i).css("background","#e4efd1");
    }
}
/**
 * Open the chapter
 * @param i is the chapter index
 */
function addChapterListener(i,currentChapterIndex){
	if (navigator.userAgent.match(/Android/i)) {
        Android.jsOpenChapter(i);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:jsOpenChapter:afd:'+i;
    } 
    $("#afd_chapter"+currentChapterIndex).css("background","white")
    $("#afd_chapter"+i).css("background","#e4efd1");
}
/**
 * Add bookmark item listener
 * @param bookmark is the bookmark text
 * @param i 
 */
function getBookmark(bookmark,i){
    /*alert(bookmark[3]);*/
	var tempLevel;
	if (screenWidth>=720){
		tempLevel = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    if (screenWidth<720){
    	tempLevel = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    $("#afd_BTContent").append("<li id='afd_bookmark"+i+"'>"+tempLevel+bookmark[3]+"</li>");
    document.getElementById("afd_bookmark"+i+"").addEventListener("touchstart",function (){addBookmarkListener(i);},false);
    document.getElementById("afd_bookmark"+i+"").addEventListener("touchend",function (){clearDeleteBookmarkListener(i);},false);
    document.getElementById("afd_bookmark"+i+"").addEventListener("touchmove",function (){stopOpeningBookmarkListener(i);},false);
}
/**
 * Touchstart listener: set delay
 */
function addBookmarkListener(i){
    opChapter = 1;
    $("#afd_bookmark"+i).css("background","#e4efd1");
    bookmarkTimeout = setTimeout(function(){deleteBookmark(i);},1000); 
}
/**
 * Touchend listener: decide to open the chapter or not
 */
function clearDeleteBookmarkListener(i){
    clearTimeout(bookmarkTimeout);
    if (opChapter ==1){
        bkOpenChapter(i);
    }
}
/**
 * Touchmove listener: stop to open chapter
 */
function stopOpeningBookmarkListener(i){
    opChapter = 0;
    $("#afd_bookmark"+i).css("background","white");
    clearTimeout(bookmarkTimeout);
    if (navigator.userAgent.match(/Android/i)) {
        ev.preventDefault();
    }
}
/**
 * Open deleting bookmark page
 */
function deleteBookmark(i){
    opChapter = 0;
    $("#afd_bookmark"+i).css("background","white");    
	deleteBKIndex = i;    
    var top =$("#afd_deleteBKPage").position().top;
    $("#afd_deleteBKPage").css("left","0px");
    $("#afd_deleteBKPage").css("top",top+$(window).height()/2-30+"px");
    $("#afd_deleteBKPage").show("fast");
    pageShowing = 1;
}
/** Delete bookmark */
function performanceDeleting(){
    bookmarkArray.splice(deleteBKIndex,1);
    var tempBookmarkArray = new Array();
    var tempBookmark;
    if (bookmarkArray.length==0){
        var bookIdentifier = localStorage.getItem("afd_bookname");
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
                var bookIdentifier = localStorage.getItem("afd_bookname");
                localStorage.setItem(bookIdentifier,tempBookmark);
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Quota exceeded!'); 
                }
            }
        }
    }
    initLoadingBookmark();   
    $("#afd_deleteBKPage").hide("fast");
    pageShowing = 0;
}
/** Hide the deleting page */
function hidePage(){
    if (pageShowing == 1){
        $("#afd_deleteBKPage").hide("fast");
        pageShowing = 0;
    }
}
/**
 * Open the chapter
 */
function bkOpenChapter(i){
	var chapterIndex = parseInt(bookmarkArray[i][0]);
	var pIndex = parseInt(bookmarkArray[i][1]);
	var sIndex = parseInt(bookmarkArray[i][2]);
    if (navigator.userAgent.match(/Android/i)) {
        Android.bkOpenChapter(chapterIndex,pIndex,sIndex);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = "anreader:afd:myaction:afd:bkOpenChapter:afd:"+bookmarkArray[i][0]+":afd:"+bookmarkArray[i][1]+":afd:"+bookmarkArray[i][2];
    }    
    
}
/** Go back reading page */
function back(){
    if (navigator.userAgent.match(/Android/i)) {
        Android.back();
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:back';
    }    
}
/** Invoke native code passing bookmarks to js */
function initLoadingBookmark(){   
    $("#afd_bookmark").attr("src","../image/afd_green_right.png");
    $("#afd_TOC").attr("src","../image/afd_white_left.png");
    $("#afd_BTContent").empty();
    document.documentElement.style.webkitUserSelect='none';
    readLocalStorage();
}
function readLocalStorage(){
    bookmarkArray.length=0;
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            var bookIdentifier = localStorage.getItem("afd_bookname");
            var tempBookmark = localStorage.getItem(bookIdentifier);
            if (tempBookmark==null)return;
            var tempBookmarkArray = tempBookmark.split("afd_divide");
            var num = tempBookmarkArray.length;
            for (var i=0;i<num;i++){
                var bookmarkData = tempBookmarkArray[i].split("afd_item");
                bookmarkArray.push(bookmarkData);
                getBookmark(bookmarkData,i);
            }
            /*alert(bookmarkArray[0][0]);*/
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}
/** Invoke native code passing chapter to js */
function initLoadingTOC(){
	
    $("#afd_bookmark").attr("src","../image/afd_white_right.png");
    $("#afd_TOC").attr("src","../image/afd_green_left.png");
    $("#afd_BTContent").empty();
    if (navigator.userAgent.match(/Android/i)) {
        Android.getChapter();
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:getChapter';
    }
}
function addListener(){	
	$("#afd_deleteBKPage img").bind("click",performanceDeleting);
    document.getElementById("afd_TOCPage").addEventListener("touchstart",hidePage,false);
    document.getElementById("afd_continuReading").addEventListener("click",back,false);
    document.getElementById("afd_TOC").addEventListener("click",initLoadingTOC,false);
    document.getElementById("afd_bookmark").addEventListener("click",initLoadingBookmark,false);
}
//document.addEventListener("DOMContentLoaded", addListener, false);
$(document).ready(function(){
	              screenWidth = $(window).width();
	              initLoadingTOC();
                  addListener();
});
