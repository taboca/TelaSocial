c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://www.ifsc.usp.br/eventos_rss.php",
	feed    : null, 

	style : <><![CDATA[

		.tweetdate { 
			color:white;
			font-weight:bold;
			font-size:22px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em
		}

		.tweetauthor { 
			color:white; 
		} 

		.tweetpublic { 
			color:black;
			font-size:30px;
			font-weight:bold;
			-moz-border-radius:12px;
			background-color: rgba(255,255,255,.4);
			-moz-box-shadow: rgba(255,255,255,.4) 0 0 20px; 
			padding:10px;
			margin-top:10px;
			margin-bottom:10px;
		} 

	]]></>, 


	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.id = Math.random();
		this.tweetQueue = new Array();
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.setupContainer();

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	setupContainer: function () { 
		this.element.innerHTML="";
		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttwitter";
		first.id = this.firstId;
		this.tweetRepeated = {};
		this.element.appendChild(first);
	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed.setNumEntries(10);

	} ,
	popAll : function() {


	},

	updateFeed : function() {
		var self =this; 
		this.feed.load( function (e) {  self.__feedUpdated(e) } );
	},

	__feedUpdated : function(result) {
		this.setupContainer();
		if (result.error || result.feed.entries < 1) {
			return;
		}
		var i;
		for (i = result.feed.entries.length-1; i >=0 ; i--) {
			if (result.feed.entries[i]) {
				var t =  '<span class="tweetdate">' + result.feed.entries[i].publishedDate + '</span>' + result.feed.entries[i].title + ' <span class="tweetauthor">(Acontece no IFSC)</span>';
				var k = this._coreDoc.createElement('div');
				k.className = 'tweetpublic';
				k.innerHTML = t;
				this.element.insertBefore(k, this.element.firstChild);
			}
		}

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},30000);
	}

}

c.register(twitter);
