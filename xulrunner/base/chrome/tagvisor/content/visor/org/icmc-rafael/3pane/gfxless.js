
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

	#tab1, #tab2, #tab3, #tab4 { 
		width:25%;
		z-index:1000;
	}

	#area_bottomright { 
		text-align:center;
		background-color:rgb(70,70,70);	
	} 

        .cor_tab1 { background-color:rgb(253,181,37); }
        .cor_tab2 { background-color:rgb(100,197,210); }
		.cor_tab3 { background-color:rgb(82,165,187);	}
        .cor_tab4 { background-color:rgb(14,148,171);	}

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
		height:710px;
		overflow:hidden;
	} 

	#area_bottom {
                height:230px;
                background-color:rgba(0,0,0,.7);
    		font-family: Verdana, Arial, Helvetica, sans-serif;
		color:white;
		font-weight:bold;
        }


]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 1412 && this.movepos < 1950 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
						this._coreDoc.getElementById("tab3").className="cor_tab3";
                        this._coreDoc.getElementById("tab4").className="cor_tab4";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(14,148,171)";
						this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
                        this._coreDoc.getElementById("area_panel4").style.display="block";                        
		} 
		if(this.movepos > 930 && this.movepos < 1412) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
						this._coreDoc.getElementById("tab3").className="cor_tab3";
                        this._coreDoc.getElementById("tab4").className="cor_tab4";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(82,165,187)";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel4").style.display="none";
		} 
		if(this.movepos > 457 && this.movepos < 930) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
						this._coreDoc.getElementById("tab3").className="cor_tab3";
                        this._coreDoc.getElementById("tab4").className="cor_tab4";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
                        this._coreDoc.getElementById("area_panel4").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 457) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
						this._coreDoc.getElementById("tab3").className="cor_tab3";
                        this._coreDoc.getElementById("tab4").className="cor_tab4";
			this._coreDoc.getElementById("td_panel").style.backgroundColor="transparent";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
                        this._coreDoc.getElementById("area_panel4").style.display="none";
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
<td class='cor_tab1' id='tab1'> 
<div class='tab'>
Destaque
</div>
</td>
<td class='cor_tab2' id='tab2'>
<div class='tab'>
Noticias ICMC
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
Eventos ICMC
</div>
</td>
<td class='cor_tab4' id='tab4'>
<div class='tab'>
Rede Social ICMC
</div>
</td>
</tr>
<tr>
<td colspan="4" id='td_panel' valign='top'>
<div class="panel" id='area_panel1'>
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
<div class="panel" id='area_panel4'>
</div>
</td>
</tr>
<tr>
<td colspan='3' id='area_bottom' valign='top' style='background: rgb(30,30,30) url(/com/icmc/3pane/usp-logo/trademark.jpg) 0 0 no-epeat;margin-left:120px;'>
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
