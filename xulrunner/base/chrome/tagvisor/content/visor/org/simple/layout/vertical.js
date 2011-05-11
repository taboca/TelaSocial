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
     
        asyncStart: function (data) { 
		var importedElement = this._coreDoc.createElement("div");
		importedElement.innerHTML =  data;
		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
        }, 
       
	start : function () { 
                var self = this;
		c.load("./org/simple/layout/data.html", function s(d) {
			self.asyncStart(d);
		} , function e(i) { console.log(i) } ); 
	} ,

	init : function () {
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
	}

}

c.register(layoutVertical);
