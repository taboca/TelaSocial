c     = require("choreographer");
timer = require("timer");

var typing =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	title   : "Twitter 10",
	feedURL : "http://www.ifsc.usp.br/noticias_rss.php",
	feed    : null, 

	style : <><![CDATA[
		.typingPanel { 
			font-size:46px; 
			font-weight:bold;
			color:black;
		} 
	]]></>, 

	start : function() {
		this.elementTable = this._coreDoc.createElement("div");
		this.elementTable.innerHTML="<table width='1060'><tr><td align='center' valign='middle' width='140'><div id='icon' style='' ></div></td><td><table width='100%'><tr><td height='235' valign='middle'><div class='typingPanel' id='typingcontainer'></div></td></tr><tr><td><div style='font-size:18px;color:rgb(50,60,150);text-align:right'>Fonte: www.ifsc.usp.br</div></td></tr></table></td></tr></table>";

		this._coreDoc.getElementById(this._getId()).appendChild(this.elementTable);
		this._coreDoc.getElementById("icon").innerHTML= '<img src="http://www.ifsc.usp.br/imagens/tela_social/logo_ifsc.jpg" style="margin-right:15px; margin-bottom:10px; " align="left" />';
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
                this.feed = this._service_jquery;
	},
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
		timer.setTimeout( function(){self.readStep()},1000);
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
			this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	__feedUpdated : function(xml) {
		var self  = this;
                this.feed(xml).find('item').each(function(){
                        var title = self.feed(this).find('title').text();
                        self.tweetQueue.push( { title: title });
		});
	}

}

c.register(typing);
