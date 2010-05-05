
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
		background-color:orange; margin:0; padding:0;
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
                font-size:30px;
                font-weight:bold;
        }

        .orange { background-color:orange; }
        .green  { background-color:lightgreen; }
        .blue   { background-color:lightblue; }
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
		height:350px;
		overflow:hidden;
		width:750px;
	} 

	#area_bottom {
                height:250px;
                backgrond-color:darkblue;
		color:white;
		font-weight:bold;
        }


	

]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 0 ) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="green";
                        this._coreDoc.getElementById("tab3").className="blue";
			this._coreDoc.body.style.backgroundColor="orange";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 266 ) { 
                        this._coreDoc.getElementById("tab1").className="orange";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="blue";
			this._coreDoc.body.style.backgroundColor="lightgreen";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 532 ) { 
                        this._coreDoc.getElementById("tab1").className="orange";
                        this._coreDoc.getElementById("tab2").className="green";
                        this._coreDoc.getElementById("tab3").className="transp";
			this._coreDoc.body.style.backgroundColor="lightblue";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 800 ) { 

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
<td class='orange' id='tab1'>
<div class='tab'>
Clock widget
</div>
</td>
<td class='green' id='tab2'>
<div class='tab'>
#Drumbeat RSS
</div>
</td>
<td class='blue' id='tab3'>
<div class='tab'>
#Drumbeat
</div>
</td>
</tr>
<tr>
<td colspan="3" class='panelcontainer'>
<div class="panel" id='area_panel1'>
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
</td>
</tr>
<tr>
<td colspan='3' id='area_bottom' valign='top' >
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
