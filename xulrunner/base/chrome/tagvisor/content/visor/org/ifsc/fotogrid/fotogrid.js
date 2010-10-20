
c     = require("choreographer");
timer = require("timer");

var fade_Widget =  {

        name        : __appName,
        target      : __targetName,
        targetId    : __targetId,
        feed        : null,
	refElement   : null, 
	imageNumber  : 0,
	element      : null,
	picWidth     : 340, 
	picHeight    : 254, 
        picQueue     : null, 
        totalElements: 9, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

		//this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=53806588@N04&lang=pt-BR&format=RSS_200');
		this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=54803351@N05&lang=en-us&format=rss_200');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);

		this.picQueue = new Array();


		this.element = this._coreDoc.createElement('div');
		this.element.style.marginLeft="00px";
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);

		this.refContainers = new Array();

		for(var i=0; i<this.totalElements; i++) { 

			var k = this._coreDoc.createElement("span");
			k.style.width = this.picWidth + "px";
			k.style.height= this.picHeight + "px";
			k.style.marginLeft = "10px";
			k.style.marginTop ="50px"; 
			//k.style.border="5px solid black";
			k.style.overflow="hidden";
			k.style.display="inline-block";
			//k.style.backgroundColor="#555";
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
			currentContainer.innerHTML = "<img id='fadeimage"+this.imageNumber+"' src='"+t+"' style='-moz-box-shadow: black 5px 5px 10px;opacity:.3'>";
			these = this;
			this._coreDoc.getElementById("fadeimage"+this.imageNumber).onload = function () { these.imageLoaded() };
			return true;
		} 
	},

	imageLoaded : function() { 
		var currImage =  this._coreDoc.getElementById("fadeimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 

		if(x>=y) {
			currImage.width=this.picWidth-10;

			var yy = parseInt ((this.picHeight-parseInt((this.picWidth*y)/x))/2 );
			currImage.style.marginTop=yy+"px";
		} else { 
			
			currImage.height=this.picHeight-10;
			var xx = parseInt ((this.picWidth-parseInt((this.picHeight*x)/y))/2 );
			currImage.style.marginLeft=xx+"px";
			
		} 
		currImage.style.opacity="1";
		this.imageNumber++;
		this.kickFadeIn();
	},

	kickFadeIn : function () { 
		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 1000*30);
	},

	__feedUpdated : function(result) {
		if (result.error ) {
			return;
		}

		var doc = result.xmlDocument;
		var links = doc.getElementsByTagName("link");
		//var links = doc.getElementsByTagNameNS("http://search.yahoo.com/mrss/","content");
		var i;
		for (i = 0; i < links.length; i++) {

			/*
				var currentLink = links[i];
				var src = currentLink.getAttribute("url");
				if(src.indexOf("jpg")>-1) {
                                        this._dump(src);
                                        this.picQueue.push(src);
                                }
			*/

			 if (links[i].getAttribute("rel") == "enclosure") {
                                var currentLink = links[i];
                                var src = currentLink.getAttribute("href");
                                if(src.indexOf("jpg")>-1) {
                                        this._dump(src);
                                        this.picQueue.push(src);
                                }
                        }


		}
		this.popPic();
	}
}

c.register(fade_Widget);
