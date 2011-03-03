c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,

        _coreDoc: null,

	style : <><![CDATA[

	html {
		background-color:black;
		padding:0;
		margin:0; font-family: verdana, arial, sans-serif;
		width:1920px;
		height:1080px;
		overflow:hidden;
	} 

	table {
		width:1920px;
		height:1080px;
	}

]]></>,

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<table>
<tr>
<td id='area_middle' valign='middle' align="center">
</td>
</tr>
</table>

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
