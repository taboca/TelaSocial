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
        _coreDoc: null,

	style : <><![CDATA[

	html { padding:0; margin:0; overflow:hidden; font-family: Fontin, verdana, arial, sans-serif } 

	body {
		background-color:rgb(253,181,37); margin:0; padding:0;
	}

	table {
		width:100%;
		margin:0;
		z-index:1000;
		position:absolute;
	}

	table.main td {
		border:10px solid rgba(0,0,0,.7);
	}


	.tab {
                font-size:20px;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_bottomright { 
		text-align:center;
		background-color:rgb(70,70,70);	
	} 

        .cor_tab1 { background-color:rgb(253,181,37); }
        .cor_tab2 { background-color:rgb(100,197,210); }
        .cor_tab3 { background-color:rgb(14,148,171);	}

        .transp { background-color:transparent; }

        #pointer {
                width:45px;
                -moz-border-radius:25px;
                height:45px;
                background-color:black;
                z-index:10000;
                position:absolute;
                top:44px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		padding:0;
	}

	#td_panel { 
		padding:0;
	} 

	.panel { 
		display:none;
		margin:0;
		width:100%;
		height:806px;
		overflow:hidden;
	} 

	#area_bottom {
                height:230px;
                background-color:rgba(0,0,0,.7);
		color:white;
        }

@font-face {
    font-family: GraublauWeb;
    src: url(org/icmc/3pane/GraublauWeb.otf) format("opentype");
}

@font-face {
    font-family: GraublauWeb;
    font-weight:900;
    src: url(org/icmc/3pane/GraublauWebBold.otf) format("opentype");
}

@font-face {
    font-family: Vollkorn;
	src: url(org/icmc/3pane/vollkorn.otf) format("opentype");

}

@font-face {
    font-family: Fontin;
	src: url(org/icmc/3pane/Fontin-Regular.otf) format("opentype");
	
}



]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 1260 && this.movepos < 1950 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(253,181,37)";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="transparent";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 1950 ) { 

			this.movepos = 0

		} 
        },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<div id="frame">
<div id='pointer'>
</div>
<table class='main' cellpadding="10" cellspacing="0" height="100%">
<tr style="height:50px">
<td class='cor_tab1' id='tab1' width="620"> 
<div class='tab'>
Destaque
</div>
</td>
<td class='cor_tab2' id='tab2' width="620">
<div class='tab'>
Palestras ICMC
</div>
</td>
<td class='cor_tab3' id='tab3' width="620">
<div class='tab'>
Rede Social ICMC
</div>
</td>
</tr>
<tr>
<td colspan="3" id='td_panel' valign='top'>
<div class="panel" id='area_panel1'>
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
</td>
</tr>
<tr>
<td colspan='2' id='area_bottom' valign='top' style=''>
</td>
<td id='area_bottomright' align="center" valign="middle">
</td>

</tr>
</table>

</div>

</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
	

	} ,

	init : function () {
	try { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
	 	//var styleBackground = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		//this._coreDoc.getElementById("headtarget").appendChild(styleBackground);
		style.innerHTML=this.style; 

		// we need to make this more flexible and events based more fluid 
		//var bgValue   = this._service_jquery(".3pane .background").text();
		//styleBackground.innerHTML="body { background-image: url('"+bgValue+"') }";
 

		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
