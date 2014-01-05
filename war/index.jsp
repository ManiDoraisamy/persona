<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="assets/ico/favicon.png">

    <title>Persona</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/main.css" rel="stylesheet">
    
	<link rel="stylesheet" type="text/css" href="assets/css/normalize.css">
	<link rel="stylesheet" type="text/css" href="assets/css/component.css">
	
    <link href="css/style.css" rel="stylesheet">

	
    <script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/Chart.js"></script>
	<script src="assets/js/modernizr.custom.js"></script>
	

	
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,300,700' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
      <script src="assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body data-spy="scroll" data-offset="0" data-target="#gn-menu">
  	<!-- ========== MAIN MENU ========== -->
	<div class="container">
		<ul id="gn-menu" class="gn-menu-main">
			<li class="gn-trigger">
				<a class="gn-icon gn-icon-menu"><span>Menu</span></a>
				<nav class="gn-menu-wrapper">
					<div class="gn-scroller">
						<ul class="gn-menu">
							<li class="gn-search-item">
								<input placeholder="Search" type="search" class="gn-search">
								<a class="gn-icon gn-icon-search"><span>Search</span></a>
							</li>
							<li><a href="#home" class="gn-icon gn-icon-home smoothScroll">Home</a></li>
							<li><a href="#about" class="gn-icon gn-icon-archive smoothScroll">About</a></li>
							<li><a href="#portfolio" class="gn-icon gn-icon-pictures smoothScroll">Portfolio</a></li>
							<li><a href="#blog" class="gn-icon gn-icon-article smoothScroll">Blog</a></li>
							<li><a href="#contact" class="gn-icon gn-icon-envelop smoothScroll">Contact</a></li>
						</ul>
					</div><!-- /gn-scroller -->
				</nav>
			</li>
			<li><a href="#home" class="smoothScroll">Persona</a></li>
		</ul>
	</div><!-- /container -->
		
	
	<!-- ========== HEADER SECTION ========== -->
	<section id="home" name="home"></section>
	<div id="headerwrap" style="
  background: url(../img/voyager_legend_man_dog_screen_rgb_screen_102212.jpg) no-repeat center center fixed; min-height:725px;">
		<div class="container">
			<div class="col-lg-7">
				<h1>Welcome to <br/>Palms Resort</h1>
				<form role="form" action="home.jsp" method="get" enctype="plain">
				  <div class="col-lg-9">
				  	<input type="name" name="email" class="form-control" id="name1" 
				    	placeholder="Enter your email and pick up your headset.">
				  </div>
				  <div class="col-lg-3">
				  	<input type="submit" class="btn-large btn-theme" value="Check-in"></input>
				  </div>
				</form>
			</div>
			<div class="col-lg-5">
			</div>
		</div><!-- /container -->
	</div><!-- /headerwrap -->
	

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/retina.js"></script>
	<script src="assets/js/classie.js"></script>
    <script type="text/javascript" src="assets/js/smoothscroll.js"></script> 
	<script src="assets/js/gnmenu.js"></script>
	<script>
		new gnMenu( document.getElementById( 'gn-menu' ) );
	</script>  
	
  </body>
</html>
