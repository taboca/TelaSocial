c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "https://twitter.com/statuses/user_timeline/176536278.rss",

	styleElement: null, 
	feed    : null, 

	style : <><![CDATA[

	]]></>, 

	start : function() {
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);
	},
	init : function () { 
		this.feed = this._service_jquery;
	} ,

	updateFeed : function() {
		var self =this; 
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });


		timer.setTimeout( function(){self.updateFeed()},1000*60*30);
	},

	__feedUpdated : function(xml) {


		this._dump("!!!");
		var self  = this; 
		try { 
		this.feed(xml).find('item').each(function(){
			var pubDate = self.feed(this).find('pubDate').text();
			var title   = self.feed(this).find('title').text();
			var link    = self.feed(this).find('link').text();
	
			var bgTitle = title.split("imagens_icmc: ")[1];	

			self._dump(bgTitle);
			self._coreDoc.body.setAttribute("style","background: url("+bgTitle+") no-repeat 50% 50%");

		});
		} catch (i) { self._dump(i)  }

	}
}
c.register(twitter);
