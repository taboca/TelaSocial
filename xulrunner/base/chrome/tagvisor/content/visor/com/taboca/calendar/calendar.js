
c = require("choreographer");
t = require("timer");

var calendar_Widget =  {

	name   : __appName,
        target : __targetName,

	start : function () { 

	        this._raiseEvent(".container", "start");
                this._raiseEvent(".container.clock", "start");
                this._raiseEvent(".container.twitter", "start");
              this._raiseEvent(".container.flickr", "start");
//                this._raiseEvent(".container.grade", "start");
//                this._raiseEvent(".container.ticker", "start");
                //this._raiseEvent(".container.twitterslash", "start");
                //this._raiseEvent(".container.twitterbmacc", "start");
//                this._raiseEvent(".container.randombg", "start");

		selff = this;
//		t.setTimeout( function() { selff.kickMore() } , 15000); 
		
	} ,

	init : function () {
		

	} ,
	kickState : false, 

        kickMore: function () { 
/*
		if(this.kickState) { 
               	 	this._raiseEvent(".container.twitter", "kill");
              		this._raiseEvent(".container.twitter", "init");

			this.kickState=false; 
		} else { 
			this.kickState=true;

		} 
*/
 	} 


}

c.register(calendar_Widget);
