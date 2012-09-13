var app =  {
	feedURL : URL_DESTAQUES,
	feed    : null, 

	start : function() {
		this.element = document.createElement('div');
		this.element.className="appPanel";
		this.element.id = Math.random();
		this.tweetQueue = new Array();
		var first = document.createElement("div");
		this.firstId = "firstapp";
		first.id = this.firstId;
		this.tweetRepeated = {};
		this.element.appendChild(first);
		document.getElementById("container").appendChild(this.element);
		var self = this;
		setTimeout( function(){self.updateFeed()},500);
	},

	init : function () { 
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(t8l.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	} ,
	
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var obj = this.tweetQueue.pop();
		var t = obj.title; 
		var d = obj.desc; 
		
		var k = document.createElement('div');
		k.className = 'app_element';
		//k.innerHTML = '<table height="200" width="100%" border="0"><tr><td valign="iddle"><div class="title">'+t+'</div><div class="description">'+d+'</div></td></tr></table>';
		k.innerHTML = '<table height="200" width="100%" border="0"><tr><td valign="iddle"><div id="inner" class="title">'+t+'</div></td></tr></table>';

		
		var old = this.element.firstChild;
		this.element.insertBefore(k, this.element.firstChild);
		this.element.removeChild(old);

		$('#container').attr('style','-moz-transition-property: -moz-transform; -moz-transition-duration: 1s; -moz-transform:perspective(400px) rotateX(0deg);');
		setTimeout(function () { 
			$('#container').attr('style','-moz-transform-origin:50% 50%;-moz-transition-property: -moz-transform; -moz-transition-duration: 1s; -moz-transform:perspective(400px) rotateX(-90deg);');
		}, 2000);
		setTimeout(function () { 
			$('#container').attr('style',' -moz-transform:perspective(400px) rotateX(90deg);');
		}, 4000);
		return true;
	},

	updateFeed : function() {
		var self = this;
		if (! this.popTweet()) {
			this.feed.load( function (e) { self.__feedUpdated(e) } );
		}
		setTimeout( function(){self.updateFeed()},5000);
	},

	__feedUpdated : function(result) {
		var self  = this;
		if (result.error) {
			return;
		}
     		$(result.xmlDocument).find('item').each(function(){
                        var title = $(this).find('title').text();
                        var description = "";
			description+=$(this).find('description').text();
			self.tweetQueue.push( { title: title, desc: description } );
                });
	}
}


