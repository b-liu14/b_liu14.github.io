function myalert(arg) {
    // deal with the arguments.
    var draggable = true;
    var content = "";
    var closeKey = 27; // esc\
    if (typeof arg === "string") {
        content = arg;
    } else {
        content = arg.content;
        draggable = arg.draggable;
        closeKey = arg.closeKey;
    }

    // init the alert body
    var myalertBody = document.createElement("div");
    myalertBody.id = "myalertBody";
    myalertBody.style.width = "300px";
    myalertBody.style.height = "auto";
    myalertBody.style.background = "white";
    myalertBody.style.opacity = "0.9";
    myalertBody.style.zIndex = "1000";
    myalertBody.style.position = "absolute";
    myalertBody.style.left = "100px";
    myalertBody.style.top = "100px";
    myalertBody.style.border = "thin solid"
    document.body.appendChild(myalertBody);

    // init the alert head
    var myalertHead = document.createElement("div");
    myalertHead.id = "myalertHead";
    myalertHead.style.height = "25px";
    myalertHead.style.background = "blue";
    myalertHead.style.opacity = "0.7";
    myalertBody.appendChild(myalertHead);

    // init the alert title
    var myalertTitle = document.createElement("div");
    myalertTitle.id = "myalertTitle";
    myalertTitle.innerHTML = "<span style = 'color: white; margin-left:10px'>myalert</span>";
    myalertHead.appendChild(myalertTitle);

    // init the alert conntent
    var myalertContent = document.createElement("div");
    myalertContent.id = "myalertContent";
    myalertContent.style.marginTop = "10px";
    myalertContent.style.marginLeft = "10px";
    myalertContent.innerHTML = content;
    myalertBody.appendChild(myalertContent);

    // init the alert close button
    var myalertClose = document.createElement("button");
    myalertClose.id = "myalertClose";
    myalertClose.innerHTML = "close";
    myalertClose.style.marginRight = "10px";
    myalertClose.style.marginBottom = "10px";
    myalertClose.style.marginTop = "10px";
    myalertClose.style.float = "right";
    myalertBody.appendChild(myalertClose);

    // deal with the drag event
    if (draggable) {
        // params before dragging
        var x0 = 0;
        var y0 = 0;
        var left0 = 0;
        var top0 = 0;
        // ohter params
        var dragging = false;
        // mousedown event
        myalertHead.onmousedown = function(event) {
                event = event ? event : window.event;
                if (event.button !== 0) {
                    return;
                }
                dragging = true;
                left0 = parseInt(myalertBody.style.left);
                top0 = parseInt(myalertBody.style.top);
                x0 = event.screenX;
                y0 = event.screenY;
            }
            // mouseup event
        document.onmouseup = function(event) {
                dragging = false;
            }
            // mouseup event
        document.onmousemove = function(event) {
            event = event ? event : window.event;
            if (dragging) {
                var x1 = event.screenX;
                var y1 = event.screenY;
                myalertBody.style.left = left0 + x1 - x0 + "px";
                myalertBody.style.top = top0 + y1 - y0 + "px";
            }
        }
    }
    // click event： close my alert
    myalertClose.onclick = function() {
        var myalertBody = document.getElementById("myalertBody");
        myalertBody.parentNode.removeChild(myalertBody);
    }
    // keyboard event: close my alert
    document.onkeydown = function(event){
        event = event ? event : window.event;
        if(event.which === closeKey){
            var myalertClose = document.getElementById("myalertClose");
            var mEvent = document.createEvent("MouseEvents");
            mEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            myalertClose.dispatchEvent(mEvent);
        }
    }
}

// var myalertClose = document.getElementById("myalertClose");