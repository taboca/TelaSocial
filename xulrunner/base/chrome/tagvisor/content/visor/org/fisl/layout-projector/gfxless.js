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
		background: white;

		padding:0; margin:0;
	}

	.container {
		top:0px;
		width:1024px;
		position:absolute;
		z-index:100;
		background:url(org/fisl/brand/bgtop-1024.jpg) 0 -20px no-repeat;
	}

	table.container2 { 
		position:absolute;
		width:1024px;
		top:205px;
		z-index:900;
	} 

	.tab {
                font-size:20px;
		width:330px;
		text-align:center;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

        .cor_tab1 { 
		border:0px;
		color:gray;
	}
		
        .cor_tab2 {
		border:0px;
		color:gray;
	}
        .cor_tab3 {
		border:0px;
		color:gray;

	}

	.cor_active { 
		padding-left:10px;
		border-bottom:0px;
		background: -moz-linear-gradient(top bottom, yellow, rgba(255,255,0,0));
		text-shadow: 1px 1px 2px yellow, 0 0 1em yellow, 0 0 0.2em yellow;
	} 


        .transp { background-color:transparent; }

        #pointer {
                width:60px;
                -moz-border-radius:5px;
                height:10px;
                background-color:rgb(0,150,255);
                z-index:150;
                position:absolute;
                top:221px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		width:1024px;
		height:768px;
		padding:0;
	}

	.panel { 
		margin-left:5px;
		display:none;
		height:600px;
		overflow:hidden;
	} 

	#area_topright { 
		padding-top:130px;
		height:300px;
		z-index:280;
		overflow:hidden;
	} 

	#area_topmid { 
		width:300px;
		height:210px;
		overflow:hidden;
		margin-left:115px;
		text-align:center;
	} 

]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=1;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 682 && this.movepos < 1024 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_active";
			//this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 341 && this.movepos < 682) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_active";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 341) { 
                        this._coreDoc.getElementById("tab1").className="cor_active";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 1024 ) { 
			this.movepos = 0;
		} 
        },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>


<div id="frame">
<div id='pointer'>
</div>
<div class='container'>
<table cellpadding="0" border='0' >
<tr>
<td id='area_topleft' valign='top' align="left" width="333">
<img  style='margin-top:90px;margin-left:30px;' src="org/fisl/brand/fisl-banner-mini-logo.png" border="0" />
</td>
<td valign="top" align='left' width="393">
<div id='area_topmid' >
</div>
</td>
<td valign="top" align="right" width="303">
<div id='area_topright' >
</div>
</td>
</tr>
</table>
</div>
<table class='container2'>
<tr style="height:50px">
<td class='cor_tab1' valign="bottom" id='tab1'>
<div class='tab'>
Twitter #fisl11
</div>
</td>
<td class='cor_tab2'  valign="bottom"  id='tab2'>
<div class='tab'>
Flickr #FISL
</div>
</td>
<td class='cor_tab3'  valign="bottom"  id='tab3'>
<div class='tab'>
Notícias
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
