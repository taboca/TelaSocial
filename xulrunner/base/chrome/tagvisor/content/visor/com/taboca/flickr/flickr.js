function flickr_Widget() {

	this.start = function () { 

//		this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=98393462@N00&tags=mozfisl10&lang=en-us&format=rss_200');
		this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=mozchile09');
		this.feed.setNumEntries(20);

		this.element = document.createElement('div');
		this.picQueue = new Array();

		document.getElementById(this._getId()).appendChild(this.element);

		this.refElement = document.createElement("div");
		this.element.appendChild(this.refElement);

		//this.__mycontainer.appendChild(this.element);
		
		window.setInterval( (function(){this.updateFeed()}).bind(this),10000);

	} 

	this.init = function() {
	}

	this.popPic = function() {
		if (this.picQueue.length == 0) return false;

		var k = document.createElement('div');
		k.className = 'photo';
		var t = this.picQueue.pop();

		t = t.match(/<img[^>]+>/);
		t = t.toString();
		
		t = t.replace(/width="\d+"/, 'style="width:700px"');
		t = t.replace(/height="\d+"/, '');
		
		k.innerHTML = t;
		//this.element.appendChild(k);
		this.element.insertBefore(k, this.element.firstChild);

		return true;
	}


	this.updateFeed = function() {
		if (! this.popPic()) {
			this.feed.load(this.__feedUpdated.bind(this));
		}
	}

	this.__feedUpdated = function(result) {

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


	this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=mozchile09');
	this.feed.setNumEntries(20);

	}

	return this;
}

