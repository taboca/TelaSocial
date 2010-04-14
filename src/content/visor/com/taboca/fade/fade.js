function fade_Widget() {

	this.start = function () { 

//		this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=98393462@N00&tags=mozfisl10&lang=en-us&format=rss_200');
		this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=flowers');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

		this.element = document.createElement('div');
		this.picQueue = new Array();

		document.getElementById(this._getId()).appendChild(this.element);

		this.refElement = document.createElement("div");
		this.element.appendChild(this.refElement);

		//this.__mycontainer.appendChild(this.element);
		
		this.popPic();
	} 

	this.init = function() {
	}


	this.zIndex=10;

	this.imageNumber =0;
	this.popPic = function() {
		if (this.picQueue.length == 0) { 
			this.feed.load(this.__feedUpdated.bind(this));
		} else { 

		var k = document.createElement('div');

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
		document.getElementById("fadeimage"+this.imageNumber).onload = function () { these.imageLoaded() };


		return true;

		} 
	}
	this.oldChild=null;
	this.imageLoaded = function() { 

		var currImage =  document.getElementById("fadeimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 
			currImage.width=1680;
		this.imageNumber++;
		this.kickFadeIn();

	} 


	this.lastInserted = null;

	this.fadeCycle = 0; 

	this.kickFadeIn = function () { 

		if(this.fadeCycle<=1) { 
			this.fadeCycle+=0.5;
			this.lastInserted.style.opacity= this.fadeCycle;
			var these=this;
			setTimeout( function () { these.kickFadeIn() }, 500);
		} else { 

			
			this.fadeCycle=0;
			these = this;
		  	setTimeout( function () { these.popPic(); } ,15000);
		} 
	} 


	this.updateFeed = function() {
		if (! this.popPic()) {
		}
	}

	this.__feedUpdated = function(result) {

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


	this.feed = new google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?tags=flowers');
	this.feed.setNumEntries(20);
	this.feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

			this.popPic();

	}

	return this;
}

