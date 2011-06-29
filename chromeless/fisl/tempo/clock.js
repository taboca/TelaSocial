var tempoWidget =  {
	feed: null, 
	feedURL: "http://weather.yahooapis.com/forecastrss?w=455823",
	elementWeather: null, 
	elementClock  : null, 
        mos: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	start : function () { 
		var mainDiv = document.createElement('div');
		document.body.appendChild(mainDiv);
		this.elementWeather = document.getElementById("weather");
		this.elementClock   = document.createElement('div');
		this.elementClock.setAttribute("id","clock");
		mainDiv.appendChild(this.elementClock);
		this.feed = $;
		var self = this;
		this.tick();
		//setTimeout( function(){self.updateFeed()},  1000);

	} ,

	updateFeed : function() {
		var self = this;
try { 
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) }, error: function(i,a,q) {  }  });
} catch (i) { alert(i) } 
	},

	__feedUpdated : function(xml) {

		var self  = this; 
		var content = self.feed(xml).find('description').text();
		this.elementWeather.innerHTML=content;	
		setTimeout( function(){self.updateFeed()},  1000);
	},
	tick : function () {
		this.data = new Date();
		var text = this.data.toLocaleTimeString();
		//text = text.replace(/:..( [AP]M)$/, '$1');
		this.elementClock.innerHTML = text;
		var scopedThis = this;
		setTimeout( function () { scopedThis.tick() }, 1000);

	var ddd = new Date();
	var yy = ddd.getFullYear();
	var dd = ddd.getDate();
	var mm = this.mos[ddd.getMonth()];
	document.getElementById("weather").innerHTML="Porto Alegre, "+ dd + " "+ mm + " " + yy;

	}
}

