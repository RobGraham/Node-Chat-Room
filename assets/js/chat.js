$(function(){

	var host = location.port ? window.location.hostname +":"+ location.port : window.location.hostname,
		server = io.connect(host),
		userList = $("#users ul"),
		chatBox = $("#chat"),
		chatBoxUL = chatBox.find("ul");

	server.on("connect", function(data){
		var nickname = null;

		while (nickname === null || nickname === ""){
			nickname = prompt("What is your name?");
			server.emit("join", nickname);
		};		
		server.on("message", insertMessage);
		server.on("userConnected", userConnected);
		server.on("userDisconnected", userDisconnected);
	})

	

	$("#inputMessage").submit(function(e){
		e.preventDefault();
		server.emit("message", $("input[name=msgInput]").val());
		$(this)[0].reset();
	})

	function insertMessage(msg){
		chatBoxUL.append("<li>" + msg + "</li>");

		chatBox[0].scrollTop = chatBox[0].scrollHeight;
	}

	function userConnected(data){
		insertMessage(data.name + " has joined the chat room");
		updateUserList(data.connected_users);
	}

	function userDisconnected(data){
		insertMessage(data.name + " has left the chat room");
		userList.find("li[data-client-id='" + data.client_id + "']");
	}

	function updateUserList(users){
		var userArr = users.map(function(user){
			return "<li data-client-id=" + user.client_id + ">" + user.name + "</li>";
		}).join("");

		userList.html(userArr);
	}
});
