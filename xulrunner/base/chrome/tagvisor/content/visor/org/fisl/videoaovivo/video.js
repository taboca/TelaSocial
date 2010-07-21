c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://200.132.1.12:8000/status3.xsl",
	feed    : null, 
	style : <><![CDATA[
		.tweetdate { 
			color:gray;
			font-weight:bold;
			font-size:18px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em
		}
		.tweetauthor { 
			color:gray; 
		} 
		.tweetpublic { 
			color:black;
			font-size:20px;
			font-weight:bold;
			background-color: rgba(230,230,230,1);
			-moz-border-radius:20px;
			padding:10px;
			margin-bottom:15px;
		} 
		.twitterPanel { 
			width:1000px;
		} 
	]]></>, 
	start : function() {

		this.element = this._coreDoc.createElement("div");

		this.element.setAttribute("style","width:1000px;height:750px");
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.tweetQueue = new Array();

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},
	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = this._service_jquery;

	} ,
	popTweet : function() {
	
		this._dump("Videos = "+this.tweetQueue.length);
		if (this.tweetQueue && this.tweetQueue.length == 0) return false;
		

		var t = this.tweetQueue.pop();

		var title = t.title;
		var desc  = t.desc; 

		if (t.link in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t.link] = true;

		this.element.innerHTML="";
                this.elementv = this._coreDoc.createElement('video');
                this.elementv.setAttribute('width', '1000');
                this.elementv.setAttribute('autoplay', 'true');
                this.elementv.setAttribute('style', 'padding-left:0px');

		var scrap = "http" + t.desc.split("ogg")[0].split("http")[1] + "ogg";
		this._dump("video link = " + scrap );
                this.elementv.setAttribute('src', scrap);
                this.element.appendChild(this.elementv);

		return true;
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
		/*

		this.feed(xml).find('item').each(function(){
			var pubDate = self.feed(this).find('pubDate').text();
			var title   = self.feed(this).find('title').text();
			var link    = self.feed(this).find('link').text();
			var desc    = self.feed(this).find('description').text();
			self.tweetQueue.push( { link: link, title:title, description:desc } );
		});


		*/
		this.feed(xml).find('source').each(function(){
			var title   = "http://200.132.1.12:8000" + self.feed(this).find('title').text();
			var link    = self.feed(this).find('mount').text();
			var desc    = self.feed(this).find('artist').text();
			self.tweetQueue.push( { link: link, title:title, description:desc } );
		});

	}
}
c.register(twitter);
