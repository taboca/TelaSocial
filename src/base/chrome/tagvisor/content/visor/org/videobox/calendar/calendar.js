
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.video", "start");

	} ,

	init : function () {
	} ,
	kickState : false, 

        kickMore: function () { 
	       	this._raiseEvent(".container", "kick");
              	var self = this;
             	timer.setTimeout( function(){self.kickMore()},100);
 	} 

}

c.register(calendar_Widget);
