
var app =  {
        feed        : null,
        feedURL     : URL_DESTAQUES,
	refElement   : null, 
	element      : null,
        picWidth     : 330,
        picHeight    : 70,
        itemQueue     : null, 
        totalElements: 9, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

		this.itemQueue = new Array();
		this.element = document.createElement('div');
		this.element.style.marginLeft="0px";
		document.getElementById("container").appendChild(this.element);
		this.refElement = document.createElement("div");
		this.element.appendChild(this.refElement);
		this.refContainers = new Array();

		for(var i=0; i<this.totalElements; i++) { 
			var k = document.createElement("span");
			k.style.width = this.picWidth + "px";
			k.style.height= this.picHeight + "px";
			k.style.overflow="hidden";
			k.style.display="inline-block";
			this.element.insertBefore(k, this.element.firstChild);
			this.refContainers[i]=k;
		}

		var scopedThis = this;
                document.getElementById("container").addEventListener("rotate",function handle(e) { scopedThis.timeEvent(e) } , false);
               	setTimeout( function () { scopedThis.popItem() }, 200);
	},

	init : function() {
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(t8l.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	},

        flipContainers:0,

        timeEvent: function () {
		this.cycle=0;
                this.kickFadeIn();
        },
        ccc:24,

	popItem: function() {
		if (this.itemQueue.length == 0) { 
			var self = this;
			this.feed.load( function (e) { self.__feedUpdated(e) } );
		} else { 
			var t = this.itemQueue.pop();
			this.refContainerCycle++;
			if(this.refContainerCycle == this.totalElements) { 
				this.refContainerCycle=0;
			} 
			var currentContainer = this.refContainers[this.refContainerCycle];

		var ddd = new Date();
		var yy = ddd.getFullYear();
		var dd = ddd.getDate();
		this.ccc--;
		var mm = ddd.getMonth()+1;

			currentContainer.innerHTML = "<div class='item'><div class='date'>"+this.ccc+"/"+mm+"/"+yy+"</div><div class='title'>"+t+"</div></div>";
			these = this;
                this.kickFadeIn();
			return true;
		} 

	},
	cycle: 0,

	kickFadeIn : function () { 
		this.cycle++;	
		if(this.cycle<=this.totalElements) { 
			var scopedThis = this;
        	       	setTimeout( function () { scopedThis.popItem() }, 200);
		}  
	},

	__feedUpdated : function(result) {

		var self  = this;
		if(result.error) { }; 
     		$(result.xmlDocument).find('item').each(function(){ 
			var title = $(this).find('title').text();
			var docDate=new Date();
			var docDateString = title.split("/");
			var docDay = docDateString[0];
			var docMonth = docDateString[1];
			var docYear = docDateString[2];
			docDate.setFullYear(parseInt(docYear),parseInt(docMonth-1),parseInt(docDay));
			var today = new Date();
                        var desc    = $(this).find('description').text();
			self.itemQueue.push(title);
		});
		this.kickFadeIn();
	}
}

