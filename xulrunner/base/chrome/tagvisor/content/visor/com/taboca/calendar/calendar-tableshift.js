
c = require("choreographer");
timer = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.clock", "start");
                this._raiseEvent(".container.twitter", "start");
                this._raiseEvent(".container.twitterslash", "start");

                var self = this;
                timer.setTimeout( function(){self.kickMore()},10000);

		
	} ,

	init : function () {
		

	} ,
	kickState : false, 

        kickMore: function () { 
		if(this.kickState) { 
	        	this._raiseEvent(".container", "panel1");
			this.kickState=false; 
		} else { 
	        	this._raiseEvent(".container", "panel2");
			this.kickState=true;
		} 
              	var self = this;
             	timer.setTimeout( function(){self.kickMore()},30000);
 	} 

}

c.register(calendar_Widget);
