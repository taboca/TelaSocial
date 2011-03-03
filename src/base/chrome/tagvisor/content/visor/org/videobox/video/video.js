c = require("choreographer");
t = require("timer");
var  video  = {

  name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	element:null,

	start : function () { 

		this.element = this._coreDoc.createElement("div");
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 2000); 
	} ,

	images: ['video.ogg'], 
	titles: ['description'], 
	timing: [ 60*1000+27000 ], 

	cc:-1,
	kick : function () { 

		this.cc++;
		if(this.cc> this.images.length-1) { this.cc=0 } 

		this.element.innerHTML="<video src='org/videobox/video/"+this.images[this.cc]+"' width='950' autoplay='true' style='padding-left:0px' />";

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , this.timing[this.cc]); 

	},

	init : function () {


	}

}

c.register(video);
