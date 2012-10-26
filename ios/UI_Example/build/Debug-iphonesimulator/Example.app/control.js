var startX;
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
var move =0;
var leftPosition =0;
function resizePage(current_percent,fontSize){
    if (current_percent != 0){
        currentPage = parseInt(current_percent*(parseInt(pages)+1)/10000);
        if (currentPage - (current_percent*(parseInt(pages)+1)/10000)<0){
            currentPage = currentPage+1;
        }
        alert(currentPage);
        leftPosition = leftPosition -(currentPage-1)*layoutWidth;
        tempPosition = leftPosition;
        $("#afd_content").css({
                          "left" : leftPosition + "px"
                          });
    }
        $("#afd_content").css("font-size",parseInt(fontSize) +"px");
        reComputeProportion();
        /*alert(leftPosition);*/
}

function exitReading(){
        if (navigator.userAgent.match(/Android/i)) {
                Android.exitReading();
    }
        if (navigator.userAgent.match(/iPhone/i)) {
                window.location = 'anreader:myaction:exit';
    }                
}

function openTOCPage(){
    var url = "file://"+path+"/html/toc.html";        
    window.location = url;
}

function addBookmark(){
        if (navigator.userAgent.match(/Android/i)) {
                Android.addBookmark($("#currentPage").html());
    }
        if (navigator.userAgent.match(/iPhone/i)) {
                window.location = "anreader:myaction:addBookmark:"+$("#currentPage").html();
    } 
        alert("add bookmark sucess!");
}

function readProportionData(tempSize,tempChapterSize,tempBookSize)
{
        chapterSize =tempChapterSize;
        size =tempSize;
        bookSize =tempBookSize;
        reComputeProportion();
}
function reComputeProportion()
{
        layoutRight = $("#afd_break").position().left;
        pages = layoutRight / layoutWidth;  
        $("#currentPage").html(readProportion(currentPage,pages));
}
function readProportion(currentPage,pages)
{
        var value =(size+chapterSize*(currentPage/(parseInt(pages)+1)))/bookSize;
        value = parseInt(value*100*10000)/10000.0;
        return value+"%";
}
function saveReadingData(){
    var fontSize = $("#afd_content").css("font-size");
    var totalPages = parseInt(pages)+1;
        if (navigator.userAgent.match(/Android/i)) {                
        Android.currentReadingData(currentPage,parseInt(fontSize),totalPages);
    }
    if (navigator.userAgent.match(/iPhone/i)) {
                window.location = "anreader:myaction:currentReadingData:"+currentPage+":"+parseInt(fontSize)+":"+totalPages;
    }
}

function setBookTitle(title){
        $("#afd_title").html(title);
}

function hiddenFontSizeLayout(){
        $("#afd_zoomin").toggle();
        $("#afd_zoomout").toggle();
}
function fontSizeZoomin(){
    var fontSize = $("#afd_content").css("font-size");
    $("#afd_content").css("font-size",parseInt(fontSize) + 1 +"px");
    reComputeProportion();
    saveReadingData();
}
function fontSizeZoomout(){
        var fontSize = $("#afd_content").css("font-size");
        $("#afd_content").css("font-size",parseInt(fontSize) - 1 +"px");
        reComputeProportion();
    saveReadingData();
}
function resizeMenu(){
        $("#afd_title").css("left",($("#afd_menu").width()-$("#afd_title").width())/2);
        $("#afd_title").css("top",($("#afd_menu").height()-$("#afd_title").height())/2);
}


document.addEventListener("DOMContentLoaded", addListener, false);

function onStart(ev) 
{
    layoutRight = $("#afd_break").position().left;
    pages = layoutRight / layoutWidth; 
    startX = ev.touches[0].pageX;
    leftPosition = $("#afd_content").position().left;
    if (tempPosition != leftPosition) {
        leftPosition = tempPosition;
    }
}

