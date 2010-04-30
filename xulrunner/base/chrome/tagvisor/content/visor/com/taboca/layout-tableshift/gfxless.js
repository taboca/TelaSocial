
c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

  html { padding:0; margin:0 } 

	body {
		background-color:orange; margin:0; padding:0
	}

	table {
		width:100%;
		margin:0;
		z-index:1000;
		position:absolute;
	}

	table td {
		border:10px solid white;
	}

	.panel {
        	margin-top:30px;
	}

	.tab {
                font-size:30px;
                font-weight:bold;
        }

        .orange { background-color:orange; }
        .green  { background-color:green; }
        .blue   { background-color:blue; }
        .transp { background-color:transparent; }

        #pointer {
                width:40px;
                -moz-border-radius:20px;
                height:100px;
                background-color:white;
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
		visibility:hidden; 
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
                        this.movepos-=100;
                }
                else {
                        this.movepos+=100;
                }
                if(this.moveleft) {
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
                } else {
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
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
<td class='orange transp'>
<div class='tab'>
Eventos
</div>
</td>
<td class='green'>
<div class='tab'>
Eventos
</div>
</td>
<td class='blue'>
<div class='tab'>
Eventos
</div>
</td>
</tr>
<tr>
<td colspan="3">
<div class="panel" id='area_panel1'>
</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
</td>
</tr>
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
