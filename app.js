var express = require('express'),
	app 	= express(),
	server 	= require('http').createServer(app),
	io 		= require('socket.io')(server),
	port 	= process.env.PORT || 5000;

// Assets
app.use(express.static(__dirname + '/'));


io.on('connection', function(client){
	console.log("Client connected!");

	client.on("join", function(name){
		client.nickname = name;
		io.emit("userJoined", name);
	});

	client.on("message", function(message){
		message = client.nickname + ": " + message;
		io.emit("message", message);
	});

	client.on("disconnect", function(){

	})
});


app.get("/", function(req, resp) {
	resp.sendFile(__dirname + "/index.html");
});



server.listen(port);