
c = require("choreographer");
t = require("timer");

var layoutVertical =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

	html { padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif } 

	body {
		background-color:rgb(255,255,255); margin:0; padding:0;
	}

	table {
		z-index:1000;
	}

	table.maintable { 
		width:1080px;
		height:1920px;
	} 

	.panel {
		width:1060px;
		margin-left:10px;
	}

	.tab {
                font-size:28px;
		padding:.5em;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_bottomright { 
	} 

	#area_topright { 
		padding-top:90px;
	} 

        .cor_tab1 { background-color:rgb(253,181,37); }
        .cor_tab2 { background-color:rgb(100,197,210); }
        .cor_tab3 { background-color:rgb(14,148,171);  }

        .transp { background-color:transparent; }

        #pointer {
                top:540px;
                width:60px;
                -moz-border-radius:1px;
                height:20px;
                background-color:black;
                z-index:1111;
                position:absolute;
                left:0px;
        }

	#frame { 
	 	margin:0;
		padding:0;
	}

	.panel { 
		display:none;
		height:1000px;
		overflow:hidden;
	} 

	#area_bottom {
		padding:1em;
                height:270px;
                background-color:white;
    		font-family:Kaffeesatz,Verdana, Arial, Helvetica, sans-serif;
		width:1060px;
		color:black;
		font-weight:bold;
        }
	
	#area_panel1 span { 
		margin-left:15px;
		margin-top:10px;
	} 

	#area_midmid { 
		width:1080px; 
		height:420px; 
		overflow:hidden;
	} 


]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=2;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 700 && this.movepos < 1080 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="transp";
			this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 350 && this.movepos < 700) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 350) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
			//this._coreDoc.body.style.backgroundColor="rgb(255,255,255)";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 1080 ) { 

			this.movepos = 0

		} 
        },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<div id="frame">
<div id='pointer'>
</div>
<table class='maintable' border="0" >
<tr>
<td colspan="3"  align="left" valign="top" style="height:550px;padding:0;background:white url(http://www.ifsc.usp.br/imagens/tela_social/barra_sup.jpg) 0px 0px no-repeat" >

<table border='0' width='1080' height="120">
<tr>
<td id='area_topleft' width='230' valign='middle' align="center" >

</td>
<td id='area_topmid' align="right" valign="middle" >
</td>
</tr>
</table>

<div id="area_midmid">
</div>

</td>
</tr>
<tr style="height:50px">
<td class='cor_tab1' id='tab1'>
<div class='tab'>
Acontece 
</div>
</td>
<td class='cor_tab2' id='tab2'>
<div class='tab'>
Fotos 
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
Defesas
</div>
</td>
</tr>
<tr>
<td colspan="3" >
<div class="panel" id='area_panel1' >
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
</td>
</tr>
<tr>
<td colspan='3' id='area_bottom' valign='top'>
</td>
<td id='area_bottomright' valign="middle">
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

c.register(layoutVertical);
