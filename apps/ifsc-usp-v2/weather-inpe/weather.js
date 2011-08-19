var tempoWidget =  {
	feed: null, 
	feedURL: "http://weather.yahooapis.com/forecastrss?w=455823", // porto alegre
	feedURL: "http://weather.yahooapis.com/forecastrss?w=449704&u=c", // sao carlos
	feedURL: "http://servicos.cptec.inpe.br/RSS/cidade/4774/previsao.xml",
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
		var simples = content.split('Previsão para os próximos dias:')[0];
		var simples = simples.split('Centro de Previsão de Tempo e Estudos Climáticos/INPE')[1];
		this.elementWeather.innerHTML="<div id='title'>CPTEC/INPE</div><div id='previsao'>"+simples+"</div>";	
		setTimeout( function(){self.updateFeed()},  30000);
	}
}

