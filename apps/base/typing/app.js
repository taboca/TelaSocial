
var typing =  {
	feedURL : URL_TYPING,
	feed    : null, 
	start : function() {
		this.elementTable = document.createElement("div");
		this.elementTable.innerHTML="<table><tr><td align='center' valign='middle' width='110'><div id='icon' style='' ></div></td><td><table ><tr><td height='255' valign='middle'><div class='typingPanel' id='typingcontainer'></div></td></tr><tr><td></td></tr></table></td></tr></table>";

		document.getElementById("main").appendChild(this.elementTable);
		document.getElementById("icon").innerHTML= '<img src="../vendor/g1.png" style="margin:10px; " align="left" />';
		this.tweetQueue = new Array();

		var first = document.createElement("div");
		this.firstId = "firsttyping";
		first.id = this.firstId;
		this.tweetRepeated = {};
		document.getElementById('typingcontainer').appendChild(first);

		var self = this;
		setTimeout( function(){self.updateFeed()},1000);
	},

	init : function () { 
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(t8l.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	} ,
	
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t.title in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		this.cycleArray[this.cycleTotal++]= { content: t.title };
		if(this.cycleArray.length>0 && !this.reading) { 
			this.readLine();
			this.reading = true; 
		} 
		return true;
	},

        cycleIndex: 0,
	cycleTotal: 0,
	cycleArray: new Array(), 

	reading : false,
	readIndex : 0,

	readLine: function () { 
		if(this.cycleIndex>=this.cycleArray.length) { 
			this.cycleIndex=0;
		} 
		var self = this;
		setTimeout( function(){self.readStep()},1000);
	}, 
	
	readStep: function () { 
		var elCurr = this.cycleArray[this.cycleIndex];
		var words = elCurr.content.split(" ");
		var sum = "";

		for(var i=0;i<this.readIndex;i++) { 
			sum+=words[i]+" ";
			if(i==0) { 
			} 
		} 
		document.getElementById("firsttyping").innerHTML=sum;
		this.readIndex++;
		if(this.readIndex>words.length) { 
			var self = this;
			this.readIndex=0;
			this.cycleIndex++;

			setTimeout( function(){self.readLine()},7000);
		} 
		else { 
			var self = this;
			setTimeout( function(){self.readStep()},150);
		} 
	},

	/* This is cycling.. */

	updateFeed : function() {
		if (!this.popTweet()) {
			var self =this;
			this.feed.load( function (e) { self.__feedUpdated(e) } );
		}
		var self = this;
		setTimeout( function(){self.updateFeed()},1000);
	},

	__feedUpdated : function(result) {

		var self  = this;
		if (result.error) {
			return;
		}
     		$(result.xmlDocument).find('item').each(function(){
                        var title = $(this).find('title').text();
                        self.tweetQueue.push( { title: title });
		});
	}

}

