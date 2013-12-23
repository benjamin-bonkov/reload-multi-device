<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Reload Multi Device</title>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<script src="http://<?php echo $_SERVER['SERVER_NAME']; ?>:9000/socket.io/socket.io.js"></script>
	<script src="http://modernizr.com/downloads/modernizr-latest.js"></script>
	<link rel="stylesheet" href="http://meyerweb.com/eric/tools/css/reset/reset.css">
	<style>
		body{
			width: 100%;
			height: 100%;
		}
	</style>
</head>
<body>
<iframe src="" frameborder="0" id="iframe" width="100%" height="100%" sandbox="allow-same-origin allow-scripts allow-top-navigation allow-forms"></iframe>
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="client.js" type="text/javascript"></script>
</body>
</html>