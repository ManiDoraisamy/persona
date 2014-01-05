<!DOCTYPE html>
<html lang="en">
	<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="assets/ico/favicon.png">
    <title>Persona</title>
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/normalize.css">
	<link rel="stylesheet" type="text/css" href="assets/css/component.css">
	
    <link href="css/style.css" rel="stylesheet">
	
    <script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/Chart.js"></script>
	<script src="assets/js/modernizr.custom.js"></script>
	
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,300,700' rel='stylesheet' type='text/css'>
    
    <link rel="stylesheet" href="http://js.arcgis.com/3.8/js/esri/css/esri.css">
    <script src="http://js.arcgis.com/3.8/"></script>
	</head>

	<body data-spy="scroll" data-offset="0" data-target="#gn-menu" id="pane">
	</body>
	
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/retina.js"></script>
	<script src="assets/js/classie.js"></script>
	<script type="text/javascript" src="assets/js/smoothscroll.js"></script> 
	<script src="assets/js/gnmenu.js"></script>
	<script src="/js/ejs_production.js"></script>
	<script src="/js/spokes.js"></script>
	<script src="/js/persona.js"></script>
	<script src="/js/speciality.js"></script>
	<script>
		var persona = new Persona("<%=request.getParameter("email")%>");
		persona.load();
		//new gnMenu( document.getElementById( 'gn-menu' ) );
	</script>
</html>
