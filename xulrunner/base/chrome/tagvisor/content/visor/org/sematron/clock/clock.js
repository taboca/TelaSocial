c     = require("choreographer");
timer = require("timer");

var clock_Widget =  {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,


	kill : function () { 
		c.kill(this);
	},
	start : function () { 

		this.element = this._coreDoc.createElement('div');

		this.element.setAttribute("style","color:white;font-size:90px;font-weight:bold;padding:20px;padding-top:5px;;text-shadow: black 10px 0px 0px;");
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.element.innerHTML="<span>:</span>";

		this.tick();

	} ,

	tick : function () {

		this.data = new Date();
		var text = this.data.toLocaleTimeString();
		text = text.replace(/:..( [AP]M)$/, '$1');
		this.element.innerHTML = text;

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 1000);

	},

	init : function () { 

	} 

}

c.register(clock_Widget);
