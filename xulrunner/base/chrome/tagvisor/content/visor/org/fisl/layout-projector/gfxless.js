c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[


        .shadow .c {
                -moz-box-shadow: white 0px 0px 20px;
        }

        .e {
                background-color:white;
                padding:1em;
                width:300px;
                position:absolute;
                height:300px;
        }
        .c {
                background-color:white;
                -moz-border-radius:425px;
                padding:1em;
                width:300px;
                position:absolute;
                height:300px;
        }


	html { padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif } 
	body {
		background: rgb(98,176,222);
		background: url(org/fisl/layout-projector/bg.png) 0 0 repeat;;
		padding:0; margin:0;
	}

	.clouds { 
		position:absolute;
		z-index:200;
		width:1024px;
		height:768px; 
		overflow:hidden;
	} 
	table.container {
		width:1024px;
		top:0px;
		position:absolute;
		z-index:100;
	}

	table.container2 { 
		position:absolute;
		width:1024px;
		top:260px;
		z-index:900;
	} 

	.panel {
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
                width:100px;
                -moz-border-radius:100px;
                height:100px;
                background-color:yellow;
		-moz-box-shadow: white 0 0 95px,yellow 0 0 75px,yellow 0 0 25px;
                z-index:150;
                position:absolute;
                top:230px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		width:1024px;
		height:768px;
		padding:0;
	}

	.panel { 
		display:none;
		height:700px;
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

	#area_topright { 
		height:300px;
		z-index:280;
		overflow:hidden;
	} 

	#area_topleft {
		width:850px;
        }

	video { 
		-moz-box-shadow: 15px 15px 15px rgba(0,0,0,.5);
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


<div class='clouds'>
<div class="shadow">
<div class='c' style='top:240px;left:-50px;'> </div>
<div class='c' style='top:220px;left:120px;'> </div>
<div class='c' style='top:240px;left:370px;'> </div>
<div class='c' style='top:260px;left:600px;width:460px;height:460px'> </div>
</div>
<div>
<div class='c' style='top:240px;left:-50px;'> </div>
<div class='c' style='top:220px;left:120px;'> </div>
<div class='c' style='top:240px;left:370px;'> </div>
<div class='c' style='top:260px;left:600px;width:460px;height:460px'> </div>
</div>
<div class='e' style='top:370px;left:0px;width:1100px;height:400px'> </div>
</div>




<div id="frame">
<div id='pointer'>
</div>
<table cellpadding="0" class='container'>
<tr>
<td id='area_topleft' valign='top' align="left" width="524">
<img src="org/fisl/layout-tv/fisl-banner-logo.png" height="220" />
<img src="org/fisl/layout-tv/fisl-banner-fisl.png" height="220" />
</td>
<td valign="top" align='left' width="400">
<div id='area_topright' >
</div>
</td>
</tr>
</table>
<table class='container2'>
<tr style="height:50px">
<td class='cor_tab1' valign="bottom" id='tab1'>
<div class='tab'>
Atualizações Tela
</div>
</td>
<td class='cor_tab2'  valign="bottom"  id='tab2'>
<div class='tab'>
Palestras
</div>
</td>
<td class='cor_tab3'  valign="bottom"  id='tab3'>
<div class='tab'>
Comunicados
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
