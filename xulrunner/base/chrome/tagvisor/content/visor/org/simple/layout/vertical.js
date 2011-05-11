c = require("choreographer");
t = require("timer");

var layoutVertical =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

div { 
	border:1px solid black;
	margin:1em;
	padding:1em;
} 

]]></>,
       
	start : function () { 

		var importedElement = this._coreDoc.createElement("div");
		importedElement.innerHTML =  <>

testing
<div id="area1">
area 1
</div>
<div id="area2">
area2
</div>

ops
</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);

	} ,

	init : function () {
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
	}

}

c.register(layoutVertical);
