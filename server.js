var express = require('express'),
		app     = express();

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
		if(password == "admin"){
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
		socket.emit('iframeHref', href);
		socket.broadcast.emit('iframeHref', href);
		socket.emit('changeURL');
	})
});