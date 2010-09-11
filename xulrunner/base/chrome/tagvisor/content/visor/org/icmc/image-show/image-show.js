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


c = require("choreographer");
timer = require("timer");

var imageshow = {
	name : __appName,
	target : __targetName,
	targetId : __targetId,
	crop : "50",
	title : "Twitterbg 10",
	feedURL : "https://twitter.com/statuses/user_timeline/176536278.rss",

	styleElement: null,
	feed : null,

	style : <><![CDATA[
	
		.wallpaper{
			width:100%;
			height:100%;
		}

	]]></>,

	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.id = 'bg1';
		this.element.className = 'wallpaper';

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);
	},

	init : function () {
		var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		this.feed = this._service_jquery;
	} ,

	updateFeed : function() {
		var self =this;
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) { self.__feedUpdated(xml) } });


		timer.setTimeout( function(){self.updateFeed()},1000*30*60);
	},

	__feedUpdated : function(xml) {
		this._dump("!!!");
		var self = this;
		try {
		this.feed(xml).find('item').each(function(){
		var pubDate = self.feed(this).find('pubDate').text();
		var title = self.feed(this).find('title').text();
		var link = self.feed(this).find('link').text();

		var bgTitle = title.split("imagens_icmc: ")[1];

		self._dump(bgTitle);

		self._coreDoc.getElementById("bg1").style.background = "url("+bgTitle+") no-repeat 0 0 ";

		return false;

		});
	} catch (i) { self._dump(i) }

	}
}
c.register(imageshow);
