var express = require("express");
var app = express();
var http = require("http").Server(app);
var io= require("socket.io")(http);
var site = "";
io.on("connection", (socket)=>{

	socket.on("talk", (msg)=>{
		if(msg.indexOf("site:") ==0){
			site= msg.substring(5);
		}else if(msg.indexOf("img:") == 0){
			io.emit("talk", "<img src='"+msg.substring(4)+"'/>");
		}
		else{
			io.emit("talk", msg);
		}
	});

	setInterval(()=>{
		io.emit("change", site);
	},100);
});

app.get("/", (req, res)=>{
	res.sendFile("C:\\Users\\sunzo\\index.html");
});

http.listen(9999);

