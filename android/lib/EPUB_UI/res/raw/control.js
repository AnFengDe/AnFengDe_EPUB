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
	$("#currentPage").html(readProportion(currentPage,parseInt(pages)+1));
}
function readProportion(currentPage,pages)
{
	var value =(size+chapterSize*(currentPage/pages))/bookSize;
	value = parseInt(value*100*10000)/10000.0;
	return value+"%";
}
document.addEventListener("DOMContentLoaded", addListener, false);

function onStart(ev) 
{
    layoutRight = $("#afd_break").position().left;
    if (layoutRight==10) pages=1;
    else pages = layoutRight / layoutWidth; 
    startX = ev.touches[0].pageX;
    leftPosition = $("#afd_content").position().left;
    if (tempPosition != leftPosition) {
        leftPosition = tempPosition;
    }
}

function addListener()
{
    document.getElementById("afd_pageturn")
            .addEventListener(
                    'touchend',
                    function(ev) {
                        var halfWidth = layoutWidth / 2;
                        if (startX >= halfWidth) {
                            if (currentPage < pages
                                    && moveTemp < -halfWidth * 0.5) {

                                tempPosition = leftPosition - layoutWidth;
                                $("#afd_content").animate({
                                    left : tempPosition
                                }, 100);
                                currentPage = currentPage + 1;
                                $("#currentPage").html(readProportion(currentPage,parseInt(pages)+1));

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
                                $("#currentPage").html(readProportion(currentPage,parseInt(pages)+1));

                            } else
                                $("#afd_content").animate({
                                    left : leftPosition
                                }, 100);
                        }
                        moveTemp = 0;
                    }, false);
                    
    document.getElementById("afd_pageturn")
            .addEventListener('touchmove',
            function(ev) {
                var tempX = ev.touches[0].pageX;
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
}

function initDom() 
{
    var bodyContent =$("body").html();           
    $("body").empty();
    var pageturn ="<div id='afd_pageturn'></div>";
    var content = "<div id='afd_content'></div>";
    $("body").append(pageturn);
    $("#afd_pageturn").append(content);
    $("#afd_pageturn").append("<div id='currentPage'></div>"); 
    
    $("#afd_content").html(bodyContent);
    $("#afd_content").append("<span id='afd_break'><p></p></span>");
    
    
    layoutHeight = $(window).height() - 20;
    layoutWidth = $(window).width()-10;
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
    //$("#currentPage").html(readProportion(currentPage,parseInt(pages)+1));
    $(window).resize(function() {
        layoutHeight = $(window).height() - 20;
        layoutWidth = $(window).width() - 10;
        $("#afd_pageturn").width(layoutWidth);
        $("#afd_content").width(layoutWidth - 20);
        $("#afd_pageturn").height(layoutHeight);
        $("#afd_content").height(layoutHeight - 20);
        $("#afd_content img").css("maxWidth", (layoutWidth - 20) + "px");
        $("#afd_content audio").css("maxWidth", (layoutWidth - 20) + "px");
        $("#afd_content video").css("maxWidth", (layoutWidth - 20) + "px");
        layoutRight = $("#afd_break").position().left;
        pages = layoutRight / layoutWidth;  
        $("#currentPage").html(readProportion(currentPage,parseInt(pages)+1));
    });
}

$(document).ready(function(){initDom();});