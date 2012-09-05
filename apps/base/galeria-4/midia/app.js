
var app =  {
        feed        : null,
        feedURL     : GALERIA_MIDIA,
	refElement   : null, 
	imageNumber  : 0,
	element      : null,
        picWidth     : 460,
        picHeight    : 330,
        picQueue     : null, 
        totalElements: 4, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

		this.picQueue = new Array();
		this.element = document.createElement('div');
		this.element.style.marginLeft="00px";
		document.getElementById("container").appendChild(this.element);
		this.refElement = document.createElement("div");
		this.element.appendChild(this.refElement);

		this.refContainers = new Array();

		for(var i=0; i<this.totalElements; i++) { 
			var k = document.createElement("span");
			k.style.width = this.picWidth + "px";
			k.style.height= this.picHeight + "px";
			k.style.paddingLeft = "10px";
			k.style.paddingTop ="30px"; 
			k.style.overflow="hidden";
			k.style.display="inline-block";
			this.element.insertBefore(k, this.element.firstChild);
			this.refContainers[i]=k;
		}

		var scopedThis = this;
                document.getElementById("container").addEventListener("rotate",function handle(e) { scopedThis.timeEvent(e) } , false);
               	setTimeout( function () { scopedThis.popPic() }, 1000);

	},

	init : function() {

		this.feed = new google.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	},

        flipContainers:0,

        timeEvent: function () {
		this.cycle=0;
                this.kickFadeIn();
        },

	popPic: function() {
		if (this.picQueue.length == 0) { 
			var self = this;
			this.feed.load( function (e) { self.__feedUpdated(e) } );
                        //$.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) { self.__feedUpdated(xml) }, error: function (e) { alert('From galeria:' + e) }  });

		} else { 
			var t = this.picQueue.pop();
			this.refContainerCycle++;
			if(this.refContainerCycle == this.totalElements) { 
				this.refContainerCycle=0;
			} 
			var currentContainer = this.refContainers[this.refContainerCycle];
			currentContainer.innerHTML = "<img id='posterimage"+this.imageNumber+"' src='"+t+"' class='loading'>";
			these = this;
			document.getElementById("posterimage"+this.imageNumber).onload = function () { these.imageLoaded() };
                	this.kickFadeIn();
			return true;
		} 

	},

	imageLoaded : function() { 
		var currImage =  document.getElementById("posterimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 

		if(x>=y) {
			currImage.width=this.picWidth-30;
			var yy = parseInt ((this.picHeight-parseInt((this.picWidth*y)/x))/2 );
			currImage.style.marginTop=yy+"px";
		} else { 
			currImage.height=this.picHeight-30;
			var xx = parseInt ((this.picWidth-parseInt((this.picHeight*x)/y))/2 );
			currImage.style.marginLeft=xx+"px";
		} 
		currImage.className='active';
		this.imageNumber++;
	},


	cycle: 0,

	kickFadeIn : function () { 
		this.cycle++;	
		if(this.cycle<=this.totalElements) { 
			var scopedThis = this;
        	       	setTimeout( function () { scopedThis.popPic() }, 1000);
		} else { 
			//var scopedThis = this;
        	       	//setTimeout( function () { scopedThis.timeEvent() }, 10000);
		}  
	},

	__feedUpdated : function(result) {
		var self  = this;
     		$(result.xmlDocument).find('entry').each(function(){ 
     		//$(result).find('entry').each(function(){
			var title = $(this).find('title').text();

			var docDate=new Date();
			var docDateString = title.split("/");
			var docDay = docDateString[0];
			var docMonth = docDateString[1];
			var docYear = docDateString[2];
			docDate.setFullYear(parseInt(docYear),parseInt(docMonth-1),parseInt(docDay));
			var today = new Date();
			//if (docDate>=today) { 

				var link = $(this).find('link[rel="enclosure"]');
				if(link.attr("rel") == "enclosure" ) { 
					var src = link.attr("href");
       	                		if(src.indexOf("jpg")>-1 || src.indexOf("gif")>-1) {
						self.picQueue.push(src);
       	                		}
				} 
			//} else { 
			//	self.picQueue.push("http://www.ifsc.usp.br/www4/images/stories/logomarcas/logo_vertical_500x821.jpg");
		//	} 

		});
		this.kickFadeIn();
	}
}

