function VoiceReg(persona)
{
	this.persona = persona;
	this.recognition = new webkitSpeechRecognition();
	
	this.listen = function()
	{
		var curr = this;
		var final_transcript = "";
		this.recognition.continuous = true;
		this.recognition.interimResults = true;
		this.recognition.onstart = function() {
		};
		this.recognition.onresult = function(event) {
		    var interim_transcript = '';
		    for (var i = event.resultIndex; i < event.results.length; ++i) {
		      if (event.results[i].isFinal) {
		        final_transcript += event.results[i][0].transcript;
		      } else {
		        interim_transcript += event.results[i][0].transcript;
		      }
		    }
	    	console.dir(final_transcript);
		    var ltrn = interim_transcript.toLowerCase();
		    if(ltrn.indexOf("next") >= 0 || ltrn.indexOf("text") >= 0)
		    {
		    	console.dir(ltrn);
		    	curr.persona.next();
		    }
		};
		this.recognition.onerror = function(event) {
			
		};
		this.recognition.onend = function() {
			
		};
		this.recognition.start();
	}
	
	this.stop = function()
	{
		this.recognition.stop();
	}
}

function Persona(email)
{
	this.email = email;
	this.photo = null;
	this.data = {};
	this.recommend = 0;
	this.events = [];
	this.template = new EJS({url: '/js/home.ejs'});
	this.spokes = new Spokes("http://127.0.0.1:32001/Spokes");
	this.session = null;
	this.position = null;
	this.voice = new VoiceReg(this);
	
	this.load = function()
	{
		var curr = this;
		jQuery.ajax({
			url:"/persona", dataType:"json", type:"GET", data:{email:email},
			success: function(dao){ 
				curr.data = dao.entities[0];
				if(curr.data.photos.length>0)
					curr.photo = curr.data.photos[0].url;
				var max = curr.data.digitalFootprint.topics.length;
				for(var i = 0; i < max; i++) {
					var topic = curr.data.digitalFootprint.topics[i];
					if(speciality[topic.value]) {
						var focus = speciality[topic.value];
						for(var j = 0; j < focus.length; j++)
							curr.events.push(focus[j]);
					}
				}
				curr.render(); 
			},
			error: function(e){ console.dir(e); }
		});
		this.spokes.Device.deviceList( function(result) {
			console.dir(result);
			for(var i = 0; i < result.Result.length; i++)
			{
				var uid = result.Result[i].Uid;
				curr.spokes.Device.attach(uid, function(session){
					console.dir(session);
					curr.session = session.Result;
				});
			}
		});
		console.dir(this.voice.recognition);
		this.voice.listen();
	}
	
	this.getBio = function()
	{
		for(var i = 0 ; i < this.data.socialProfiles.length; i++)
		{
			var prof = this.data.socialProfiles[i];
			if(prof["bio"])
				return prof["bio"];
		}
		return null;
	}
	
	this.getEvents = function()
	{
		var curr = this;
		jQuery.ajax({
			url:"http://api-m2x.att.com/v1/feeds/c29496fac7ca2eca0df0775c3c015d3b/location", dataType:"json", type:"GET", data:{},
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("X-M2X-KEY", "fc49d4cf996747de24fb0cf0824aa0e0");
			},
			success: function(dao){ 
				console.dir(dao);
			},
			error: function(e){ console.dir(e); }
		});
	}
	
	this.turnOn = function()
	{
		var curr = this;
		jQuery("#pane").html("<h1 class='col-lg-6 col-lg-offset-3 loading'>User is Online. Preparing recommendation...</h1>");
		setTimeout(function () { 
		  navigator.geolocation.getCurrentPosition(function(position){
			  curr.position = position;
			  curr.showMap(); 
		  });
		}, 1000);
	}
	
	this.next = function()
	{
		this.recommend++;
		if(this.recommend >= this.events.length)
			this.recommend = 0;
		this.showMap();
	}
	
	this.showMap = function()
	{
		var curr = this;
		var lng = this.position.coords.longitude;
		var lat = this.position.coords.latitude;
		lng = lng<-115.1&&lng>-115.2?lng:-115.1937;
		lat = lat<36.2&&lat>36.1?lat:36.115;
		var maptmpl = new EJS({url:'/js/map.ejs', cache:false});
		var mhtm = maptmpl.render(this);
		jQuery("#pane").html(mhtm);
		var map;
		require([
         "esri/map",
         "esri/arcgis/utils",
         "esri/dijit/Legend",
		 "esri/symbols/PictureMarkerSymbol",
         "esri/graphic", 
         "esri/geometry/Point",
         "dojo/domReady!"
		], 
		function ( Map, arcgisUtils, Legend, PictureMarkerSymbol, Graphic, Point) {
		    map = new Map("locate", {
		        center: [lng, lat],
		        zoom: 17,
		        basemap: "streets"
		    });
		    map.on("load", function(){
			    var symbol =  new PictureMarkerSymbol({
			        "url":curr.photo,
			        "height":25,
			        "width":25
			    });
			    var pt = new Point(lng,lat);
			    var graphic = new Graphic(pt, symbol);
			    map.graphics.add(graphic);
			    
			    var eve = curr.events[curr.recommend];
			    var esymbol = new PictureMarkerSymbol({
			        "url":eve.url,
			        "height":50,
			        "width":50
			    });
			    var ept = new Point(eve.longitude,eve.latitude);
			    var egraphic = new Graphic(ept, esymbol);
			    map.graphics.add(egraphic);
		    });
		});
	}
	
	this.turnOff = function()
	{
		var curr = this;
		jQuery("#pane").html("<h1 class='col-lg-6 col-lg-offset-3 loading'>User has gone Incognito. Disconnecting...</h1>");
		setTimeout(function () { 
			curr.render();
		}, 1000);
	}
	
	this.render = function()
	{
		var thtml = this.template.render(this);
		jQuery("#pane").html(thtml);
	}
}

setInterval(function () { 
	if ( !persona.spokes.Device.isAttached ) return;
	
	persona.spokes.Device.events( function(result) {
		if ( result["Result"] && result.Result.length>0 )
		{
			for(var i = 0; i < result.Result.length; i++)
			{
				var evt = result.Result[i];
				if(evt["Event_Name"] == "Don")
					persona.turnOn();
				else if(evt["Event_Name"] == "Doff")
					persona.turnOff();
			}
		}
	});
}, 2000);