
var tempoWidget =  {

	feed: null, 
	feedURL: "http://weather.yahooapis.com/forecastrss?w=455823",

	elementWeather: null, 
	elementClock  : null, 

	start : function () { 

		var mainDiv = document.createElement('div');
		document.body.appendChild(mainDiv);
		this.elementWeather = document.createElement('div');
		this.elementWeather.setAttribute("style","color:black;font-size:14px;font-weight:bold;");
		mainDiv.appendChild(this.elementWeather);
		this.feed = $;
		var self = this;
                setTimeout( function(){self.updateFeed()},10000);
	} ,

	updateFeed : function() {
		var self = this;
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		setTimeout( function(){self.updateFeed()}, 60 * 1000);
	},

	__feedUpdated : function(xml) {
		var self  = this; 
		var content = self.feed(xml).find('description').text();
		this.elementWeather.innerHTML=content;	
	},

	tick : function () {
		this.data = new Date();
		var text = this.data.toLocaleTimeString();
		text = text.replace(/:..( [AP]M)$/, '$1');
		this.elementClock.innerHTML = text;
		var scopedThis = this;
		setTimeout( function () { scopedThis.tick() }, 1000);
	}
}
