c     = require("choreographer");
timer = require("timer");

var fade_Widget =  {

        name   : __appName,
        target : __targetName,
        targetId    : __targetId,
	zIndex      :10,
	imageNumber :0,
	oldChild    :null,
	lastInserted : null,
	fadeCycle    : 0,

	start : function () { 

		this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=flowers');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);

		this.element = this._coreDoc.createElement('div');
		this.picQueue = new Array();

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);

		this.popPic();
	} ,

	init : function() {
	},


	popPic: function() {
		if (this.picQueue.length == 0) { 
			this.feed.load(this.__feedUpdated.bind(this));
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
		//this.element.appendChild(k);

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

		var currImage =  this._coreDoc.getElementById("fadeimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 
			currImage.width=1680;
		this.imageNumber++;
		this.kickFadeIn();

	} ,


	kickFadeIn : function () { 

		if(this.fadeCycle<=1) { 
			this.fadeCycle+=0.5;
			this.lastInserted.style.opacity= this.fadeCycle;
			var scopedThis = this;
                	timer.setTimeout( function () { scopedThis.kickFadeIn() }, 500);

		} else { 

			
			this.fadeCycle=0;
			var scopedThis = this;
                	timer.setTimeout( function () { scopedThis.popPic() }, 500);
		} 
	} ,


	updateFeed : function() {
		if (! this.popPic()) {
		}
	},

	__feedUpdated : function(result) {

		if (result.error ) {
			return;
		}

		var doc = result.xmlDocument;

		var links = doc.getElementsByTagName("link");

		var i;
		for (i = 0; i < links.length; i++) {
			if (links[i].getAttribute("rel") == "enclosure") { 
				var currentLink = links[i];
				var src = currentLink.getAttribute("href");
				this.picQueue.push(src);
			} 
		}

		this.popPic();

	},
}

c.register(fade_Widget);
