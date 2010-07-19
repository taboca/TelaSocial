c     = require("choreographer");
timer = require("timer");

var clock_Widget =  {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,

 	// Feed data 
	// example wather yahoo - view-source:http://weather.yahooapis.com/forecastrss?w=455823
	// this is for porto alegre
	feed: null, 
	feedURL: "http://weather.yahooapis.com/forecastrss?w=455823",

	elementWeather: null, 
	elementClock  : null, 

	kill : function () { 
		c.kill(this);
	},
	start : function () { 

		var mainDiv      = this._coreDoc.createElement('div');
		mainDiv.setAttribute("width","320");
		mainDiv.setAttribute("style","text-align:center;padding:10px;-moz-border-radius:25px; margin-top:0px;margin-left:70px;width:320px;  height:180px;color:black; ; overflow:hidden; ");
		this._coreDoc.getElementById(this._getId()).appendChild(mainDiv);

		this.elementWeather = this._coreDoc.createElement('div');
		//this.elementClock   = this._coreDoc.createElement('div');

		//this.elementClock.setAttribute("style","color:black;font-size:34px;font-weight:bold;");
		this.elementWeather.setAttribute("style","color:black;font-size:14px;font-weight:bold;");
		//mainDiv.appendChild(this.elementClock);
		mainDiv.appendChild(this.elementWeather);

		//this.elementClock.innerHTML="<span>:</span>";

		this.feed = this._service_jquery;

		var self = this;
                timer.setTimeout( function(){self.updateFeed()},10000);
		//this.tick();

	} ,

	updateFeed : function() {
		var self = this;
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		timer.setTimeout( function(){self.updateFeed()}, 60 * 1000);
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
		timer.setTimeout( function () { scopedThis.tick() }, 1000);

	},

	init : function () { 

	} 

}

c.register(clock_Widget);
