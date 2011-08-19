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

var defesas =  {
	feedURL : URL_DEFESAS,
	feed    : null, 
	start : function() {

                this.elementStore = document.createElement('div');
		this.elementStore.setAttribute("id","storetempEventos");
		document.getElementById("main").appendChild(this.elementStore);

		this.element = document.createElement('div');

		this.element.className="twitterPanelEventos";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = document.createElement("div");
		this.firstId = "firsttwitterEventos";
		first.id = this.firstId;

		this.tweetRepeated = {};
		this.element.appendChild(first);
		document.getElementById("main").appendChild(this.element);
		var self = this;
		setTimeout( function(){self.updateFeed()},1500);
	},
	init : function () { 
		this.feed = new google.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	} ,
	render : function() {
		var counter = 0;
		var self = this;
		if(this.tweetQueue.length<1) { 
			setTimeout( function(){self.updateFeed()},60*10*1000);
		} else { 
			var k = document.createElement('div');
			k.className="defesas";
			k.innerHTML = this.tweetQueue.pop();
			this.element.insertBefore(k, this.element.firstChild);
			setTimeout( function () { self.render() }, 600);
		} 
	},

	updateFeed : function() {
		var self =this;
		this.feed.load( function (e) { self.__feedUpdated(e) } );
	},

	__feedUpdated : function(result) {

		this.element.innerHTML="";
                var first = document.createElement("div");
                this.firstId = "firsttwitterEventos";
                first.id = this.firstId;
                this.tweetRepeated = {};
                this.element.appendChild(first);

		var self  = this; 
	//	var maxi = result.feed.entries.length-1;

		var cc=0;
     		$(result.xmlDocument).find('item').each(function(){
                        var title   = $(this).find('title').text();
                        var desc    = $(this).find('description').text();
                        var local   = $(this).find('local').text();
                        var data    = $(this).find('data').text();
                        var hora    = $(this).find('hora').text();
                        var orientador  = $(this).find('orient').text();
                        if(cc<6) {
                                self.tweetQueue.push( '<span class="defesa_title">'+title+'</span><div class="defesa_description">'+desc+'</div><div class="defesa_local">'+local+'</div><div class="defesa_datahora">'+hora+' | '+data+'</div><div class="defesa_orientador">'+orientador+'</div>' );
                                cc++;
                        }
                });


/*
		if (maxi>6) maxi=5;
		for (i=0;i<=maxi;i++) {
			if (result.feed.entries[i]) {

				var curr = result.feed.entries[i];
				var title   = curr.title; 
				var desc    = curr.description;
				var local   = curr.local;
				var data    = curr.data;
				var hora    = curr.hora;

				self.tweetQueue.push( '<span class="defesa_title">'+title+'</span><div class="defesa_description">'+desc+'</div><div class="defesa_local">'+local+'</div><div class="defesa_datahora">'+hora+' | '+data+'</div>' );
			}
		}
*/

		var self = this;
		self.render();
	}
}
