var express = require("express");
var app = express();
var http = require("http").Server(app);
var io= require("socket.io")(http);
var site = "";
var musicSite="";
var htmlEncode = require('htmlencode').htmlEncode;

io.on("connection", (socket)=>{

	socket.on("talk", (msg)=>{
		if(msg.indexOf("site:") ==0){
			site= msg.substring(5);
		}else if(msg.indexOf("img:") == 0){
			io.emit("talk", "<img src='"+htmlEncode(msg.substring(4))+"'/>");
		}else if(msg.indexOf("music:") ==0){
			musicSite = msg.substring(6);
		}else if(msg.indexOf("color:") == 0){
			var tmp = msg.substring(6);
			var sp = tmp.split(":");
			io.emit("talk", "<p style='color:"+sp[0]+"'>"+htmlEncode(sp[1])+"</p>");
		}
		else{
			io.emit("talk", htmlEncode(msg));
		}
	});

});

var handler = setInterval(()=>{
		io.emit("change", site);
		io.emit("music", musicSite);
},100);

app.get("/", (req, res)=>{
	res.sendFile(__dirname+"/index.html");
});

http.listen(9999);

