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

var main = {

	name   : __appName,
	target : __targetName,
	targetId : __targetId,
	destaque: "SemComp",
	_coreDoc: null,


	style : <><![CDATA[
		html {
			padding: 0;
			margin: 0;
			overflow: hidden;
			font-family: Fontin, verdana, arial, sans-serif;
			background-color:#555555;
		}

		h1 {
			position:relative;
			color:#FFFFFF;
			left:20px;
			font-size:25px;
		}

		#main {
			width:100%;
			height:100%;
			position:absolute;
		}

		#tabs {
			width:100%;
			height:80px;
			background-color:#000000;
			position:relative;
			font-size:20px;
			font-weight:bold;			
		}
		
		#tab1 {
			top:14px;
			left:20px;
			position:absolute;
			background-color:rgb(253,181,37);
			width:340px;
			height:50px;
			border:4px solid black;
			-moz-border-radius:10px;
			-webkit-border-radius:10px;
			border-radius:10px;
		}
		
		#tab2 {
			top:14px;
			left:383px;
			position:absolute;
			background-color:#9932CC;
			width:340px;
			height:50px;
			border:4px solid black;
			-moz-border-radius:10px;
			-webkit-border-radius:10px;
			border-radius:10px;
		}

		#tab3 {
			top:14px;
			left:750px;
			position:absolute;
			background-color:#167AFF;
			width:340px;
			height:50px;
			border:4px solid black;
			-moz-border-radius:10px;
			-webkit-border-radius:10px;
			border-radius:10px;
		}

		#timeline {
			width:100%;
			height:40px;
			background-color:#000000;
			position:relative;
		}
	
		#panels {
			width:100%;
			height:900px;
			background-color:#000000;
			position:relative;
		}

		#panelinside {
			position:relative;
			left:20px;
			right:20px;
			top:20px;
			bottom:20px;
			width:1070px;
			height:850px;
			//background-color:#9932CC;
			border:5px solid;
			border-color:#FFFFFF;
			-moz-border-radius:10px;
			-webkit-border-radius:10px;
			border-radius:10px;
		}

		#highlights {
			width:100%;
			height:280px;
			background-color:black;
			position:relative;		
		}

		#highinside {
			position:relative;
			left:20px;
			right:20px;
			top:0px;
			bottom:0px;
			width:1070px;
			height:270px;
			//background-color:#D8BFD8;
			border:5px solid orange;
			-moz-border-radius:10px;
			-webkit-border-radius:10px;
			border-radius:10px;
		}

		#bottom {
			width:100%;
			height:172px;
			background-color:black;
			position:relative;	
		}

		#typing {
			position:absolute;
			right:40px;
			top:15px;
			height:46px;
			width:700px;
			color:#FFFFFF;
			font-size:30px;
			text-align:right;
			//border:5px solid grey;
		}

		#logos {
			position:absolute;
			top:63px;
			font-size:45px;
			color:purple;
			right:30px;
			height:60px;
			//border:5px solid white;
			width:700px;
			text-align:right;
			font-weight:bold;
			//text-shadow: #FFF 1px 1px 3px;
		}

		#clock {
			position:absolute;
			left:10px;
			top:25px;
			height:90px;
			width:400px;
			//border:5px solid grey;
		}

		/* colors */
		.cor_tab1 { 
			background-color:rgb(253,181,37); 
		}
		.cor_tab2 { 
			background-color:#9932CC; 
		}
		.cor_tab3 { 
			background-color:rgb(14,148,171);	
		}
		.transp { 
			background-color:transparent; 
		}
		/* end of colors */

		#pointer {
			width:35px;
			-moz-border-radius:25px;
			height:35px;
			background-color:#000000;
			z-index:10000;
			position:absolute;
			top:2px;
			left:0px;
			border:5px solid #FFFFFF;
		}
	
		#line {
			position:absolute;
			top:17px;
			left:2px;
			height:9px;
			width:100%;
			background-color:#555555;
			z-index:1000;
		}

		.texttab {
			position:relative;
			top:7px;
			//left:90px;
			height:30px;
			width:200px;
			//border:5px solid green;
			color:#000000;
			font-size:30px;
		}
	
		#text1 {
			left:121px;
		}

		#text2 {
			left:108px;
		}

		#text3 {
			left:86px;
		}


	]]></>,

	movepos : 0,
	   moveleft: true,

	   done : new Array(), 

	   kick: function () {
		this.movepos+=5;
		      this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		     
		if(this.movepos > 735 && this.movepos < 1080 ) { 
			if(!this.done[2]) { 

			this.done[2] = true; 
		              this._coreDoc.getElementById("tab1").style.borderColor="#000000";
		              this._coreDoc.getElementById("tab2").style.borderColor="#000000";
		              this._coreDoc.getElementById("tab3").style.borderColor="#FFFFFF";
			this._coreDoc.getElementById("panelinside").style.backgroundColor="#167AFF";
		              this._coreDoc.getElementById("panel3").style.display="block";
		              this._coreDoc.getElementById("panel2").style.display="none";
		              this._coreDoc.getElementById("panel1").style.display="none";
			} 
		} 
		if(this.movepos > 365 && this.movepos < 735) { 
			if(!this.done[1]) { 
			this.done[1] = true; 
		              this._coreDoc.getElementById("tab1").style.borderColor="#000000";
		              this._coreDoc.getElementById("tab2").style.borderColor="#FFFFFF";
		              this._coreDoc.getElementById("tab3").style.borderColor="#000000";
			this._coreDoc.getElementById("panelinside").style.backgroundColor="#9932CC";
		              this._coreDoc.getElementById("panel2").style.display="block";
		              this._coreDoc.getElementById("panel1").style.display="none";
		              this._coreDoc.getElementById("panel3").style.display="none";
			} 
		} 
		if(this.movepos > 0  && this.movepos < 365) { 
			if(!this.done[0]) { 
			this.done[0]=true;
		              this._coreDoc.getElementById("tab1").style.borderColor="#FFFFFF";
		              this._coreDoc.getElementById("tab2").style.borderColor="#000000";
		              this._coreDoc.getElementById("tab3").style.borderColor="#000000";
			this._coreDoc.getElementById("panelinside").style.backgroundColor="rgb(253,181,37)";
			//this._coreDoc.getElementById("panelinside").style.backgroundColor="transparent";
		              this._coreDoc.getElementById("panel1").style.display="block";
		              this._coreDoc.getElementById("panel2").style.display="none";
		              this._coreDoc.getElementById("panel3").style.display="none";
			} 
		} 
		if(this.movepos > 1080 ) { 
			this.done=new Array();
			this.movepos = 0;
		} 
	   },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>


			<div id="main">
				<div id="tabs">
					<div id="tab1">
						<div class="texttab" id="text1">Flickr</div>
					</div>
					<div id="tab2">
						<div class="texttab" id="text2">Eventos</div>
					</div>
					<div id="tab3">
						<div class="texttab" id="text3">Rede Social</div>
					</div>					
				</div>
				<div id="timeline">
					<div id="line">
					</div>
					<div id="pointer">
					</div>
				</div>		
				<div id="panels">
					<div id="panelinside">	
						<div id='panel1'>
						</div>
						<div id='panel2'>
						</div>
						<div id='panel3'>
						</div>
					</div>
				</div>
				<div id="highlights">
					<div id="highinside">
						<div id="hightopic">
							<h1>Destaques:</h1>
						</div>
						<div id="dest1">
						</div>
						<div id="dest2">
						</div>
						<div id="dest3">
						</div>
					</div>
				</div>
				<div id="bottom">
					<div id="typing">
						O que você pretende construir hoje?
					</div>
					<div id="clock">
					</div>
					<div id="logos">
						Janelas Virtuais
					</div>
				</div>
			</div>

		</>;

		
		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
	},

	init : function () {
		try { 
		 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
			this._coreDoc.getElementById("headtarget").appendChild(style);
			style.innerHTML=this.style;  

			console.log(this._coreDoc);	
		} catch(i) { console.log(i) } 

	},
	
}

c.register(main);
