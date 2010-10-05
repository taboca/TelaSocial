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
	totalElements : "",

	style : <><![CDATA[
		.picBox { 
			width:320px; 
			height:240px;
			-moz-box-shadow: 10px 10px 10px rgba(0,0,0,.5);
			overflow:hidden; 
			display:inline-block; 
			background-color:#555;			
			margin-right:20px;
			margin-bottom:10px;
		} 
  	]]></>,


		
	start:function () { 
		try { 
		this.feed = new this._service_google.feeds.Feed('http://api.flickr.com/services/feeds/photos_public.gne?id=53806588@N04&lang=pt-BR&format=RSS_200');
		this.feed.setNumEntries(20);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.element = this._coreDoc.createElement('div');

	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 


		this.element.style.marginLeft="10px";

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
		var k = this._coreDoc.createElement('span');
		k.className='picBox';

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
		try { 
		if(this.totalElements!="") { 
			var listCurrent = this.totalElements.split(',');
			if(listCurrent.length>=6) { 
				var currLast = listCurrent[5];
				var eleLast = this._coreDoc.getElementById("fadeimage"+currLast);
			//	this._dump(eleLast);
		//		this.element.removeChild(eleLast);
			} 
			this.totalElements= this.imageNumber+","+this.totalElements;
				this._dump("list="+this.totalElements);
		} else { 
			this.totalElements= ""+this.imageNumber+"";
		} 

		} catch(i) { this._dump(i) } 
		/*
		if(oldOldChild) { 
			this.element.removeChild(oldOldChild);
		} 
		*/
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
			currImage.width=320;
		} else { 
			
			currImage.height=240;
			var xx = parseInt ((320-parseInt((240*x)/y))/2 );
			currImage.style.marginLeft=xx+"px";
			
		} 
		this.imageNumber++;
		this.kickFadeIn();
	},

	kickFadeIn : function () { 
		this.fadeCycle=0;
		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 5000);
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
		var links = doc.getElementsByTagName("link");
		var i;
		for (i = 0; i < links.length; i++) {
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
