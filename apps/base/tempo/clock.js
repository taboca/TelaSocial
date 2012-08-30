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

var tempoWidget =  {
	feed: null, 
	elementClock  : null, 
        mos: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	start : function () { 
		var mainDiv = document.createElement('div');
		document.body.appendChild(mainDiv);
		this.elementClock   = document.createElement('div');
		this.elementClock.setAttribute("id","clock");
		this.elementClock.setAttribute("class","datetime");
		mainDiv.appendChild(this.elementClock);
		this.feed = $;
		var self = this;
		this.tick();

	} ,

	updateFeed : function() {
		var self = this;
	},

	__feedUpdated : function(xml) {

		var self  = this; 
		var content = self.feed(xml).find('description').text();
		setTimeout( function(){self.updateFeed()},  1000);
	},
	tick : function () {
		this.data = new Date();
		//var text = this.data.toLocaleTimeString();
		//var text = this.data.toTimeString();
		var hour = this.data.getHours();
		var min = this.data.getMinutes();
		var secs = this.data.getSeconds();
		var prefix = "";
		var prefixmin = "";
		if(secs<=9) { 
			prefix = "0";
		} 
		if(min<=9) { 
			prefixmin = "0";
		} 

		//text = text.replace(/:..( [AP]M)$/, '$1');
		this.elementClock.innerHTML = hour+":"+prefixmin+min+":"+prefix+secs;
		var scopedThis = this;
		setTimeout( function () { scopedThis.tick() }, 1000);

		var ddd = new Date();
		var yy = ddd.getFullYear();
		var dd = ddd.getDate();
		var mm = this.mos[ddd.getMonth()];

	}
}

