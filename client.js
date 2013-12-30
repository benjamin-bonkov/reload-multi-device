(function($){
	var urlSite ='http://10.249.3.23/labV2/', // Url du site. Doit être sous la forme suivante http://192.168.1.1/monsite/
	    iframe  = $('#iframe'),
	    socket  = io.connect(location.hostname + ':9000/'), // On écoute socket.io sur le port 9000
	    hash = window.location.hash;

	//Récupère le DOM tout entier, le supprime et le remplace par un DOM appellé en AJAX
	$.get(urlSite, function(){
		iframe.attr('src', urlSite)
		iframe.height(window.height);
	});

	//On demande un utilisateur et on l'envoi
	if(hash == '#login'){
		var user = prompt('Identifiant') || 'Utilisateur';
		socket.emit('newusr', user);
	}

	//Quand on reçois la demande de connexion pour admin, on envois la demande de mot de passe
	socket.on('adminpwd', function(user){
		var password = prompt('Mot de passe pour ' + user) || false
		socket.emit('password', password);
	})

	//Quand le couple identifiant/mot de passe est bon, on inscrit dans un session Storage
	socket.on('logged', function(){
		window.sessionStorage['logged'] = 1
		window.location.hash = "#admin";
	});

	//Si au chargement de la page, on as le hashtag admin et que la sessionstorage logged est là
	//On envoi une commande de refresh aux autres navigateurs
	if(hash == "#admin" && window.sessionStorage['logged']){
		socket.emit('refresh');
	}

	//Quand on reçoit la demande de refresh on récupère l'url du document et on le push dans l'url
	socket.on('refresh', function(){
		window.location=document.location.href;
	});

	//1 seconde après le chargement de la page, on execute getIframeDOM
	setTimeout(function(){getIframeDOM()}, 1000);

	//Récupère le DOM de l'iframe pour pouvoir avoir accès aux liens
	function getIframeDOM() {
		$('iframe').contents().find('a').click(function(e){
			e.preventDefault();
			var href = $(this).attr('href');
			socket.emit('changeIframeURL', href);
		})
	}

	//Quand on reçoit l'url de la page qui à changer, on l'envoi dans l'iframe
	//et on rééxécute getIframeDOM 1 seconde après
	socket.on('iframeHref', function(href){
		$('#iframe').attr('src', href);
		setTimeout(function(){getIframeDOM()}, 1000);
	})

	//Quand l'url de l'iframe est changée, on éxécute getIframeDOM
	socket.on('changeURL', function(){
		setTimeout(function(){getIframeDOM()}, 1000);
	})
})(jQuery);