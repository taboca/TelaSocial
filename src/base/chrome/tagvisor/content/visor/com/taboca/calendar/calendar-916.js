
c = require("choreographer");
t = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.video", "start");
                this._raiseEvent(".container.twitter", "start");

		selff = this;
		
	} ,

	init : function () {
		

	} ,
	kickState : false, 

        kickMore: function () { 
 	} 


}

c.register(calendar_Widget);
