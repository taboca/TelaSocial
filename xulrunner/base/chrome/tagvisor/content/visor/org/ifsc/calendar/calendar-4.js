
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.clock", "start");
                this._raiseEvent(".container.twitter", "start");
                this._raiseEvent(".container.typing", "start");
                this._raiseEvent(".container.fotos", "start");
                this._raiseEvent(".container.poster", "start");
                this._raiseEvent(".container.twitterslash", "start");
                this._raiseEvent(".container.destaque", "start");

                var self = this;
                timer.setTimeout( function(){self.kickMore()},1000);

		
	} ,

	init : function () {
		

	} ,
	kickState : false, 

        kickMore: function () { 
	       	this._raiseEvent(".container", "kick");
              	var self = this;
             	timer.setTimeout( function(){self.kickMore()},200);
 	} 

}

c.register(calendar_Widget);
