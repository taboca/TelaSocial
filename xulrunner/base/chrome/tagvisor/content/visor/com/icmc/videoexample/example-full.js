
c = require("choreographer");
t = require("timer");

var  video  = {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	start : function () { 

		this.element = this._coreDoc.createElement("div");

		this.elementv = this._coreDoc.createElement('video');
		this.elementv.setAttribute('width', '1920');
		this.elementv.setAttribute('height', '1080');
		this.elementv.setAttribute('autoplay', 'true');
		this.elementv.setAttribute('src', 'com/icmc/videoexample/test2.ogg');
		this.element.appendChild(this.elementv);
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 30000); 
	} ,

	images: ['test0.ogg','test1.ogg','test2.ogg','test3.ogg','test4.ogg','test5.ogg'], 

	kick : function () { 

		//this.element.innerHTML="<video src='com/icmc/videoexample/test"+parseInt(Math.random()*13)+".ogg' width='1920' height='1080' autoplay='true' style='padding-left:0px' />";
		this.element.innerHTML="<video src='com/icmc/videoexample/test2.ogg' width='1920' height='1080' autoplay='true' style='padding-left:0px' />";

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 30000); 

	},

	init : function () {


	}

}

c.register(video);
