var bookmarkTimeout;
var opChapter = 0;
var pageShowing = 0;
var identifier;
/**
 * Show up the chapter
 * @param chapterTitle is the chapter name
 * @param level is the level of the chapter
 * @param i is the chapter index
 */
function getChapter(chapterTitle,level,i,currentChapterIndex){
    if (level ==1){
        $("#afd_BTContent").append("<li id='afd_chapter"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+chapterTitle+"</li>");
    }
    if (level ==2){
        $("#afd_BTContent").append("<li id='afd_chapter"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+chapterTitle+"</li>");
    }
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
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = "anreader:myaction:jsOpenChapter:"+i+"";
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
    $("#afd_BTContent").append("<li id='afd_bookmark"+i+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+bookmark+"</li>");
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
    identifier = $("#afd_bookmark"+i).text().substring(4,40);
    var top =$("#afd_deleteBKPage").position().top;
    $("#afd_deleteBKPage").css("left","0px");
    $("#afd_deleteBKPage").css("top",top+$(window).height()/2-30+"px");
    $("#afd_deleteBKPage").show("fast");
    pageShowing = 1;
}
/** Delete bookmark */
function performanceDeleting(){
	if (navigator.userAgent.match(/Android/i)) {
        Android.deleteBookmark(identifier);
        }
        if (navigator.userAgent.match(/iPhone/i)) {
        window.location = "anreader:myaction:deleteBookmark:"+identifier;
        }
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
    if (navigator.userAgent.match(/Android/i)) {
        Android.bkOpenChapter(i);
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = "anreader:myaction:bkOpenChapter:"+i+"";
    }    
    
}
/** Go back reading page */
function back(){
    if (navigator.userAgent.match(/Android/i)) {
        Android.back();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:back';
    }    
}
/** Invoke native code passing bookmarks to js */
function initLoadingBookmark(){   
    $("#afd_bookmark").attr("src","../image/afd_green_right.png");
    $("#afd_TOC").attr("src","../image/afd_white_left.png");
    $("#afd_BTContent").empty();
    document.documentElement.style.webkitUserSelect='none';
    if (navigator.userAgent.match(/Android/i)) {
        Android.getBookmark();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:getBookmark';
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
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:getChapter';
    }
}
function addListener(){
	$("#afd_deleteBKPage img").bind("click",performanceDeleting);
    document.getElementById("afd_TOCPage").addEventListener("touchstart",hidePage,false);
    document.getElementById("afd_continuReading").addEventListener("click",back,false);
    document.getElementById("afd_TOC").addEventListener("click",initLoadingTOC,false);
    document.getElementById("afd_bookmark").addEventListener("click",initLoadingBookmark,false);
}
document.addEventListener("DOMContentLoaded", addListener, false);
$(document).ready(function(){initLoadingTOC();});
