
function addListener()
{
    /* //    var oButton = document.createElement("button"); 
    //    oButton.id = "shop01"; 
    //    oButton.style.position = 'absolute';
    //    oButton.style.top = 0; 
    //    oButton.style.left = 0; 
    //    oButton.style.with = "50px";
    //    oButton.style.height = "48px";
    //    oButton.style.background = '#FFFF00'; 
    //    oButton.style.visibility = 'visible'; 
    //    oButton.innerHTML="back"; 
    //    document.body.appendChild(oButton); 
    //    oButton.onclick = abc; 
    //    function abc(){ 
    //        alert("abc"); 
    //    } 
    //    var startPageX = 0;
    //    var startClientX =0 ;
    //    var stopPageX = 0;
    //    alert(window.innerWidth);*/
    document.ontouchstart = function onStart(ev){
        startPageX = ev.touches[0].pageX;
        startClientX = ev.touches[0].clientX;  
    };
    document.ontouchend = function onEnd(ev){
        if ((startPageX==startClientX)&&(stopPageX-startPageX)>window.innerWidth/2){
            if (navigator.userAgent.match(/Android/i)) {
                Android.back();
            }
            if (navigator.userAgent.match(/iPhone/i)) {
                window.location = 'anreader:myaction:back';
            } 
        }
    };
    document.ontouchmove = function onMove(ev){
        stopPageX = ev.touches[0].pageX;
    };
}
