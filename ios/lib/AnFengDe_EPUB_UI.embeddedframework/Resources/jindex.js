var selectAll = 0;
var isDownloading = false;
var injectBackJS = "unInjectBackJS";
var displayAddButton = false;

$(document).ready(function(){
                  setLayoutLocation(document.body.scrollHeight);
                  getAllBooks();
                  addListener();
                  showAddButton();
                  });
function showAddButton(){
    if (!displayAddButton){
        $("#import").hide();
        $("#edit").hide();
    }
}
function setLayoutLocation(bodyHeight){
	$("#afd_bookshelf").height(bodyHeight-86);
	$("#afd_bookshelf").width($("#container").width()-16);
	$("#afd_bookshelf_border").height(bodyHeight-70);
}
function addListener(){
    $("#quit").bind("click",function(){exit();});
    $("#localbutton").bind("click",function(){androidLocalAddBooks();});
    $("#importbutton").bind("click",function(){importBook();$("#afd_local").hide();});
    $("#downloadbutton").bind("click",function(){downloadBook();});
    $("#downloadcancel").bind("click",function(){downloadCancel();});
    $("#import").bind("click",function(){openImportPage();});
    $("#edit").bind("click",function(){editing();});
    $("#afd_editDelete").bind("click",function(){deleteBooks();});
    $("#afd_editAll").bind("click",function(){selectAllBooks();});
    $("#afd_editCancel").bind("click",function(){cancelDelete();});
    $("#afd_showInternet").bind("click",function(){internetOptionClicked();});
    $("#afd_showLocal").bind("click",function(){localOptionClicked()});
    $("#afd_showWifi").bind("click",function(){wifiOptionClicked();});
    $(".close").bind("click",function(){$("#afd_internet").hide();$("#afd_local").hide();});
}
/** click on local button and hide other options */
function localOptionClicked(){
    $("#afd_internet").hide();
    $("#afd_local").show();
    $("#afd_showLocal").css('color','#5A9A30');
    $("#afd_showWifi").css('color','#000000');
    $("#afd_showInternet").css('color','#000000');
}
function internetOptionClicked(){
    $("#afd_internet").show();
    $("#afd_local").hide();
    $("#afd_showLocal").css('color','#000000');
    $("#afd_showWifi").css('color','#000000');
    $("#afd_showInternet").css('color','#5A9A30');
}
function wifiOptionClicked(){
    $("#afd_internet").hide();
    $("#afd_local").hide();
    $("#afd_showLocal").css('color','#000000');
    $("#afd_showWifi").css('color','#5A9A30');
    $("#afd_showInternet").css('color','#000000');
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:openWifi';
    }
}
/** open add-book page */
function openImportPage(){
    if (!isDownloading){$("#downloadcancel").css('color','grey');downloadProgress(0);}
    if (isDownloading){$("#downloadbutton").css('color','grey');downloadProgress(1);}
    $(".afd_selectBg").hide();
    $("#afd_editMenu").hide();
    
    $("#edit img").attr("src","../image/afd_index_edit.png");
    
    if (navigator.userAgent.match(/Android/i)) {
        $("#afd_showWifi").hide();
        $("#afd_local").show();
        $("#afd_showLocal").css('color','#5A9A30');
        $("#afd_showWifi").css('color','#000000');
        $("#afd_showInternet").css('color','#000000');
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)){
        $("#afd_showLocal").hide();
        $("#afd_showWifi").hide();
        $("#afd_internet").show();
        $("#afd_showLocal").css('color','#000000');
        $("#afd_showWifi").css('color','#000000');
        $("#afd_showInternet").css('color','#5A9A30');
    }
    
    window.location = "#openModa";
}

function downloadBook(){
    if (isDownloading){return;}
    //$("#downloadbutton").css('color','#5A9A30');
    //setTimeout(function(){$("#downloadbutton").css('color','#000000');},200);
	var fileurl = $("#fileurl").attr("value");
    if (fileurl==""){
        alert("Please enter a book url!")
        return;
    }
	if (navigator.userAgent.match(/Android/i)) {
		setDownLoadButtonStatus(1);
		downloadProgress(0);
        Android.downloadBook(fileurl);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:downloadBook:afd:'+fileurl;
    }
}
function downloadCancel(){
    if (!isDownloading){return;}
    //$("#downloadcancel").css('color','#5A9A30');
    //setTimeout(function(){$("#downloadcancel").css('color','#000000');},200);
	if (navigator.userAgent.match(/Android/i)) {
        Android.downloadCancel();
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:downloadCancel';
    }
}

function androidLocalAddBooks(){
    $("#localbutton").css('color','#5A9A30');
    setTimeout(function(){$("#localbutton").css('color','#000000');},200);
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
/** invoke native code to delete book from db and cache folder */
function realizeDeleting(bookString){
	if (bookString==null) return;
	if (navigator.userAgent.match(/Android/i)) {
        Android.deleteBooks(bookString);
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:deleteBooks:afd:'+bookString;
    }
}
/** show the edit-buttons */
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
/** pass the bookpath to native code to open the book */
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
/** invoke android native code to add the book into db and then create it in bookshelf */
function importBook(){
    $("#importbutton").css('color','#ffffff');
    setTimeout(function(){$("#importbutton").css('color','#000000');},200);
	var bookPath = $('#filepath').attr('value');
    if (navigator.userAgent.match(/Android/i)) {
		Android.jsImportBook(bookPath);
	}
	window.location = "#close";
}
/** get all books in db and then invoke native code to create them in bookshelf */
function getAllBooks()
{
    if (navigator.userAgent.match(/Android/i)) {
		Android.getAllBooks();
	}
	if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
		window.location = 'anreader:afd:myaction:afd:getAllBooks';
	}
}

function selectBook(ev,element){
    $(element).toggle();
    ev.stopPropagation();
}
/** check the book status, if the "display" is "none" that means the book will be deleted */
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
function downloadProgress(progress){
    $("#afd_dprogress").css({"width":progress+"%"});
    $("#afd_dpercent").text(progress+"%");
}

function setDownLoadButtonStatus(downloadStatus){
    if (downloadStatus==0){
        isDownloading = false;
    }
    else
        isDownloading = true;
    if (!isDownloading){$("#downloadcancel").css('color','grey');$("#downloadbutton").css('color','#000000');}
    if (isDownloading){$("#downloadbutton").css('color','grey');$("#downloadcancel").css('color','#000000');}
}
/** the native code invoke this method to create bookshelf */
function creatBookShelf(id, name, author, coverimage, bookpath)
{
    var bookTag ="<ul><li class='li_coverimage'><div class='afd_selectBg'><img class='afd_edit_selectedPng' src='../image/afd_edit_selected.png'/></div><span class='bookname'></span><img class='coverimage' src='"+coverimage+"'/></li><li class='li_baseimage'><img class='baseimage' src='../image/afd_bookbase.png'/></li></ul>";
    //alert(""+bookTag);
    $("#afd_books").append(bookTag);
    $(".bookname::last").text(name);
    $(".afd_edit_selectedPng::last").attr("value",id);
    //alert($("ul::last").attr("value"));
    $(".afd_selectBg::last").bind("click",function(ev){selectBook(ev,this.getElementsByTagName("img")[0]);});
    $(".li_coverimage::last").bind("click",function(){openBook(bookpath);});
    setLayoutLocation(document.body.scrollHeight);
}

