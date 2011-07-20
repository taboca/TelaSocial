/* ***** BEGIN LICENSE BLOCK *****
* Version: MPL 1.1/GPL 2.0/LGPL 2.1
*
* The contents of this file are subject to the Mozilla Public License Version
* 1.1 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
* http://www.mozilla.org/MPL/
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is TelaSocial
*
* The Initial Developer of the Original Code is Taboca TelaSocial.
* Portions created by the Initial Developer are Copyright (C) 2010
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
* Marcio Galli <mgalli@taboca.com>
* Alexandre Koji Imai Negrão <akin@grad.icmc.usp.br>
*
* Alternatively, the contents of this file may be used under the terms of
* either the GNU General Public License Version 2 or later (the "GPL"), or
* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
* in which case the provisions of the GPL or the LGPL are applicable instead
* of those above. If you wish to allow use of your version of this file only
* under the terms of either the GPL or the LGPL, and not to allow others to
* use your version of this file under the terms of the MPL, indicate your
* decision by deleting the provisions above and replace them with the notice
* and other provisions required by the GPL or the LGPL. If you do not delete
* the provisions above, a recipient may use your version of this file under
* the terms of any one of the MPL, the GPL or the LGPL.
*
* ***** END LICENSE BLOCK ***** */

c     = require("choreographer");
timer = require("timer");

var redesocial =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://twitter.com/statuses/user_timeline/75017337.rss",
	feedURL2: "https://twitter.com/statuses/user_timeline/82685824.rss",
	feedURL3: "http://twitter.com/statuses/user_timeline/133252196.rss",
	feed    : null, 
	feed2	: null,
	feed3	: null,

	style : <><![CDATA[
		
		.tweetauthor{
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
			-moz-box-shadow: black 10px 10px 10px;
		}

		.postitpanel1 {                        
			background-color:#ffc;
        }

		.postitpanel2 {                        
            background-color:#fcf;
        }

		.postitpanel3 {                        
        	background-color:#cff;
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
                        width:310px;
                        height:240px;
                        -moz-box-shadow: black 10px 10px 10px;
                }
	]]></>, 


	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.className="redesocialPanel";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firstredesocial";
		first.id = this.firstId;

		this.tweetRepeated = {};

		this.element.appendChild(first);

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);

	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(5);

		this.feed2 = new this._service_google.feeds.Feed(this.feedURL2);
		this.feed2.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.feed2.setNumEntries(5);

		this.feed3 = new this._service_google.feeds.Feed(this.feedURL3);
		this.feed3.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.feed3.setNumEntries(5);
	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var obj = this.tweetQueue.pop();
		var t = obj.content; 
		var c = obj.color; 
		
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('span');
		k.className = 'postitbase postitpanel'+ c;
		var author = t.split(':')[0]
		var range = Math.random()*2; 
		range-=.7;
		k.style.MozTransform = 'rotate('+range+'deg)';
		k.innerHTML = "<span class = 'tweetauthor'> by @" + author + "</span><br>" + t.split(author+':')[1];
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	updateFeed : function() {
		if (! this.popTweet()) {
			var self =this; 
			this.feed.load( function (e) {  self.__feedUpdated(e, 1) } );
			this.feed2.load( function (e) {  self.__feedUpdated(e, 2) } );
			this.feed3.load( function (e) {  self.__feedUpdated(e, 3) } );
		}
		var self = this;

		timer.setTimeout( function(){self.updateFeed()},6000);
	},

	__feedUpdated : function(result, color) {
	if (result.error) return false;
	var items = result.xmlDocument.getElementsByTagName("item");
		for (var i = 0; i < items.length; i++) {
      		var titleElement = items[i].getElementsByTagName("title")[0];
      		var title = titleElement.firstChild.nodeValue;

			this.tweetQueue.push( { content: title, color: color } );
		}

	}
}


c.register(redesocial);
