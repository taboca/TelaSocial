c     = require("choreographer");
timer = require("timer");

var acontece =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	feedURL : "http://www.ifsc.usp.br/eventos_rss.php",
	feed    : null, 
	style : <><![CDATA[
		.acontece_date { 
			color:white;
			font-weight:bold;
			font-size:22px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em
		}
		.acontece_panel { 
			color:black;
			font-size:30px;
			font-weight:bold;
			-moz-border-radius:12px;
			background-color: rgba(255,255,255,.4);
			-moz-box-shadow: rgba(255,255,255,.4) 0 0 20px; 
			padding:10px;
			height:135px;
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
		timer.setTimeout( function(){self.updateFeed()},20000);

		this._coreDoc.getElementById(this._getId()).addEventListener("social-focus",function handle(e) { self.focus(e) } , false);
	},
 
  	focus: function (e) { 
		//this._dump(e); 
        },

	setupContainer: function () { 
		this.element.innerHTML="";
		var first = this._coreDoc.createElement("div");
		this.firstId = "acontece_first";
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
		//for (i = result.feed.entries.length-1; i >=0 ; i--) {
		var maxi = result.feed.entries.length-1;
		if (maxi>6) maxi=5; 
		for (i=maxi;i>=0;i--) {
			if (result.feed.entries[i]) {
				var t =  '<span class="acontece_date"> ' + result.feed.entries[i].publishedDate + '</span>' + result.feed.entries[i].title;
				var k = this._coreDoc.createElement('div');
				k.className = 'acontece_panel';
				k.innerHTML = t;
				this.element.insertBefore(k, this.element.firstChild);
			}
		}

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},30000);
	}

}

c.register(acontece);
