var express = require('express'),
		app     = express(),
		md5     = require('MD5');

app.configure(function(){
	app.use(express.static(__dirname));
})

var server = app.listen(9000);
console.log('Server running on port 9000');

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	//On récupère l'utilisateur
	socket.on('newusr', function(user){
		//Si l'utilisateur est l'admin
		if(user == 'admin'){
			socket.emit('adminpwd', user);
		}
	});

	//Vérification du mot de passe
	socket.on('password', function(password){
		if(md5(password) == "21232f297a57a5a743894a0e4a801fc3"){
			socket.emit('logged');
		}
	})
	//Envoi de la demande de refresh à tous les clients connecté sauf l'éméteur
	socket.on('refresh', function(){
		socket.broadcast.emit('refresh')
	})

	//Action effectuée quand l'url de l'iframe va changer
	socket.on('changeIframeURL', function(href){
		console.log(href);
		socket.broadcast.emit('iframeHref', href);
		socket.emit('changeURL');
	})
});