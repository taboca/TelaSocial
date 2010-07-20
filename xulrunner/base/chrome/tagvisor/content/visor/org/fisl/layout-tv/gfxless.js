c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

	html {
		padding:0;
		margin:0; font-family: verdana, arial, sans-serif;
		width:1920px;
		height:1080px;
		overflow:hidden;
	} 

	body {
		background: rgb(98,176,222) url(org/fisl/brand/bg.png);
		padding:0; margin:0;
	}

	table {
		width:1920px;
	}

	.tab {
                font-size:20px;
		width:620px;
                font-weight:bold;
		border-bottom:1px solid white;
			
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_topright { 
		height:750px; 
		width:820px;
		overflow:hidden;
	} 

        .cor_tab1  { 
		border-bottom:2px solid rgb(253,181,37);
	}
        .cor_tab2  { 
		border-bottom:2px solid rgb(100,197,210); 
	}
        .cor_tab3  { 
		border-bottom:2px solid rgb(14,148,171);	
	}

        .transp { background-color:transparent; }

        #pointer {
                top:800px;
                width:65px;
                -moz-border-radius:5px;
                height:10px;
                background-color:black;
                z-index:1;
                position:absolute;
                left:0px;
        }

	#frame { 
		width:1920px;
		height:1080px;
		padding:0;
	 	margin:0;
	}

	.panel { 
		display:none;
		overflow:hidden;
		padding:1em;
	} 

	#area_topleft {
		color:white;
		font-weight:bold;
		padding-top:0px;
        }

	video { 
		margin-left:25px;
		-moz-box-shadow: 15px 15px 15px rgba(0,0,0,.5);
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
                        this._coreDoc.getElementById("tab3").className="transp";
			//this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
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
<table cellpadding="0" >
<tr>
<td id='area_topleft' valign='top' align="left">
</td>
<td valign="top" align='center'>
<div id='area_topright' >
<img src="org/fisl/brand/fisl-banner-fisl.png" />
<img src="org/fisl/brand/fisl-banner-logo.png" />
</div>
</td>
</tr>
</table>
<table width="100%">
<tr style="height:50px">
<td class='cor_tab1' id='tab1'>
<div class='tab'>
Atualizações Tela
</div>
</td>
<td class='cor_tab2' id='tab2'>
<div class='tab'>
Palestras
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
Comunicados FISL
</div>
</td>
</tr>
<tr>
<td colspan="3" >
<div class="panel" id='area_panel1'>
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
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
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
