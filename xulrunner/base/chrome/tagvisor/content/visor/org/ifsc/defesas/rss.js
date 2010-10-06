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

var rsseventos =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,
	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://www.ifsc.usp.br/defesas2_rss.php",
	feed    : null, 
	style : <><![CDATA[
		#storetempEventos {
			margin: 0 auto; // nao funciona - "centralizar"
		}
		.defesasNota { 
			color:blue;
			font-weight:bold;
			font-size:32px;
			margin-right:.5em;
			border-right:6px solid white;
			padding-right:.5em;
		}
		.defesas {
			color:black;
                        display:inline-block;
                        background-color:#ffc;
                        overflow:hidden;
                        margin:15px;
			margin-left:25px;
                        padding:15px;
                        width:450px;
                        height:270px;
                        -moz-box-shadow: black 10px 10px 10px;
		} 
		.defesa_title { 
                        font-weight:bold;
                        font-size:22px;
		} 
		.defesa_local { 
                        font-weight:bold;
			font-size:15px;
			color:#777;
			border-top:1px solid gray;
			padding-top:10px;
		} 
		.defesa_datahora { 
                        font-weight:bold;
			font-size:15px;
			color:#777;
			border-top:1px solid gray;
			padding-top:10px;
		} 
		.defesa_description { 
                        font-size:22px;
			font-weight:bold;
			margin-top:20px;
			color:#447;
		} 

		.twitterPanelEventos { 
			width:100%;
		} 
	]]></>, 
	start : function() {

                this.elementStore = this._coreDoc.createElement('div');
		this.elementStore.setAttribute("id","storetempEventos");
		this._coreDoc.getElementById(this._getId()).appendChild(this.elementStore);

		this.element = this._coreDoc.createElement('div');

		this.element.className="twitterPanelEventos";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
		this.firstId = "firsttwitterEventos";
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
		this.feed = this._service_jquery;
	} ,
	render : function() {
		var counter = 0;
		while(this.tweetQueue.length>0) { 

			if(counter < 6) { 

				counter++;
				var t = this.tweetQueue.pop();
				var k = this._coreDoc.createElement('div');
				k.className = 'defesas';
				k.innerHTML = t;
				this.element.insertBefore(k, this.element.firstChild);

			} 
		} 
	},

	updateFeed : function() {
		this.feed.ajax( { type:"GET", url: this.feedURL, dataType: "xml", success: function (xml) {  self.__feedUpdated(xml) } });
		var self = this;
		this.render();
		timer.setTimeout( function(){self.updateFeed()},30000);
	},
	__feedUpdated : function(xml) {

		var self  = this; 
		this.feed(xml).find('item').each(function(){
			//var pubDate = self.feed(this).find('pubDate').text();
			var title   = self.feed(this).find('title').text();
			var desc    = self.feed(this).find('description').text();
			var local    = self.feed(this).find('local').text();
			var data    = self.feed(this).find('data').text();
			var hora    = self.feed(this).find('hora').text();
			var link    = self.feed(this).find('link').text();
			
			self.tweetQueue.push( '<span class="defesa_title">'+title+'</span><div class="defesa_description">'+desc+'</div><div class="defesa_local">'+local+'</div><div class="defesa_datahora">'+hora+' | '+data+'</div>' );
			
		});

	}
}
c.register(rsseventos);
