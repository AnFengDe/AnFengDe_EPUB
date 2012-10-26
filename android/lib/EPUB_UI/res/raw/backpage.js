
function addListener()
{
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
