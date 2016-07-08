'use strict';

$(function(){
	// 初始化
	init();

	var socket = io("https://wall.cgcgbcbc.com");
	socket.on('connect', function(){
		console.log("connectet to server!");
	})

	var wall_move = $(".wall_move");

	// 删除第一条消息
	wall_move[0].addEventListener("webkitAnimationEnd", function(e){
		wall_move.removeClass("wall_move");
		var firstChild = wall_move[0].firstElementChild;
		firstChild.remove();
	}, false);

	// 每隔1s检查是否有多余3个元素，若是则继续往上移动。
	var timer_show_msg = setInterval(function(){
		if(wall_move.children().length + $(".wall").children().length - 1 > 3){
			wall_move.addClass('wall_move');
			wall_move[0].style.animationPlayState = "running";
		}
	}, 1000);

	// 接受新消息
	socket.on('new message', function(msg){
		msg_show(msg);
	});

	// 接受管理员消息
	var timer = null;
	var node_admin = null;
	socket.on('admin', function(msg){
		msg.headimgurl = "image/fun_image.jpg";
		if(timer !== null){
			msg_bind(node_admin, msg);
			clearTimeout(timer);
			timer = null;
		}
		else{
			node_admin = $(".msg").clone()[0];
			node_admin.className = "admin";
			msg_bind(node_admin, msg);
			$(".wall").prepend(node_admin);
			wall_move[0].firstElementChild.remove();
		}
		timer = setTimeout(function(){
			var node_admin_tmp = $(".msg").clone()[0];
			node_admin.remove();
			wall_move.prepend(node_admin_tmp);
			node_admin = node_admin_tmp;
			node_admin.className = "msg";
			timer = null;
		}, 10000);
	});

	// 展示消息
	function msg_show(msg){
		var node_new = $(".msg").clone()[0];
		msg_bind(node_new, msg);
		wall_move.append(node_new);
		wall_move.addClass('wall_move');
		wall_move[0].style.animationPlayState = "running";
	}

	// 将消息绑定到节点中
	function msg_bind(node, msg){
		// 获取待绑定的节点（有点麻烦，后续希望找到更简洁的方法）
		var node_useinfo = node.firstElementChild;
		var node_headimg = node_useinfo.firstElementChild.firstElementChild;
		var node_loadinggif = node_useinfo.firstElementChild.lastElementChild;
		var node_nickname = node_useinfo.lastElementChild;
		var node_content = node.lastElementChild; //.firstElementChild;
		// 将消息绑定到节点中
		node_headimg.src = msg.headimgurl;
		node_nickname.innerHTML =msg.nickname;

		// 根据消息的长度决定是否需要滚动
		// 字体大小在css中设计为高度的一半，由于第二个一定处于可视状态，因此使用第二个作为参照
		var fontSize = $(".content")[1].clientHeight / 3;
		if(msg.content.length * fontSize > $(".content")[1].clientWidth * 0.9){
			// node_content.style.animation = "sroll_left 7s linear infinite";
			node_content.innerHTML = "<marquee direction='left' scrollamount='50' style='font-size:" + fontSize + "px'>" + msg.content; + "</marquee>";
		}
		else{
			node_content.innerHTML = msg.content;
			// node_content.style.animation = "";
		}

		node_headimg.onload = function(){
			node_headimg.style.display = 'block';
			node_loadinggif.style.display = 'none';
		}
	}

	// 初始化时从服务器上获取三条历史信息并显示。
	function init(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		   if (xhttp.readyState == 4 && xhttp.status == 200) {
		   		var msgs = JSON.parse(xhttp.responseText)
		   		var msgs_node = $(".msg");
		   		for(var i = 0; i < 3; i++){
		   			msg_bind(msgs_node[i], msgs[2-i]);
		   		}
		   }
		};
		xhttp.open("GET", "https://wall.cgcgbcbc.com/api/messages?num=3", true);
		xhttp.send();
	}

});