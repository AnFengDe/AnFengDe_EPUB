
function addListener()
{
    document.getElementById("afd_back").addEventListener("click",function(){back();},false);
    document.getElementById("afd_dayAndNightOptions").addEventListener("click",function(){getSettings(this);},false);
    $("#afd_fontColorOptions").change(function(){getSettings(this)});
    $("#afd_fontStyleOptions").change(function(){getSettings(this)});
    $("#afd_backgroundOptions").change(function(){getSettings(this)});
    document.getElementById("afd_ttsSettings").addEventListener("click",function(){ttsSetting();},false);
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
/** Getting the obj value */
function getSettings(obj){
    //alert(obj.options[obj.selectedIndex].text);
    if ($(obj).attr("id")=="afd_fontColorOptions"){
        var key = "fontColor";
        var value = obj.options[obj.selectedIndex].value;
        storeData(key,value);
        storeData("fontColorIndex",obj.selectedIndex);
    }
    if ($(obj).attr("id")=="afd_fontStyleOptions"){
        var key = "fontStyle";
        var value = obj.options[obj.selectedIndex].value;
        storeData(key,value);
        storeData("fontStyleIndex",obj.selectedIndex);
    }
    if ($(obj).attr("id")=="afd_backgroundOptions"){
        var key = "background";
        var value = obj.options[obj.selectedIndex].value;
        storeData(key,value);
        storeData("backgroundIndex",obj.selectedIndex);
    }
    if ($(obj).attr("id")=="afd_dayAndNightOptions"){
        //        alert($(obj).attr("value"));
        var key = "dayAndNightModel";
        var value = $(obj).attr("value");
        if (value=="day"){
            value = "night";
            $("#afd_dayAndNightOptions").attr("value",value);
            $("#afd_dayAndNightOptions img").attr("src","../image/afd_day.png");
        }
        else{
            value = "day";
            $("#afd_dayAndNightOptions").attr("value",value);
            $("#afd_dayAndNightOptions img").attr("src","../image/afd_night.png");
        }
        storeData(key,value);
    }
}
/** Store settings */
function storeData(key,value){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            if (value=="default"){
                localStorage.removeItem(key);
            }
            else
                localStorage.setItem(key,value);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}
/** Read settings */
function readingSettings(){
    if (typeof(localStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            
            var fontColorIndex = localStorage.getItem("fontColorIndex");
            if (fontColorIndex==null){
                fontColorIndex = 0;
            }
            var fontStyleIndex = localStorage.getItem("fontStyleIndex");
            if (fontStyleIndex==null){
                fontStyleIndex = 0;
            }
            var backgroundIndex = localStorage.getItem("backgroundIndex");
            if (backgroundIndex==null){
                backgroundIndex = 0;
            }
            var dayAndNightModle = localStorage.getItem("dayAndNightModel");
            if (dayAndNightModle==null){
                dayAndNightModle = "day";
            }
            
            var settingsArray = new Array();
            settingsArray.push(fontColorIndex);
            settingsArray.push(fontStyleIndex);
            settingsArray.push(backgroundIndex);
            settingsArray.push(dayAndNightModle);
            return settingsArray;
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); 
            }
        }
    }
}
/** Init options value */
function initOptions(settingsArray){
    document.getElementById("afd_fontColorOptions").options[settingsArray[0]].selected = true;
    document.getElementById("afd_fontStyleOptions").options[settingsArray[1]].selected = true;
    document.getElementById("afd_backgroundOptions").options[settingsArray[2]].selected = true;
    $("#afd_dayAndNightOptions").attr("value",settingsArray[3]);
    if (settingsArray[3]=="day"){
        $("#afd_dayAndNightOptions img").attr("src","../image/afd_night.png");
    }
    else
        $("#afd_dayAndNightOptions img").attr("src","../image/afd_day.png");	
}
function ttsSetting(){
    if (navigator.userAgent.match(/Android/i)) {
        Android.ttsSetting();
    }
    if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)) {
        window.location = 'anreader:afd:myaction:afd:ttsSetting';
    }
 
}
$(document).ready(function(){
                  addListener();
                  var settingsArray = readingSettings();
                  initOptions(settingsArray);
                  });