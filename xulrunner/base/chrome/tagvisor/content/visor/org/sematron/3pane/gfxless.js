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
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
		destaque: "Pesquisa no ICMC",
        _coreDoc: null,

        movepos : 0,
        moveleft: true,
 
        done : new Array(), 
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
               
		if(this.movepos > 1260 && this.movepos < 1950 ) { 
			if(!this.done[2]) { 

			this.done[2] = true; 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(255,165,0)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
			} 
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
			if(!this.done[1]) { 
			this.done[1] = true; 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(255,140,0)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
			} 
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
			if(!this.done[0]) { 
			this.done[0]=true;
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(255,69,0)";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
			} 
		} 
		if(this.movepos > 1950 ) { 
			this.done=new Array();
			this.movepos = 0;
		} 
        },

	start : function () { 

	} ,
	
    asyncStart: function (data) { 
		var importedElement = this._coreDoc.createElement("div");
		importedElement.innerHTML =  data;
		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
    }, 
  	asyncStyle: function (data) { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=data; 
	},


	init : function () {
	try { 

	    var self = this;
		c.load("./org/sematron/3pane/layout.html", function s(d) {
			self.asyncStart(d);
		} , function e(i) { console.log(i) } ); 
		c.load("./org/sematron/3pane/estilo.css", function s(d) {
			self.asyncStyle(d);
		} , function e(i) { console.log(i) } ); 
		
		// we need to make this more flexible and events based more fluid 
		//var bgValue   = this._service_jquery(".3pane .background").text();
		//styleBackground.innerHTML="body { background-image: url('"+bgValue+"') }";
 
		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
