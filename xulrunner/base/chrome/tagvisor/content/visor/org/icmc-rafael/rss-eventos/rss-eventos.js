c     = require("choreographer");
timer = require("timer");

var rsseventos =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://www.icmc.usp.br/eventos/feed/",
	feed    : null, 
	style : <><![CDATA[
		#storetempEventos {
			margin: 0 auto; // nao funciona - "centralizar"
		}
		.tweetdateEventos { 
			color:blue;
			font-weight:bold;
			font-size:32px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em;
		}
		.tweetauthor { 
			color:gray; 
		} 
		.tweetpublicEventos {
			color:black;
			font-size:40px;
			font-weight:bold;
			-moz-border-radius:12px;
			background-color: rgba(255,255,255,.5);
			-moz-box-shadow: rgba(255,255,255,.5) 0 0 10px; 
			padding:10px;
			margin:10px;
		} 
		.twitterPanelEventos { 
			width:100%;
		} 
	]]></>, 
	start : function() {

                this.elementStore = this._coreDoc.createElement('div');
		this.elementStore.setAttribute("id","storetempEventos");
		this._coreDoc.getElementById(this._getId()).appendChild(this.elementStore);

		this.element = this._coreDoc.createElement('div');

		this.element.className="twitterPanelEventos";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttwitterEventos";
		first.id = this.firstId;

		this.tweetRepeated = {};
		this.element.appendChild(first);
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},
	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		//this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed = this._service_jquery;
	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('div');
		k.className = 'tweetpublicEventos';
		k.innerHTML = t;
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	dateControl : function(pubDate) {
		var year, month, day, hour, weekday;
		var phrase;		// this phrase will be the date in a specific format 
		
		day = pubDate.slice(5,7);		// example: 22
		month = pubDate.slice(8,11);	// example: Sep
		year = pubDate.slice(12,16);	// example: 2010
		hour = pubDate.slice(17,22);	// example: 10:00:00
		weekday = pubDate.slice(0,3);	// example: Wed
		
		// example: transforming month from 'Sep' to '09' 
		if(month == 'Jan')
			month = '01';
		else
		if(month == 'Feb')
			month = '02';
		else
		if(month == 'Mar')
			month = '03';
		else
		if(month == 'Apr')
			month = '04';
		else
		if(month == 'May')
			month = '05';
		else
		if(month == 'Jun')
			month = '06';
		else
		if(month == 'Jul')
			month = '07';
		else
		if(month == 'Aug')
			month = '08';
		else
		if(month == 'Sep')
			month = '09';
		else
		if(month == 'Oct')
			month = '10';
		else
		if(month == 'Nov')
			month = '11';
		else
		if(month == 'Dec')
			month = '12';

		// example: transforming weekday from "Wed" to "Qua"
		if(weekday == 'Sun')
			weekday = 'Dom';
		else
		if(weekday == 'Mon')
			weekday = 'Seg';
		else
		if(weekday == 'Tue')
			weekday = 'Ter';
		else
		if(weekday == 'Wed')
			weekday = 'Qua';
		else
		if(weekday == 'Thu')
			weekday = 'Qui';
		else
		if(weekday == 'Fri')
			weekday = 'Sex';
		else
		if(weekday == 'Sat')
			weekday = 'Sab';
		
		phrase = weekday.concat(", ", day, "/", month, "/", year, " ", hour);
		return phrase;
	},

	updateFeed : function() {
		if (! this.popTweet()) {
			var self =this; 
			this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},
	__feedUpdated : function(xml) {

		var self  = this; 
		this.feed(xml).find('item').each(function(){
			var partDate;	/* partDate - Particular of a specified country */
			var pubDate = self.feed(this).find('pubDate').text();
			var title   = self.feed(this).find('title').text();
			var link    = self.feed(this).find('link').text();
			
			partDate = self.dateControl(pubDate);
			self.tweetQueue.push( '<span class="tweetdateEventos">' + partDate + '</span>' + title);
			
		});

	}
}
c.register(rsseventos);
