var socialwidget =  {
	//feedURL : "http://identi.ca/api/statusnet/tags/timeline/fisl12.rss",
	feedURL : "http://identi.ca/api/statusnet/tags/timeline/fisl12.atom",
	feed    : null,
	
	start : function() {
		this.feed = $;
		this.element = document.createElement('div');
		this.element.className="content";
		this.element.id = Math.random();
		this.tweetQueue = new Array();
		var first = document.createElement("div");
		this.firstId = "firstsocialwidget";
		first.id = this.firstId;
		this.tweetRepeated = {};
		this.element.appendChild(first);
		document.body.appendChild(this.element);
		var self = this;
		setTimeout( function(){self.updateFeed()},1000);
	},

	popTweet : function() {
		if (this.tweetQueue.length == 0) { 
			var self = this;
			setTimeout( function(){self.updateFeed()},1000);
			return false;
		} 
		var t = this.tweetQueue.pop();
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = document.createElement('div');
		k.className = 'item';
		k.innerHTML = t;
		this.element.insertBefore(k, this.element.firstChild);

		var self=this;
		setTimeout( function () { self.popTweet() } ,5000);
		return true;
	},

	updateFeed : function() {
		var self = this; 
		this.feed.ajax( { type:"POST", url: this.feedURL, dataType: "xml", success: function (xml) { self.__feedUpdated(xml) } });
                //setTimeout( function(){self.updateFeed()},5000);

	},

	__feedUpdated : function(xml) {
		var self = this;
		var cc = 0;
		this.feed(xml).find('entry').each(function(){
			var title  = self.feed(this).find('title').text();
			var ddate = self.feed(this).find('published').text();
			var data = self.feed(this).find('description').text();
			var author = self.feed(this).find('author').find('link')[1].getAttribute("href");
	
			self.tweetQueue.push( "<img align='top' src='"+author+"' /><h3>" +  title + "</h3><div class='pubdate'>"+ddate + "</div>" );
		});
		self.popTweet();
	}
}

