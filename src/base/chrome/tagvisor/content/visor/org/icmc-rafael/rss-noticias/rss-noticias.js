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
 *      Marcio Galli   <mgalli@taboca.com>
 *      Rafael Sartori <faelsartori@gmail.com>
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

var rssnoticias =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://www.icmc.usp.br/feed/noticias.php",
	feed    : null, 
	style : <><![CDATA[
		.tweetdate { 
			color:blue;
			font-weight:bold;
			font-size:32px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em
		}
		.tweetauthor { 
			color:gray; 
		} 
		.tweetpublic { 
			color:black;
			font-size:40px;
			font-weight:bold;
			-moz-border-radius:12px;
			background-color: rgba(255,255,255,.5);
			-moz-box-shadow: rgba(255,255,255,.5) 0 0 10px; 
			padding:10px;
			margin:10px;
		} 
		.twitterPanel { 
			width:100%;
		} 
	]]></>, 
	start : function() {

        		this.elementStore = this._coreDoc.createElement('div');
		this.elementStore.setAttribute("id","storetempNoticias");
		this._coreDoc.getElementById(this._getId()).appendChild(this.elementStore);

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
		timer.setTimeout( function(){self.updateFeed()},10000);
	},
	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		//this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed = this._service_jquery;
	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('div');
		k.className = 'tweetpublic';
		k.innerHTML = t;
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	dateControl : function(pubDate) {
		var year, month, day;
		var phrase;		// this phrase will be the date in a specific format 
		
		day = pubDate.slice(8,10);
		month = pubDate.slice(5,7);
		year = pubDate.slice(0,4);
		
		phrase = day.concat("/", month, "/", year);
		return phrase;
	},

	updateFeed : function() {
		if (! this.popTweet()) {
			var self =this; 
			this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},10000);
	},
	__feedUpdated : function(xml) {

		var self  = this; 
		this.feed(xml).find('item').each(function(){
			var partDate;	/* partDate - Particular of a specified country */		
			var pubDate = self.feed(this).find('pubDate').text();			
			var title   = self.feed(this).find('title').text();
			var link    = self.feed(this).find('link').text();
	
			partDate = self.dateControl(pubDate);
			self.tweetQueue.push( '<span class="tweetdateEventos">' + partDate + '</span>' + title);

		});

	}
}
c.register(rssnoticias);
