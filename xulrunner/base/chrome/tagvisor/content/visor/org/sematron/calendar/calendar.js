
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
              //  this._raiseEvent(".container.clock", "start");
                this._raiseEvent(".container.palestras", "start");
              //  this._raiseEvent(".container.uspmain", "start");
                this._raiseEvent(".container.grade", "start");
                this._raiseEvent(".container.imageshow", "start");


                var self = this;
                timer.setTimeout( function(){self.kickMore()},1000);

		
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
