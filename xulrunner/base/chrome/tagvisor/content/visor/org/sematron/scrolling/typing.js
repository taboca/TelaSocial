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

                canvas = this._coreDoc.createElement("textscroll");
                
                canvas.style.width = w + "px";
                canvas.style.height = h + "px";
                canvas.width = w;
                canvas.height = h;

                ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.font = "30px Verdana";

		this._coreDoc.getElementById(this._getId()).appendChild(canvas);
		this.tweetQueue = new Array();
		this.tweetRepeated = {};

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

		var elm = this.cycleArray[this.cycleIndex];
                this.ctx = this.canvas.getContext("2d");
                this.ww = ctx.mozMeasureText(elm);
                ctx.save();
                ctx.fillText(elm, this.ww,50);
                this.x=this.ww;

		var self = this;
		timer.setTimeout( function(){self.readStep()},1000);
	}, 
	
        ctx : null, 
 	w : 700, 
	h : 200,
        x : 0,
        ww : 0,
        canvas: null, 


	readStep: function () { 

		var elm = this.cycleArray[this.cycleIndex];
                this.x--;
                this.ctx.fillStyle = "rgb(255, 255, 255)";
                this.ctx.fillRect (0, 0, this.w , this.h);
                this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
                this.ctx.restore();
                this.ctx.fillText(this.elm, this.x,50);

                if(x<-1*ww) { 
			timer.setTimeout( function(){self.readLine()},5000);
                } else { 
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
