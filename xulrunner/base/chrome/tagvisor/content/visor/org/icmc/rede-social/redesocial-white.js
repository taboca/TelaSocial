c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	feedURL : "http://search.twitter.com/search.rss?q=%23janelasvirtuais",
	feedURLdois : "http://www.janelasvirtuais.xpg.com.br/whitelist.xml",
	feed    : null,
	feeddois    : null,
	colors : [],
	count : 0,
	
	approved: [],
	
	style : <><![CDATA[

		.tweetauthor { 
			color:gray; 
			font-size:16px;
		}

		.postitbase { 
			transform: rotate(1.1deg);
			-webkit-transform: rotate(1.1deg);
			-moz-transform: rotate(1.1deg);
			color:black;                        
			display:inline-block;
                        font-size:18px;
			overflow:hidden;
                        font-weight:bold;                        
                        margin:15px;
                        padding:18px;
                        width:300px;
                        height:170px;
			background-color: #cff;       
			-moz-box-shadow: black 10px 10px 10px;
		}

	]]></>, 


	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.className="twitterPanel";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttwitter";
		first.id = this.firstId;

		this.tweetRepeated = {};

		this.element.appendChild(first);

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		this.colors[0] = "#fcf";
		this.colors[1] = "#cff";
		this.colors[2] = "#ffc";

		var self = this;
		timer.setTimeout( function(){self.loadApproved()},1000);
		timer.setTimeout( function(){self.updateFeed()},1000);

	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		
		this.feeddois = this._service_jquery;
		this.feed = this._service_jquery;

		
	} ,

	loadApproved : function () {
		var self =this;

		this.feeddois.ajax( { type:"GET", url: self.feedURLdois, dataType: "xml", success: function (xml) { 
										self.approvedUpdated(xml);
									 } 
									});
		//timer.setTimeout( function(){self.loadApproved()},60*1000);
	},

	approvedUpdated : function(xml) {

		var self = this;
		this.feeddois(xml).find('item').each(function(){
			var user  = self.feeddois(this).find('user').text();

			//var bgTitle = title.split("imagens_icmc: ")[1];

			
			self.approved[self.approved.length] = user;
		});

	},

	popTweet : function() {
		if (this.tweetQueue.length == 0) { 
			var self = this;
			timer.setTimeout( function(){self.loadApproved()},60*1000);
			timer.setTimeout( function(){self.updateFeed()},60*1000);
			return false;
		} 
		var obj = this.tweetQueue.pop();
		var t = obj.content; 
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('span');
		k.className = 'postitbase';
		var author = t.split(':')[0]
		var range = Math.random()*2; 
		range-=.7;
		k.style.MozTransform = 'rotate('+range+'deg)';

		if(this.count >= 3)
			this.count = 0;

		k.style.backgroundColor = this.colors[this.count];

		this.count++;
		
		//k.innerHTML = "<span class = 'tweetauthor'> by @" + author + "</span><br>" + t.split(author+':')[1];
		k.innerHTML = t;		
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	updateFeed : function() {
		var self = this; 
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) { self.__feedUpdated(xml) } });
	},

	__feedUpdated : function(xml) {

		var self = this;
		var cc = 0;
		this.feed(xml).find('item').each(function(){
			var title  = self.feed(this).find('title').text();
			var author = self.feed(this).find('author').text();
			var img = self.feed(this).find('content').attr("url");

			var user = author.split("@")[0];
			
			var i;
			for(i=0; i < self.approved.length; i++) {

				if(user == self.approved[i])
				{

					self.tweetQueue.push( { content: '<img align="left" src=" '+ img +' " /><span class="tweetauthor">@' + user + '</span><br /> ' + title } );
				}			
			}

			self.popTweet();
		});

	}
}

c.register(twitter);
