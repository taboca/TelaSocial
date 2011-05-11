c = require("choreographer");
t = require("timer");

var layoutVertical =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

        asyncStart: function (data) { 
		var importedElement = this._coreDoc.createElement("div");
		importedElement.innerHTML =  data;
		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
        }, 
       
	start:function () { 
                var self = this;
		c.load("./org/simple/layout/data.html", function s(d) {
			self.asyncStart(d);
		} , function e(i) { console.log(i) } ); 
		c.load("./org/simple/layout/data.css", function s(d) {
			self.asyncStyle(d);
		} , function e(i) { console.log(i) } ); 
	} ,

	init : function () {
	}, 

	asyncStyle: function (data) { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=data; 
	}

}

c.register(layoutVertical);
