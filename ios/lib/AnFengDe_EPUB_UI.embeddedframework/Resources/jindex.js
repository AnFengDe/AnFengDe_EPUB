var selectAll = 0;
$(document).ready(function(){
                  getAllBooks();
                  addListener();
                  });

function addListener(){
    $("#quit").bind("click",function(){exit();});
    $("#localbutton").bind("click",function(){addBooks();});
    $("#importbutton").bind("click",function(){importBook();$("#afd_local").hide();});
    $("#downloadbutton").bind("click",function(){downloadBook();});
    $("#import").bind("click",function(){openImportPage();});
    $("#edit").bind("click",function(){editing();});
    $("#afd_editDelete").bind("click",function(){deleteBooks();});
    $("#afd_editAll").bind("click",function(){selectAllBooks();});
    $("#afd_editCancel").bind("click",function(){cancelDelete();});
    $("#afd_showInternet").bind("click",function(){$("#afd_internet").show();$("#afd_local").hide();});
    $("#afd_showLocal").bind("click",function(){$("#afd_internet").hide();$("#afd_local").show();});
    $("#afd_showWifi").bind("click",function(){$("#afd_internet").hide();$("#afd_local").hide();});
    $(".close").bind("click",function(){$("#afd_internet").hide();$("#afd_local").hide();});
}
function openImportPage(){
    $(".afd_selectBg").hide();
    $("#afd_editMenu").hide();
    
    $("#edit img").attr("src","../image/afd_index_edit.png");
	$('article.tabs section').removeClass('current');
    
    if (navigator.userAgent.match(/Android/i)) {
        $("#afd_showWifi").hide();
        $("#afd_showLocal").closest('section').addClass('current');
        $("#afd_local").show("slow");
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)){
        $("#afd_showLocal").hide();
        $("#afd_showWifi").hide();
        $("#afd_showInternet").closest('section').addClass('current');
        $("#afd_internet").show("slow");
    }
    window.location = "#openModa";
}
function downloadBook(){
	var fileurl = $("#fileurl").attr("value");
    if (fileurl==""){
        alert("Please enter a book url!")
        return;
    }
	if (navigator.userAgent.match(/Android/i)) {
        Android.downloadBook(fileurl);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:downloadBook:afd:'+fileurl;
    }
}

function addBooks(){
	if (navigator.userAgent.match(/Android/i)) {
        Android.addBooks();
    }
}
function deleteBooks(){
    var bookIdArray = checkBookStatus();
    var tempBooks = null;
    for (var i=0;i<bookIdArray.length;i++){
        tempBooks = tempBooks + bookIdArray[i]+"afd";
    }
    bookString = tempBooks;
    realizeDeleting(bookString)
}
function realizeDeleting(bookString){
	if (bookString==null) return;
	if (navigator.userAgent.match(/Android/i)) {
        Android.deleteBooks(bookString);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:deleteBooks:afd:'+bookString;
    }
}
function editing(){
    $(".afd_selectBg").toggle();
    if ($("#edit img").attr("src")=="../image/afd_index_edit.png"){
        $("#edit img").attr("src","../image/afd_edit_back.png");
        $("#afd_editMenu").show("fast");
    }
    else{
        $("#edit img").attr("src","../image/afd_index_edit.png");
        $("#afd_editMenu").hide("fast");
    }
}
function selectAllBooks(){
    if (selectAll == 0){
        $("#afd_books").find(".afd_edit_selectedPng").show();
        //$("#afd_editAll img").attr("src","../image/afd_edit_allorang.png");
        selectAll = 1;
    }
    else {
        $("#afd_books").find(".afd_edit_selectedPng").hide();
        //$("#afd_editAll img").attr("src","../image/afd_edit_all.png");
        selectAll = 0;
    }
}
function cancelDelete(){
    $("#afd_books").find(".afd_edit_selectedPng").hide();
    //$("#afd_editAll img").attr("src","../image/afd_edit_all.png");
    selectAll = 0;
}

function openBook(bookPath){
    if (navigator.userAgent.match(/Android/i)) {
		Android.openBook(bookPath);
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:openBook:afd:'+bookPath;
	}
}

function exit(){
    if (navigator.userAgent.match(/Android/i)) {
		Android.exit();
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:exit';
	}
}

function importBook(){
	var bookPath = $('#filepath').attr('value');
    if (navigator.userAgent.match(/Android/i)) {
		Android.jsImportBook(bookPath);
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:importBook:afd:'+bookPath;
	}
	window.location = "#close";
}

function getAllBooks()
{
    if (navigator.userAgent.match(/Android/i)) {
		Android.getAllBooks();
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:getAllBooks';
	}
}
//function outHtml()
//{
//    alert("out html");
//    if (navigator.userAgent.match(/Android/i)) {
//		Android.outHtml;
//	}
//	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
//		window.location = 'anreader:myaction:outHtml'+$("html").html();
//	}    
//}
function selectBook(ev,element){
    $(element).toggle();
    ev.stopPropagation();
}
function checkBookStatus(){
    var bookIdArray = new Array();
    var uls = $("#afd_books").find("ul");
    for (var i=0;i<uls.length;i++){
        var element = $(uls[i]).find(".afd_edit_selectedPng");
        if ($(element).css("display")!="none"){
            bookIdArray.push(i);
            var key = $(element).attr("value");
            deleteBookmark(key);
        }
    }
    return bookIdArray;
}
function deleteBookmark(key){
	if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}

function creatBookShelf(id, name, author, coverimage, bookpath)
{
    var bookTag ="<ul><li class='li_coverimage'><div class='afd_selectBg'><img class='afd_edit_selectedPng' src='../image/afd_edit_selected.png'/></div><span class='bookname'></span><img class='coverimage' src='"+coverimage+"'/></li><li class='li_baseimage'><img class='baseimage' src='../image/afd_index_bookbase.png'/></li></ul>";
    //alert(""+bookTag);
    $("#afd_books").append(bookTag);
    $(".bookname::last").text(name);
    $(".afd_edit_selectedPng::last").attr("value",id);
    //alert($("ul::last").attr("value"));
    $(".afd_selectBg::last").bind("click",function(ev){selectBook(ev,this.getElementsByTagName("img")[0]);});
    $(".li_coverimage::last").bind("click",function(){openBook(bookpath);});
}