function addListener()
{
        var tempX=0;
    document.getElementById("afd_pageturn")
    .addEventListener(
                      'touchend',
                      function(ev) {
                      if (tempX==0) {
                      $("#afd_menu").toggle();
                      $("#afd_zoomin").hide();
                      $("#afd_zoomout").hide();
                      }
                      var halfWidth = layoutWidth / 2;
                      if (startX >= halfWidth) {
                      if (currentPage < pages
                          && moveTemp < -halfWidth * 0.5) {
                      
                      tempPosition = leftPosition - layoutWidth;
                      $("#afd_content").animate({
                                                left : tempPosition
                                                }, 100);
                      currentPage = currentPage + 1;
                      $("#currentPage").html(readProportion(currentPage,pages));
                      
                      } else {
                      $("#afd_content").animate({
                                                left : leftPosition
                                                }, 100);
                      }
                      }
                      if (startX < halfWidth) {
                      if (currentPage > 1
                          && moveTemp > halfWidth * 0.5) {
                      
                      tempPosition = leftPosition + layoutWidth;
                      $("#afd_content").animate({
                                                left : tempPosition
                                                }, 100);
                      currentPage = currentPage - 1;
                      $("#currentPage").html(readProportion(currentPage,pages));
                      
                      } else
                      $("#afd_content").animate({
                                                left : leftPosition
                                                }, 100);
                      }
                      moveTemp = 0;
                      tempX = 0;
                      saveReadingData();
                      }, false);
    
    document.getElementById("afd_pageturn")
    .addEventListener('touchmove',
                      function(ev) {
                      tempX = ev.touches[0].pageX;
                      moveTemp = tempX - startX;
                      $("#afd_content").css({
                                            "left" : leftPosition + moveTemp + "px"
                                            });
                      if (navigator.userAgent.match(/Android/i)) {
                      ev.preventDefault();
                      }
                      }, false);
    
    document.getElementById("afd_pageturn")
    .addEventListener("touchstart", onStart,
                      false); 
    document.getElementById("afd_zoom").addEventListener("click",hiddenFontSizeLayout,false);
    document.getElementById("afd_zoomin").addEventListener("click",fontSizeZoomin,false);
    document.getElementById("afd_zoomout").addEventListener("click",fontSizeZoomout,false);
    document.getElementById("afd_bookshelf").addEventListener("click",exitReading,false);
    document.getElementById("afd_TOC").addEventListener("click",openTOCPage,false);
    document.getElementById("afd_bookmark").addEventListener("click",addBookmark,false);
    /*document.getElementById("afd_continuReading").addEventListener("touchstart",backReadingPage,false);*/
}

function initDom(path) 
{
    var srcPath =path;
    var bodyContent =$("body").html();           
    $("body").empty();
    var menu ="<div id='afd_menu' style='background-image: url(\""+srcPath+"/image/afd_topmenu.png\");'><div id='afd_bookshelf'><img src='"+srcPath+"/image/afd_back.png'/></div><div id='afd_TOC'><img src='"+srcPath+"/image/afd_tablecontentsbtn.png'/></div><div id='afd_title'></div><div id='afd_zoom'><img src='"+srcPath+"/image/afd_fontsize.png'/></div><div id='afd_zoomout'><img src='"+srcPath+"/image/afd_font_zoomout.png'/></div><div id='afd_zoomin'><img src='"+srcPath+"/image/afd_font_zoomin.png'/></div><div id='afd_bookmark'><img src='"+srcPath+"/image/afd_bookmark.png'/></div></div>";
    var pageturn ="<div id='afd_pageturn'></div>";
    var content = "<div id='afd_content'></div>";
    
    
    $("body").append(menu);
    $("body").append(pageturn);
    $("#afd_pageturn").append(content);
    $("body").append("<div id='currentPage'></div>"); 
    
    $("#afd_content").html(bodyContent);
    $("#afd_content").append("<span id='afd_break'><p></p></span>");
    
    
    layoutHeight = $(window).height() -20;
    layoutWidth = $(window).width()-10;
    $("#afd_menu").width($(window).width());
    $("#afd_pageturn").width(layoutWidth);
    $("#afd_content").width(layoutWidth - 20);
    $("#afd_pageturn").height(layoutHeight);
    $("#afd_content").height(layoutHeight - 20);
    $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
    $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
    $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
    
    layoutRight = $("#afd_break").position().left;
    pages = layoutRight / layoutWidth;    
    currentPage = 1;
    resizeMenu();
    $(window).resize(function() {
                     layoutHeight = $(window).height() -20;
                     layoutWidth = $(window).width() - 10;
                     $("#afd_menu").width($(window).width());
                     $("#afd_pageturn").width(layoutWidth);
                     $("#afd_content").width(layoutWidth - 20);
                     $("#afd_pageturn").height(layoutHeight);
                     $("#afd_content").height(layoutHeight - 20);
                     $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
                     $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
                     layoutRight = $("#afd_break").position().left;
                     pages = layoutRight / layoutWidth;  
                     $("#currentPage").html(readProportion(currentPage,pages));
                     resizeMenu();
                     });
    if (navigator.userAgent.match(/Android/i)) {
                Android.resizePage();
    }
    if (navigator.userAgent.match(/iPhone/i)) {
                window.location = 'anreader:myaction:resizePage';
    }
}

$(document).ready(function(){initDom(path);});