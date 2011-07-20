
c     = require("choreographer");
timer = require("timer");

var imagearray =  {

        name        : __appName,
        target      : __targetName,
        targetId    : __targetId,
        feed        : null,
	refElement   : null, 
	imageNumber  : 0,
	element      : null,
	picWidth     : 450, 
	picHeight    : 337, 
        picQueue     : null, 
        totalElements: 8, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

		this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=56306050@N03&lang=pt-br&format=rss_200');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);

		this.picQueue = new Array();


		this.element = this._coreDoc.createElement('div');
		this.element.style.height="100%";
		this.element.style.width="100%";
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);

		this.refContainers = new Array();

		for(var i=0; i<this.totalElements; i++) { 

			var k = this._coreDoc.createElement("span"); 
			this.element.insertBefore(k, this.element.firstChild);
			this.refContainers[i]=k;
		}

		this.popPic();

	},

	init : function() {
	},

	popPic: function() {
		if (this.picQueue.length == 0) { 
			var these = this;
			this.feed.load( function (ref) { these.__feedUpdated(ref) } );
		} else { 
			var t = this.picQueue.pop();
			this.refContainerCycle++;
			if(this.refContainerCycle == this.totalElements) { 
				this.refContainerCycle=0;
			} 
			var currentContainer = this.refContainers[this.refContainerCycle];
			currentContainer.innerHTML = "<img id='fadeimage"+this.imageNumber+"' src='"+t+"' style='opacity:.3'>";
			these = this;
			this._coreDoc.getElementById("fadeimage"+this.imageNumber).onload = function () { these.imageLoaded() };
			return true;
		} 
	},

	imageLoaded : function() { 
		var currImage =  this._coreDoc.getElementById("fadeimage"+this.imageNumber);

		currImage.style.opacity="1";
		this.imageNumber++;
		this.kickFadeIn();
	},

	kickFadeIn : function () { 
		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 10000);
	},

	__feedUpdated : function(result) {
		if (result.error ) {
			return;
		}

		var doc = result.xmlDocument;
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

c.register(imagearray);
