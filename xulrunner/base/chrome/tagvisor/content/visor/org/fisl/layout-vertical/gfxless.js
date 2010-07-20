
c = require("choreographer");
t = require("timer");

var gfx =  {

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
		margin:0;
		z-index:1000;
		position:absolute;
	}

	table td {
		border:0px solid white;
	}

	.panel {
		width:1060px;
		margin-left:10px;
	}

	.tab {
                font-size:20px;
		width:350px;
		padding:1em;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_bottomright { 
		text-align:center;
		width:360px;
		background-color:rgb(70,70,70);	
	} 

        .cor_tab1 { background-color:rgb(255,255,255);; }
        .cor_tab2  { background-color:rgb(100,197,210); }
        .cor_tab3   {
		background-color:rgb(14,148,171);	
	}

        .transp { background-color:transparent; }

        #pointer {
                top:260px;
                width:50px;
                -moz-border-radius:1px;
                height:10px;
                background-color:blue;
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
		height:1350px;
		overflow:hidden;
	} 

	@font-face {     
		font-family: Kaffeesatz;
		src: url(com/icmc/3pane/YanoneKaffeesatz-Regular.otf) format("opentype");
		font-weight:bold;
	}


@font-face {
	font-family: Vollkorn;
	src: url(com/icmc/3pane/vollkorn.otf) format("opentype");

}

	#area_bottom {
		padding:1em;
                height:230px;
                background-color:rgb(30,30,30);
    		font-family:Kaffeesatz,Verdana, Arial, Helvetica, sans-serif;
		color:white;
		font-weight:bold;
        }


]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
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
			this._coreDoc.body.style.backgroundColor="rgb(255,255,255)";
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
<table cellpadding="0" cellspacing="0" height="1920">
<tr>
<td colspan="3" style="padding:0" align="left" valign="bottom" >
<img src="org/fisl/brand/bgtop-1080.jpg" style="margin:0" />
</td>
</tr>
<tr style="height:50px">
<td class='cor_tab1' id='tab1'>
<div class='tab'>
Flickr FISL
</div>
</td>
<td class='cor_tab2' id='tab2'>
<div class='tab'>
Notícias FISL
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
Twitter #fisl11
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
<td colspan='2' id='area_bottom' valign='top' style='background: rgb(30,30,30) 0 0 no-epeat;margin-left:120px;'>
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
