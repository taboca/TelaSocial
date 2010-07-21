
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.typing_fisl", "start");
                this._raiseEvent(".container.typing_atualizacoes", "start");
                this._raiseEvent(".container.typing_twitter", "start");
                this._raiseEvent(".container.video", "start");

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
