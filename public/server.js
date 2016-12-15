var http = require('http');
var fs = require('fs');
var express = require('express');
var url = require('url');
var base = ("./Documents/WDT2016/public/");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(base));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
	"/media/logo.png":["image/png","media/logo.png"],
	"/todos":["text/html","form2.html"]
}

function onRequest(req,res){
	if(req.method == 'GET' && routes[req.url]){
		res.writeHead(200, {"Content-Type":routes[req.url][0]});
		fs.createReadStream(base+routes[req.url][1]).pipe(res);
	}else{
		send404Response(res);
	}
}

app.post("/addTodo", function (request, response) {

	var id = request.body.id;
	console.log(request.body.id);
	var task = request.body.task;
	var date = request.body.date;
	var time = request.body.time;
	var important = request.body.important;
	var note = request.body.note;

	res.send(id,task,date,time,important,note);
});

var todosText = base + "todos.json";

fs.watch(todosText, function () {
	console.log("File changed!");
});

http.createServer(app).listen(8080);
console.log("Server is now running");
console.log("Now watching" + todosText);