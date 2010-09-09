c     = require("choreographer");
timer = require("timer");

var fade_Widget =  {

        name        : __appName,
        feed    : null,

        target      : __targetName,
        targetId    : __targetId,
	zIndex      :10,
	refElement  : null, 
	imageNumber :0,
	element     : null,
	oldChild    :null,
	lastInserted : null,
	fadeCycle    : 0,

		
	start:function () { 
		try { 
		//this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=49750626@N07&lang=en-us&format=rss_200');
		this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=fisl&lang=en-us&format=rss_200');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.element = this._coreDoc.createElement('div');
		this.picQueue = new Array();
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);
		this.popPic();

		} catch(i) { this._dump(i) } 
	} ,

	init : function() {
	},

	popPic: function() {
		if (this.picQueue.length == 0) { 
			this._dump("Loading...");
			var these = this;
			this.feed.load( function (ref) { these.__feedUpdated(ref) } );
		} else { 
		var k = this._coreDoc.createElement('div');
		k.style.opacity=0.01;
		k.style.position="absolute"
		k.style.zIndex=this.zIndex;
		this.zIndex++;
		k.className = 'photo';
		var t = this.picQueue.pop();
		t = "<img id='fadeimage"+this.imageNumber+"' src='"+t+"' >";
		k.innerHTML = t;
		this.lastInserted = k;
		var oldOldChild=null;
		if(this.oldChild)  {
			oldOldChild=this.oldChild;	
		} 
		this.oldChild = this.element.firstChild;
		this.element.insertBefore(k, this.element.firstChild);
		if(oldOldChild) { 
			this.element.removeChild(oldOldChild);
		} 
		these = this;
		this._coreDoc.getElementById("fadeimage"+this.imageNumber).onload = function () { these.imageLoaded() };
		return true;
		} 
	},

	imageLoaded : function() { 
			this._dump("Image Loaded");
		var currImage =  this._coreDoc.getElementById("fadeimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 
		currImage.width=300;
		this.imageNumber++;
		this.kickFadeIn();
	},

	kickFadeIn : function () { 
		if(this.fadeCycle<=1) { 
			this.fadeCycle+=0.5;
			this.lastInserted.style.opacity= this.fadeCycle;
			var scopedThis = this;
                	timer.setTimeout( function () { scopedThis.kickFadeIn() }, 500);

		} else { 
this._dump("Q state = "+this.picQueue.length);

			this.fadeCycle=0;
			var scopedThis = this;
                	timer.setTimeout( function () { scopedThis.popPic() }, 5000);
		} 
	},

	updateFeed : function() {
		if (! this.popPic()) {
		}
	},

	__feedUpdated : function(result) {
		if (result.error ) {
			return;
		}

		var doc = result.xmlDocument;
		//var links = doc.getElementsByTagName("link");
		var links = doc.getElementsByTagNameNS("http://search.yahoo.com/mrss/","content");
		var i;
		for (i = 0; i < links.length; i++) {
		//	if (links[i].getAttribute("rel") == "enclosure") { 
				var currentLink = links[i];
				var src = currentLink.getAttribute("url");
				if(src.indexOf("jpg")>-1) { 
					this._dump(src);
					this.picQueue.push(src);
				} 
		//	} 
		}
		this.popPic();
	}
}

c.register(fade_Widget);
