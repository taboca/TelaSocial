c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	feedURL : "http://www.ifsc.usp.br/destaques_rss.php",
	feed    : null, 

	style : <><![CDATA[
		

		.destaque_element {                        
			color:black;                        
			display:inline-block;
                        font-size:50px;

			overflow:hidden;
                        font-weight:bold;                        
                        margin:15px;
                        padding:15px;
                        width:1050px;
                        height:410px;
			color:#444;
                }

		.destaque_element img { 
			float:left;
			margin-right:20px;
		} 

		.command {
                        color:black;
                        display:inline-block;
                        background-color:white;
			opacity:.5;
                        font-size:22px;
                        overflow:hidden;
                        font-weight:bold;
                        margin:15px;
                        padding:15px;
                        width:300px;
                        height:220px;
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

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},5000);

	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = this._service_jquery;

	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var obj = this.tweetQueue.pop();
		var t = obj.title; 
		var url = obj.image; 
		
		var k = this._coreDoc.createElement('span');
		k.className = 'destaque_element';
		k.innerHTML = '<table height="350"><tr><td valign="middle"><img width="300" src="'+url+'" /></td><td valign="middle">'+t+'</td></tr></table>';
		var old = this.element.firstChild;
		this.element.insertBefore(k, this.element.firstChild);
		this.element.removeChild(old);
		return true;
	},

	updateFeed : function() {
		var self = this;
		if (! this.popTweet()) {
			this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		}
		timer.setTimeout( function(){self.updateFeed()},10000);
	},

	__feedUpdated : function(result) {
		var self  = this;

		if (result.error) {
			return;
		}

                this.feed(result).find('item').each(function(){

                        var title = self.feed(this).find('title').text();
                        var image = self.feed(this).find('image').text();

			self.tweetQueue.push( { title: title, image: image } );
		});

	}

}

c.register(twitter);
