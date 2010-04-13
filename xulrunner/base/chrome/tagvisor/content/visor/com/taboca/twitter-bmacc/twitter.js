c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,

	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://search.twitter.com/search.atom?q=%23sxsw",
	feedURL : "http://twitter.com/statuses/user_timeline/75017337.rss",
	feedURL : "http://twitter.com/statuses/user_timeline/89443257.rss",
	feedURL : "http://search.twitter.com/search.atom?q=%23exalunosicmc",
	feed    : null, 

	style : <><![CDATA[
		

		.tweetauthor { 

			color:gray; 
		} 
		.tweetpublic { 
			color:#333;
			background-color:#ddd;
			font-size:20px;
			-moz-border-radius:12px;
			padding:20px;
			margin-top:5px;
		} 
		.twitterPanel { 
			padding:.5em;
		} 
	]]></>, 


	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.className="twitterPanel";
		 this.element.setAttribute("style","width:100%;height:100%;background: url(com/taboca/twitter/mini.png) 0 0 no-repeat;padding-top:1em;");
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttwitter";
		first.id = this.firstId;

		this.tweetRepeated = {};

		this.element.appendChild(first);


		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);

	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed.setNumEntries(10);

	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('div');
		k.className = 'tweetpublic';
		k.innerHTML = t;
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	updateFeed : function() {
		if (! this.popTweet()) {
			var self =this; 
			this.feed.load( function (e) {  self.__feedUpdated(e) } );
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	__feedUpdated : function(result) {
		if (result.error || result.feed.entries < 1) {
			return;
		}
		var i;
		for (i = 0; i < result.feed.entries.length; i++) {
			if (result.feed.entries[i]) {
				this.tweetQueue.push(result.feed.entries[i].content + ' <span class="tweetauthor">(by @' + result.feed.entries[i].author.replace(/ \(.*$/,'') + ')</span>');
			}
		}

		this.lastid = result.feed.entries[i-1].link.match(/\d+$/);
		this.feed = new this._service_google.feeds.Feed(this.feedURL + '&since_id=' + this.lastid);
		this.feed.setNumEntries(10);
	}

}

c.register(twitter);
