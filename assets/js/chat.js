$(function(){

	var host = location.port ? window.location.hostname +":"+ location.port : window.location.hostname
	console.log(host);
	var server = io.connect(host);

	server.on("connect", function(data){
		var nickname = null;

		while (nickname === null || nickname === ""){
			nickname = prompt("What is your name?");
			server.emit("join", nickname);
		};		

		server.on("message", insertMessage);

		server.on("userJoined", addUser);
	})

	

	$("#inputMessage").submit(function(e){
		e.preventDefault();
		server.emit("message", $("input[name=msgInput]").val());
		$(this)[0].reset();
	})

	function insertMessage(msg){
		$("#chat ul").append("<li>" + msg + "</li>");
	}

	function addUser(name){
		insertMessage(name + " has joined the chat room")
		$("#users ul").append("<li>" + name + "<li>");
	}
});
