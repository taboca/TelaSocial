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
 *      Marcio Galli <mgalli@taboca.com>
 *      Alexandre Koji Imai Negrão <akin@grad.icmc.usp.br>
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

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "https://twitter.com/statuses/user_timeline/176536278.rss",

	styleElement: null, 
	feed    : null, 

	style : <><![CDATA[

	]]></>, 

	start : function() {
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);
	},
	init : function () { 
		this.feed = this._service_jquery;
	} ,

	updateFeed : function() {
		var self =this; 
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });


		timer.setTimeout( function(){self.updateFeed()},1000*60*30);
	},

	__feedUpdated : function(xml) {


		this._dump("!!!");
		var self  = this; 
		try { 
			var bgObject = this.feed(xml).find('item') //gets the most recent tweet
	
			var bgTitle = bgObject.find('title').text().split("imagens_icmc: ")[1];  

			self._dump(bgTitle);
			self._coreDoc.body.setAttribute("style","background: url("+bgTitle+") no-repeat 0 0 ");

		});
		} catch (i) { self._dump(i)  }

	}
}
c.register(twitter);
