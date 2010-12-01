
c     = require("choreographer");
timer = require("timer");

var fade_Widget =  {

        name        : __appName,
        target      : __targetName,
        targetId    : __targetId,
        feed        : null,
        feedURL     : "http://api.flickr.com/services/feeds/photos_public.gne?id=56576142@N08&lang=pt-br&format=",
	refElement   : null, 
	imageNumber  : 0,
	element      : null,
        picWidth     : 1040,
        picHeight    : 930,
        picQueue     : null, 
        totalElements: 2, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

                this.feed = this._service_jquery;
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
			k.style.marginTop ="30px"; 
			k.style.overflow="hidden";
			k.style.display="inline-block";
			this.element.insertBefore(k, this.element.firstChild);
			this.refContainers[i]=k;
		}

		var scopedThis = this;
                this._coreDoc.getElementById(this._getId()).addEventListener("social-focus",function handle(e) { scopedThis.timeEvent(e) } , false);
               	timer.setTimeout( function () { scopedThis.popPic() }, 10000);

	},

	init : function() {
	},

        flipContainers:0,

        timeEvent: function () {

                for(var i=0; i<this.totalElements; i++) {
			var k = this.refContainers[i]; 
			k.style.width = "0px";
			k.style.height= "0px";
                }

		var k = this.refContainers[this.flipContainers]; 
		k.style.width = this.picWidth + "px";
		k.style.height= this.picHeight + "px";
                this.flipContainers++;
                if(this.flipContainers>=this.totalElements) {
                        this.flipContainers=0;
                }
                this.kickFadeIn();

        },

	popPic: function() {
		if (this.picQueue.length == 0) { 
			var these = this;
			this.feed.ajax( { type:"POST", url: this.feedURL, dataType: "xml", success: function (xml) {  these.__feedUpdated(xml) } });

		} else { 
			var t = this.picQueue.pop();
			this.refContainerCycle++;
			if(this.refContainerCycle == this.totalElements) { 
				this.refContainerCycle=0;
			} 
			var currentContainer = this.refContainers[this.refContainerCycle];
			currentContainer.innerHTML = "<img id='posterimage"+this.imageNumber+"' src='"+t+"' style='-moz-box-shadow: black 5px 5px 10px;opacity:.3'>";
			these = this;
			this._coreDoc.getElementById("posterimage"+this.imageNumber).onload = function () { these.imageLoaded() };
			return true;
		} 
	},

	imageLoaded : function() { 
		var currImage =  this._coreDoc.getElementById("posterimage"+this.imageNumber);
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
	},

	kickFadeIn : function () { 
		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 1000*10);
	},

	__feedUpdated : function(xml) {
		var self  = this;
		this.feed(xml).find('entry').each(function(){

			var title = self.feed(this).find('title').text();
			var docDate=new Date();
			var docDateString = title.split("/");
			var docDay = docDateString[0];
			var docMonth = docDateString[1];
			var docYear = docDateString[2];
			docDate.setFullYear(parseInt(docYear),parseInt(docMonth-1),parseInt(docDay));
			var today = new Date();
			if (docDate>=today) { 
				var link = self.feed(this).find('link[rel="enclosure"]');
				if(link.attr("rel") == "enclosure" ) { 
					var src = link.attr("href");
       	                		if(src.indexOf("jpg")>-1 || src.indexOf("gif")>-1) {
						self.picQueue.push(src);
       	                		}
				} 
			} else { 
				self.picQueue.push("http://www.ifsc.usp.br/imagens/tela_social/logo_ifsc.jpg");
			} 

		});
		this.popPic();
	}
}

c.register(fade_Widget);
