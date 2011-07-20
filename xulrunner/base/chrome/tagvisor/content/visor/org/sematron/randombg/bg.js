c     = require("choreographer");
timer = require("timer");

var bg_Widget =  {

	name   : __appName,
        target : __targetName,

	kill : function () { 
		c.kill(this);
	},

	start : function () { 

		this.tick();

	} ,

	tick : function () {

		var rr = parseInt(Math.random()*255);
		var gg = parseInt(Math.random()*255);
		var bb = parseInt(Math.random()*255);

		this._coreDoc.body.style.backgroundColor="rgb("+rr+","+gg+","+bb+")";

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 1000);

	},

	init : function () { 

	} 

}

c.register(bg_Widget);
