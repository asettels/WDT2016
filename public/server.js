var http = require('http');
var fs = require('fs');
var base = "./Documents/WDT2016/public/"

function send404Response(res){
	res.writeHead(404, {"Content-Type":"text/plain"});
	res.write("Error 404: Page not found!");
	res.end();
}

function onRequest(req,res){
	if(req.method == 'GET' && req.url == '/'){
		res.writeHead(200, {"Content-Type":"text/html"});
		fs.createReadStream(base+"form2.html").pipe(res);
	}else{
		send404Response(res);
	}
}

http.createServer(onRequest).listen(8000);
console.log("Server is now running");