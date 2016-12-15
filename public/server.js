var http = require('http');
var fs = require('fs');
var express = require('express');
var base = "./Documents/WDT2016/public/"
var app = express();

app.use(express.static(base))

function send404Response(res){
	res.writeHead(404, {"Content-Type":"text/plain"});
	res.write("Error 404: Page not found!");
	res.end();
}

var routes = {
	"/":["text/html","form2.html"],
	"/style.css":["text/css","style.css"],
	"/todo3.js":["text/javascript","todo3.js"],
	"/jquery-3.1.1.js":["text/javascript","jquery-3.1.1.js"],
	"/media/logo.png":["image/png","media/logo.png"]
}

function onRequest(req,res){
	if(req.method == 'GET' && routes[req.url]){
		res.writeHead(200, {"Content-Type":routes[req.url][0]});
		fs.createReadStream(base+routes[req.url][1]).pipe(res);
	}else{
		send404Response(res);
	}
}

http.createServer(app).listen(8080);
console.log("Server is now running");