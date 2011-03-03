
c = require("choreographer");
t = require("timer");

var layoutVertical =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

        tabsColors: ['background-color:rgb(253,181,37);','background-color:rgb(100,197,210);','background-color:rgb(14,148,171)','background-color:rgb(253,181,37);'],
        tabsPanelColors: ['background-color:rgb(253,181,37);','background-color:rgb(100,197,210);','background-color:rgb(14,148,171);','background-color:rgb(253,181,37);'],
        tabsIds: ['tab1','tab2','tab3','tab4'],
        tabsTitles: ['Acontece','Fotos','Defesas','Mídia'],
        tabsPanelId: ['area_panel1','area_panel2','area_panel3','area_panel4'],

	tabsTotal: 0,
        movepos : 0,
        moveWidth: 1080, 

	style : <><![CDATA[

	html { padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif } 

	body {
		background-color:rgb(255,255,255); margin:0; padding:0;
	}

	table.maintable { 
		width:1080px;
	} 

	.panel {
		margin-left:10px;
		display:none;
		width:1060px;
		height:1000px;
		overflow:hidden;
	} 

	.tab {
                font-size:28px;
		margin:0px;
		padding:15px;
                font-weight:bold;
        }

	#area_topright { 
		padding-top:90px;
	} 

        .transp { background-color:transparent; }

        #pointer {
                top:557px;
                width:60px;
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

	#area_bottom {
		padding:20px;
		padding-top:10px;
		padding-bottom:10px;
                height:270px;
                background-color:white;
    		font-family:Kaffeesatz,Verdana, Arial, Helvetica, sans-serif;
		width:1060px;
		color:black;
		font-weight:bold;
        }
	
	#area_midmid { 
		width:1080px; 
		height:460px; 
		overflow:hidden;
	} 


]]></>,
       
        pass: new Array(), 
 
        kick: function () {
		this.movepos+=2;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		var currIndex = Math.floor(this.movepos/this.tabsWidth); 

		if(currIndex<this.tabsTitles.length) { 
 		   if(!this.pass[currIndex]) { 
			this.pass[currIndex]=true;		
			this._service_jquery(".panel",this._coreDoc).attr("style","display:none");
                	this._coreDoc.getElementById(this.tabsPanelId[currIndex]).setAttribute("style","display:block");


			this._send(this._coreDoc.getElementById(this.tabsPanelId[currIndex]),"social-focus",null);

                	this._coreDoc.getElementById("panelContainer").setAttribute("style",this.tabsPanelColors[currIndex]);
 		   } 
		} 
		if(this.movepos > 1080 ) { 
			this.movepos = 0;
			this.pass= new Array();
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
<td align="left" valign="top" style="height:560px;padding:0;background:white url(http://www.ifsc.usp.br/imagens/tela_social/barra_sup.jpg) 0px -23px no-repeat" >

<table border='0' width='1080' height="90">
<tr>
<td id='area_topleft' width='230' valign='middle' align="center" >

</td>
<td id='area_topmid' align="right" valign="top" >
</td>
</tr>
</table>

<div id="area_midmid">
</div>

</td>
</tr>
</table>

<table>

<tr style="height:50px" id='tabContainer'>
</tr>
<tr>
<td id='panelContainer'>
</td>
</tr>
</table>
<table>
<tr>
<td id='area_bottom' valign='top'>
</td>
<td id='area_bottomright' valign="middle">
</td>
</tr>
</table>

</div>

</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);

		this.tabsWidth = parseInt(1060/this.tabsTitles.length);
		for(var i=0;i<this.tabsTitles.length;i++) { 
			var tdTab = this._coreDoc.createElement("td");
			tdTab.setAttribute("style",this.tabsColors[i]+";width:"+this.tabsWidth+"px");
			tdTab.setAttribute("id",this.tabsIds[i]);
   			tdTab.innerHTML="<div class='tab' >"+this.tabsTitles[i]+"</div>";
			this._coreDoc.getElementById("tabContainer").appendChild(tdTab); 

			var divPanel = this._coreDoc.createElement("div");
			divPanel.setAttribute("class","panel");
			divPanel.setAttribute("style",this.tabsPanelColors[i]);
			divPanel.setAttribute("id",this.tabsPanelId[i]);

			this._coreDoc.getElementById("panelContainer").appendChild(divPanel); 
		} 
		this._coreDoc.getElementById("panelContainer").setAttribute("colspan",this.tabsTitles.length);

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
