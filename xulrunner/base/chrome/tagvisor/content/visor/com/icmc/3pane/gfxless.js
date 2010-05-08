
c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

	html { padding:0; margin:0; overflow:hidden } 

	body {
		background-color:rgb(253,181,37); margin:0; padding:0;
	}

	table {
		width:100%;
		margin:0;
		z-index:1000;
		position:absolute;
	}

	table td {
		border:10px solid black;
	}

	.panel {
        	margin-top:30px;
	}

	.tab {
                font-size:20px;
		width:620px;
                font-weight:bold;
        }


	#area_bottomright { 
		text-align:center;
		background-color:rgb(90,90,90);	
	} 

        .cor_orange { background-color:rgb(253,181,37);; }
        .cor_lightblue  { background-color:rgb(100,197,210); }
        .cor_darkblue   { background-color:rgb(14,148,171);; }
        .transp { background-color:transparent; }

        #pointer {
                width:50px;
                -moz-border-radius:20px;
                height:100px;
                background-color:black;
                z-index:1;
                position:absolute;
                top:0px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		padding:0;
	}

	.panel { 
		display:none;
		height:600px;
		overflow:hidden;
	} 

	#area_bottom {
                height:250px;
                background-color:rgb(4,78,111);
		color:white;
		font-weight:bold;
        }


]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 1260 && this.movepos < 1950 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_orange";
                        this._coreDoc.getElementById("tab2").className="cor_lightblue";
                        this._coreDoc.getElementById("tab3").className="transp";
			this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
                        this._coreDoc.getElementById("tab1").className="cor_orange";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="cor_darkblue";
			this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_lightblue";
                        this._coreDoc.getElementById("tab3").className="cor_darkblue";
			this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
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
<table cellpadding="10" cellspacing="0" height="100%">
<tr style="height:50px">
<td class='cor_orange' id='tab1'>
<div class='tab'>
São Carlos
</div>
</td>
<td class='cor_darkblue' id='tab2'>
<div class='tab'>
Palestras ICMC
</div>
</td>
<td class='cor_darkblue' id='tab3'>
<div class='tab'>
#bloco1icmc (twitter)
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
<tr>
<td colspan='2' id='area_bottom' valign='top' >
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

c.register(gfx);
