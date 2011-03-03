c     = require("choreographer");
timer = require("timer");

var flickr =  {
        name   : __appName,
        target : __targetName,
        targetId : __targetId,

	feedURL : 'http://api.flickr.com/services/feeds/photos_public.gne?id=49750626@N07&lang=en-us&format=rss_200',
	feedURL : 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mozchile09',

	start : function () { 

                this.feed = new this._service_google.feeds.Feed(this.feedURL);

		this.feed.setNumEntries(20);

		this.element = this._coreDoc.createElement('div');
		this.picQueue = new Array();

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);


                var self = this;
                timer.setTimeout( function(){self.updateFeed()},1000);

	} ,

	init : function() {
	},

	popPic : function() {
		if (this.picQueue.length == 0) return false;

		var k = this._coreDoc.createElement('div');
		k.className = 'photo';
		var t = this.picQueue.pop();

		t = t.match(/<img[^>]+>/);
		t = t.toString();
		
		t = t.replace(/width="\d+"/, 'style="width:300px"');
		t = t.replace(/height="\d+"/, '');
		
		k.innerHTML = t;
		//this.element.appendChild(k);
		this.element.insertBefore(k, this.element.firstChild);

		return true;
	},


	updateFeed : function() {
		if (! this.popPic()) {
			this.feed.load(this.__feedUpdated.bind(this));
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
				//console.log(result.feed.entries[i]);
				this.picQueue.push(result.feed.entries[i].content);
			}
		}


			//this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=mozchile09');
			//this.feed.setNumEntries(20);

	}

}

c.register(flickr);
