// DOM implement
function backToTopInit(){
    "use strict";
    var body = document.getElementsByTagName("body")[0];
    var btt = document.createElement('div');

    btt.id = "backToTop";
    btt.style.right = "10px";
    btt.style.bottom = "10px";
    body.appendChild(btt);

    window.onscroll = function(){
        var distToTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(distToTop === 0){
            btt.style.display = "none";
        }
        else{
            btt.style.display = "block";
        }
    }

    var timer = null;
    btt.onclick = function(){
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(function() {
            var distToTop = document.body.scrollTop || document.documentElement.scrollTop;
            var spd = Math.ceil(distToTop / 20);
            document.documentElement.scrollTop = (distToTop - spd);
            document.body.scrollTop = (distToTop - spd);
            if (distToTop === 0) {
                clearInterval(timer);
            };
        }, 10);
    }
    document.onkeydown = function(e){
        var ch = String.fromCharCode(e.which);
        if (ch === "T" || ch === "t") {
            var mEvent = document.createEvent("MouseEvents");
            mEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            btt.dispatchEvent(mEvent);
        }
    }

    // change the pos of btt
    if(arguments.length === 0){
        return;
    }
    var arg = arguments[0];
    var bttW = (+  btt.style.width.slice(0, -2));
    var bttH = (+ btt.style.height.slice(0, -2));
    var winH = document.documentElement.clientHeight;
    var winW = document.documentElement.clientWidth;
    // default
    if(arg.x !== undefined && arg.x > 0 && arg.x < winW - bttW){
        btt.style.removeProperty('right');
        btt.style.left = arg.x + "px";
    }
    if(arg.y !== undefined && arg.y > 0 && arg.x < winH - bttH){
        btt.style.removeProperty('bottom')
        btt.style.top = arg.y + "px";
    }
    if(arg.LeftTop === true){
        btt.style.removeProperty('right');
        btt.style.removeProperty('bottom');
        btt.style.left = "10px";
        btt.style.top = "10px";
    }
    else if(arg.RightTop == true){
        btt.style.removeProperty('left');
        btt.style.removeProperty('bottom');
        btt.style.right = "10px";
        btt.style.top = "10px";
    }
    else if(arg.LeftBottom == true){
        btt.style.removeProperty('right');
        btt.style.removeProperty('top');
        btt.style.left = "10px";
        btt.style.bottom = "10px";
    }
    else if(arg.RightBottom == true){
        btt.style.removeProperty('left');
        btt.style.removeProperty('top');
        btt.style.right = "10px";
        btt.style.bottom = "10px";
    }
}


// jQuery implement
// "use strict";
// var body = $("body");
// var btt = $('<div id = "backToTop"></div>');
// btt.appendTo(body);

// var timer = null;
// var winH = document.documentElement.clientHeight;

// $(window).scroll(function() {
//     var distToTop = $(window).scrollTop();
//     if (distToTop === 0) {
//         btt.css("display", "none");
//     } else {
//         btt.css("display", "block");
//     }
// });
// btt.click(function() {
//     if (timer != null) {
//         clearInterval(timer);
//         timer = null;
//     }
//     timer = setInterval(function() {
//         var distToTop = $(window).scrollTop();
//         var spd = Math.ceil(distToTop / 20);
//         $(window).scrollTop(distToTop - spd);
//         if (distToTop === 0) {
//             clearInterval(timer);
//         };
//     }, 10);
// });
// var doc = jQuery(document);
// doc.keydown(function(event) {
//     if (event.which == 84) { // t
//         btt.click();
//     }
// });