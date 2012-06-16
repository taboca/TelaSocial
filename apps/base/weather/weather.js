var tempoWidget =  {
	feed: null, 
	feedURL: URL_WEATHER,
	elementWeather: null, 
	start : function () { 
		this.elementWeather = document.getElementById("weather");
		this.feed = new google.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
		var self = this;
		setTimeout( function(){self.updateFeed()},  1000);
	} ,
	updateFeed : function() {
		var self =this;
		this.feed.load( function (e) { self.__feedUpdated(e) } );
	},
	__feedUpdated : function(result) {
		var self  = this; 
     		var content = $(result.xmlDocument).find('description').text();
		var simple = content.split("Forecast:")[0];
		this.elementWeather.innerHTML="<div id='title'>Yahoo! Weather</div><div id='previsao'>"+simple+"</div>";	
		setTimeout( function(){self.updateFeed()},  TEMPO_REFRESH_WEATHER);
	}
}

