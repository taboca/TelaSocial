c     = require("choreographer");
timer = require("timer");

var typing =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://www4.usp.br/index.php/noticias?format=feed&type=rss",
	feed    : null, 

	style : <><![CDATA[

		.typingPanel { 
			font-size:35px; 
			font-weight:bold;
			color:white;
		} 

		table.typing td { 
			border:0px;
		} 


	]]></>, 

	start : function() {

		this.elementTable = this._coreDoc.createElement("div");
		this.elementTable.innerHTML="<div id='qrcode' style='float:left;' ></div><div class='typingPanel' id='typingcontainer'></div>";

		this._coreDoc.getElementById(this._getId()).appendChild(this.elementTable);
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttyping";
		first.id = this.firstId;
		this.tweetRepeated = {};
		this._coreDoc.getElementById('typingcontainer').appendChild(first);

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed.setNumEntries(10);
	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t.title in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		this.cycleArray[this.cycleTotal++]= { content: t.title, link: t.link  };
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

	// this.element is the reference
	readLine: function () { 
		if(this.cycleIndex>=this.cycleArray.length) { 
			this.cycleIndex=0;
		} 


		var self = this;
		timer.setTimeout( function(){self.readStep()},1000);
	}, 
	
	readStep: function () { 
		var elCurr = this.cycleArray[this.cycleIndex];
		var words = elCurr.content.split(" ");
		var sum = "";
		//sum += '<img width="84" src="http://go.bath.ac.uk/qr/download?DATA='+ elCurr.link+'" style="margin-right:15px; margin-bottom:10px; " align="left" />';

		for(var i=0;i<this.readIndex;i++) { 
			sum+=words[i]+" ";
			if(i==0) { 
				this._coreDoc.getElementById("qrcode").innerHTML= '<img width="120" src="http://go.bath.ac.uk/qr/download?DATA='+ elCurr.link+'" style="margin-right:15px; margin-bottom:10px; " align="left" />';
			} 
		} 
		this._coreDoc.getElementById("firsttyping").innerHTML=sum;
		this.readIndex++;
		if(this.readIndex>words.length) { 
			var self = this;
			this.readIndex=0;
			this.cycleIndex++;

			timer.setTimeout( function(){self.readLine()},5000);
		} 
		else { 
			var self = this;
			timer.setTimeout( function(){self.readStep()},150);
		} 
	},

	/* This is cycling.. */

	updateFeed : function() {
		if (!this.popTweet()) {
			var self =this; 
			this.feed.load( function (e) {  self.__feedUpdated(e) } );
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	__feedUpdated : function(result) {
		if (result.error || result.feed.entries < 1) {
			return;
		}
		var i;
		for (i = 0; i < result.feed.entries.length; i++) {
			if (result.feed.entries[i]) {
				//this.tweetQueue.push( '<img width="84" src="http://go.bath.ac.uk/qr/download?DATA='+result.feed.entries[i].link+'" style="margin-right:15px; margin-bottom:10px; " align="left" />'+ result.feed.entries[i].title + ' <span class="tweetauthor">(' + result.feed.entries[i].author.replace(/ \(.*$/,'') + ')</span>');
				var a= this._coreDoc.createElement("div");
                                a.innerHTML=result.feed.entries[i].title;
				// a.textContent
                                this.tweetQueue.push( { title: result.feed.entries[i].title , link: result.feed.entries[i].link });
			}
		}

		this.lastid = result.feed.entries[i-1].link.match(/\d+$/);
		this.feed = new this._service_google.feeds.Feed(this.feedURL + '&since_id=' + this.lastid);
		this.feed.setNumEntries(10);
	}

}

c.register(typing);
