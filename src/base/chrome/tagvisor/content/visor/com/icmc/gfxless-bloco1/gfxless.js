
c = require("choreographer");
t = require("timer");

		//background-image: -moz-linear-gradient(-45deg, rgb(250,200,40) , #fff);
// background-image: -moz-linear-gradient(top, rgba(132,164,212,1), rgba(255,255,255,1));
var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,



	style : <><![CDATA[

	html { 
		margin:0; padding:0; 
		font-family: arial; 
	}

	body { 
		background: rgb(250,200,40);
		
		width:1920px;
		margin:0;
		height:100%;
		padding:0;
		overflow:hidden;
	}



	.panel1, .panel2 { 
		display:none;
		width:1900px;
	} 

	#frame { 
		margin:auto;
		width:1920px;
		height:1000px;
	} 

	.tab { 
		position:relative;
		-moz-border-radius:95px 0px 0px 55px;;
		background-color:rgb(132,164,212);
		color:black;
		-moz-box-shadow:black 0 10px 55px; 
		-moz-box-shadow:white 0 10px 55px; 
		font-size:30px;
		padding:.5em;
	} 

	.tab-tab { 
		position:absolute;
		background-color:#ddd;		
		top:-100px;
		-moz-border-radius:35px 35px 0 0; 
		padding:15px;
		padding-left:40px;
		font-size:60px;
		color:white;
		width:700px;
		right:0px;
		background-color:rgb(132,164,212);
	} 

	.orange { 
		height:700px;
		padding:.1em;
		width:1850px;
		overflow:hidden;
		font-size:50px;
		font-weight:bold;
		-moz-border-radius:55px 95px;
	} 

  .orange2 {
                background-image: -moz-linear-gradient(-60deg, #ddd, #fff, #eee);
                padding:.2em;
		height:700px;
                width:1850px;
		margin-top:1em;
                margin-right:1em;
                font-size:30px;
                font-weight:bold;
                -moz-border-radius:55px 95px;
		overflow:hidden;
		padding-left:1em;

        }


	.green { 
		font-family: arial; 
		background-color:rgb(30,50,120);
		font-size:30px;
		padding:1em;
		-moz-border-radius-bottomleft: 0;
		font-weight:bold;
		height:200px;
		color:white;
	} 
 	.green a { color:gray } 

	h1 { 
		font-family:georgia; 
		font-weight:bold;
		text-shadow: black 0 0 10px; 
		font-size:60px;
	} 
]]></>,

	movepos : 0, 
	moveleft: true, 

	shiftleft: function () { 
		this.moveleft = true;
		this.shiftmove();
	},
	shiftright: function () { 
		this.moveleft = false;
		this.shiftmove();
	},
	shiftmove: function () { 
                var self = this;
		if(this.moveleft) { 
			this._coreDoc.getElementById("panel1").style.display="none";
			this._coreDoc.getElementById("panel2").style.display="block";
		} else { 
			this._coreDoc.getElementById("panel1").style.display="block";
			this._coreDoc.getElementById("panel2").style.display="none";
		} 
  	},

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<div id='frame'>

<table id='moveframe' style='position:absolute' ><tr><td valign='top' align='left'>

<div id='left' style='width:1920px;'>

<span id="area_topleft">
</span>

<div id='area_topright'>
</div>
 
<div class='tab' style='margin-top:.4em'>
<div class='tab-tab'>
<img src='http://www.icmc.usp.br/favicon.ico' align='middle' />ICMC-USP
</div>

<table><tr>
<td valign='top'>

<div id='panel1'>
<span style='color:white;margin-left:1em' >Breve modelo de calendário para palestras. Códigos QR code para leitura pelo celular. </span>
<div class='orange' style='margin-top:0em; '  id='area_midleft'>
</div>
</div>

<div id='panel2'>
<span style='color:black;font-size:30px;font-weight:bold;' >Twitter: #bloco1icmc</span>
<div class='orange2' style='margin-top:0em;' id='area_midright'>
</div>
</div>


</td>
<td valign='top'>
</td>
</tr>
</table>

<div class='tab green' style='margin-top:1em' id='area_bottomleft'>
</div>

</div>

</div>
</td>
</tr>
</table>


</div>

		</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);


/*		var cc = 0;
		for ( key in this._childList ) { 
			if (cc==0) { 
				this._childList[key] = "topleft"
			} 
			if (cc==1) { 
				this._childList[key] = "middle"
			} 
			if (cc==2) { 
				this._childList[key] = "toparea"; 
			} 
			if (cc==3) { 
				this._childList[key] = "bottom"; 
			} 
			cc++;
		} 
*/

// marcio
	} ,

	init : function () {
	try { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		//style.innerHTML="html { background-color:black } ";
		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
