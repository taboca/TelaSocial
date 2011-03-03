function news_usp_Widget() {

	this.crop = "50";

	this.title = "USP News Global";
	this.feedURL = "http://search.twitter.com/search.atom?q=math";
	this.feedURL = "http://www4.usp.br/index.php/noticias?format=feed&type=rss";

	this.feedURL = "http://search.twitter.com/search.atom?q=math";
	this.feedURL = "http://search.twitter.com/search.atom?q=%23inct-sec";
	this.feed = new google.feeds.Feed(this.feedURL);
	this.feed.setNumEntries(10);

	this.start = function() {

		this.element = document.createElement('div');
		this.element.className="tweetpanel";
		this.element.setAttribute("style","background: transparent url(com/taboca/news_usp/mini.png) 5px 10px no-repeat");
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = document.createElement("div");

		this.tweetRepeated = {};

		this.element.appendChild(first);

		document.getElementById(this._getId()).appendChild(this.element);

		window.setInterval( (function(){this.updateFeed()}).bind(this),10000);

	}

	this.init = function () { 

	} 
	this.popTweet = function() {
		if (this.tweetQueue.length == 0) return false;

		var t = this.tweetQueue.pop();
		//t=t.substr(this.crop);
		
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;

		var k = document.createElement('div');
		k.className = 'tweet';

		k.innerHTML = " " + t;

		//visualplayer.displayWidget(k);
		this.element.insertBefore(k, this.element.firstChild);


		return true;
	}


	this.updateFeed = function() {
		if (! this.popTweet()) {
			this.feed.load(this.__feedUpdated.bind(this));
		}
	}

	this.__feedUpdated = function(result) {

		if (result.error || result.feed.entries < 1) {
			//console.log('no entries');
			return;
		}

		var i;

		//console.log(result.feed.entries.length);
		for (i = 0; i < result.feed.entries.length; i++) {
			if (result.feed.entries[i]) {
				this.tweetQueue.push(result.feed.entries[i].title );
			}
		}

		this.lastid = result.feed.entries[i-1].link.match(/\d+$/);
		this.feed = new google.feeds.Feed(this.feedURL + '&since_id=' + this.lastid);
		this.feed.setNumEntries(10);
	}


	return this;

}


