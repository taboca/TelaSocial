
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        	this._raiseEvent(".main", "start");
                this._raiseEvent(".main.palestras", "start");
                this._raiseEvent(".main.imageshow", "start");
				this._raiseEvent(".main.typing", "start");

                var self = this;
                timer.setTimeout( function(){self.kickMore()},1000);

		
	} ,

	init : function () {
		

	} ,
	kickState : false, 

        kickMore: function () { 
	       	this._raiseEvent(".main", "kick");
              	var self = this;
             	timer.setTimeout( function(){self.kickMore()},100);
 	} 

}

c.register(calendar_Widget);
