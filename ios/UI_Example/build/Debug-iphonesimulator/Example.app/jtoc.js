function getChapter(chapterTitle,chapterHref,level,i){
    if (level ==1){
        i = i+1;
        $("#afd_BTContent").append("<li id='afd_chapter"+i+"'>"+chapterTitle+"</li>");
    }
    if (level ==2){
        i = i+1;
        $("#afd_BTContent").append("<ul><li id='afd_chapter"+i+"'>"+chapterTitle+"</li><ul>");
    }
    document.getElementById("afd_chapter"+i+"").addEventListener("click",function addChapterListener(){
      if (navigator.userAgent.match(/Android/i)) {
           Android.jsOpenChapter(i);
        }
      if (navigator.userAgent.match(/iPhone/i)) {
           window.location = "anreader:myaction:jsOpenChapter:"+i+"";
        } 
    },false);
}
function getBookmark(bookmark){
    $("#afd_BTContent").append("<li>"+bookmark+"</li>");
}
function back(){
    if (navigator.userAgent.match(/Android/i)) {
        Android.back();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:back';
    }    
}
function initLoadingBookmark(){    
    $("#afd_BTContent").empty();
    if (navigator.userAgent.match(/Android/i)) {
        Android.getBookmark();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:getBookmark';
    }
}
function initLoadingTOC(){
    $("#afd_BTContent").empty();
    if (navigator.userAgent.match(/Android/i)) {
        Android.getChapter();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
        window.location = 'anreader:myaction:getChapter';
    }
}
function addListener(){
    document.getElementById("afd_continuReading").addEventListener("click",back,false);
    document.getElementById("afd_TOC").addEventListener("click",initLoadingTOC,false);
    document.getElementById("afd_bookmark").addEventListener("click",initLoadingBookmark,false);
}
document.addEventListener("DOMContentLoaded", addListener, false);
$(document).ready(function(){initLoadingTOC()});
